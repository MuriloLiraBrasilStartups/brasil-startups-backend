// src/modules/members/member.service.ts

import { MemberStatus, PlanType, SubscriptionStatus, type Prisma } from '@prisma/client'
import { AsaasCustomersService, AsaasPaymentsService } from '../../integrations/asaas'
import { prisma } from '../../database/prisma'
import { cache } from '../../shared/cache/memory-cache'
import { AppError } from '../../shared/errors/app-error'
import type { CreateMemberInput, CreateSubscriptionInput, WebhookInput } from './member.schemas'

// ============================================
// PREÇOS DOS PLANOS
// ============================================
const planPrices: Record<PlanType, number> = {
  FREE: 0,
  BASIC: 99,
  PRO: 299,
  ENTERPRISE: 999,
}

// ============================================
// SERVIÇO DE MEMBROS
// ============================================
export class MemberService {
  constructor(
    private readonly asaasCustomers = new AsaasCustomersService(),
    private readonly asaasPayments = new AsaasPaymentsService(),
  ) {}

  // ============================================
  // 1. LISTAR TODOS OS MEMBROS
  // ============================================
  /**
   * O que faz: Busca todos os membros no banco de dados
   * Quando usar: GET /members (listar todos)
   */
  async listMembers() {
    return prisma.member.findMany({
      where: { deletedAt: null }, // Só membros não deletados
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        startup: { select: { id: true, name: true, cnpj: true } },
      },
      orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
    })
  }

  // ============================================
  // 2. CRIAR UM NOVO MEMBRO
  // ============================================
  /**
   * O que faz: Cria um novo membro no banco de dados
   * Quando usar: POST /members
   * Fluxo:
   *   1. Recebe dados (name, cpfCnpj, email)
   *   2. Valida com Zod (já feito no controller)
   *   3. Salva no banco (Prisma)
   *   4. Retorna o membro criado
   */
  async createMember(data: CreateMemberInput) {
    return prisma.member.create({
      data: data as Prisma.MemberUncheckedCreateInput,
      include: {
        user: { select: { id: true, name: true, email: true } },
        startup: { select: { id: true, name: true } },
      },
    })
  }

  // ============================================
  // 3. CRIAR UMA ASSINATURA (PLANO)
  // ============================================
  /**
   * O que faz: Cria uma assinatura para um membro
   * Quando usar: POST /members/subscriptions
   * Fluxo:
   *   1. Recebe dados (startupId, plan, dueDate)
   *   2. Valida com Zod
   *   3. Salva ou atualiza no banco
   *   4. Retorna a assinatura
   */
  async createSubscription(data: CreateSubscriptionInput) {
    return prisma.subscription.upsert({
      where: { startupId: data.startupId },
      update: {
        plan: data.plan,
        dueDate: data.dueDate,
        balance: data.balance,
        asaasSubscriptionId: data.asaasSubscriptionId,
        status: this.statusFromBalance(data.balance),
      },
      create: {
        startupId: data.startupId,
        plan: data.plan,
        dueDate: data.dueDate,
        balance: data.balance,
        asaasSubscriptionId: data.asaasSubscriptionId,
        status: this.statusFromBalance(data.balance),
      },
    })
  }

  // ============================================
  // 4. CONSULTAR STATUS DO MEMBRO (COM CACHE)
  // ============================================
  /**
   * O que faz: Retorna o status do membro (ativo/inativo/inadimplente)
   * Quando usar: GET /members/:cpfCnpj/status
   * Fluxo:
   *   1. Normaliza o CPF/CNPJ (remove caracteres especiais)
   *   2. Procura no CACHE (memória rápida)
   *   3. Se encontrou no cache → retorna em <10ms ⚡
   *   4. Se não encontrou → busca no banco
   *   5. Sincroniza com ASAAS
   *   6. Guarda no cache por 5 minutos
   *   7. Retorna o status
   */
  async getStatus(cpfCnpj: string) {
    const normalizedCpfCnpj = cpfCnpj.replace(/\D/g, '') // Remove caracteres especiais
    const cacheKey = `member-status:${normalizedCpfCnpj}`

    // Procura no cache
    const cached = await cache.get<MemberStatusResponse>(cacheKey)
    if (cached) {
      console.log('✅ Status retornado do CACHE')
      return cached
    }

    console.log('🔄 Buscando status do banco e ASAAS...')

    // Busca no banco
    const member = await prisma.member.findFirst({
      where: {
        cpfCnpj: normalizedCpfCnpj,
        deletedAt: null,
      },
      include: {
        startup: {
          include: {
            subscription: true,
          },
        },
      },
    })

    if (!member) {
      throw new AppError('Member not found', 404)
    }

    // Sincroniza com ASAAS
    const subscription = await this.syncSubscriptionFromAsaas(member)

    // Monta resposta
    const response: MemberStatusResponse = {
      status: this.memberStatus(member.status, subscription?.status),
      plan: subscription?.plan ?? PlanType.FREE,
      dueDate: subscription?.dueDate?.toISOString() ?? null,
      balance: Number(subscription?.balance ?? 0),
    }

    // Guarda no cache por 5 minutos (300 segundos)
    await cache.set(cacheKey, response, { ttlInSeconds: 300 })

    return response
  }

  // ============================================
  // 5. LISTAR PLANOS DISPONÍVEIS
  // ============================================
  /**
   * O que faz: Retorna lista de planos com preços
   * Quando usar: GET /members/plans
   */
  listPlans() {
    return Object.values(PlanType).map((plan) => ({
      plan,
      price: planPrices[plan],
      currency: 'BRL',
    }))
  }

  // ============================================
  // 6. CRIAR CLIENTE NO ASAAS
  // ============================================
  /**
   * O que faz: Cria um cliente na plataforma ASAAS
   * Quando usar: POST /members/asaas/customers
   * Fluxo:
   *   1. Recebe dados (name, cpfCnpj, email, phone)
   *   2. Envia para ASAAS
   *   3. ASAAS retorna um ID único
   *   4. Retorna o cliente criado
   */
  async createAsaasCustomer(data: { name: string; cpfCnpj: string; email?: string; phone?: string }) {
    return this.asaasCustomers.createCustomer(data)
  }

  // ============================================
  // 7. CRIAR COBRANÇA NO ASAAS
  // ============================================
  /**
   * O que faz: Cria uma cobrança (boleto, PIX, cartão) no ASAAS
   * Quando usar: POST /members/asaas/payments
   * Fluxo:
   *   1. Recebe dados (customer, billingType, value, dueDate)
   *   2. Envia para ASAAS
   *   3. ASAAS retorna um ID de pagamento
   *   4. Retorna o pagamento criado
   */
  async createAsaasPayment(data: {
    customer: string
    billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'UNDEFINED'
    value: number
    dueDate: string
    description?: string
    externalReference?: string
  }) {
    return this.asaasPayments.createPayment(data)
  }

  // ============================================
  // 8. PROCESSAR WEBHOOK DO ASAAS
  // ============================================
  /**
   * O que faz: Recebe notificações do ASAAS e atualiza o banco
   * Quando usar: POST /members/webhooks/asaas
   * Fluxo:
   *   1. ASAAS envia notificação (pagamento confirmado, vencido, etc)
   *   2. Backend recebe a notificação
   *   3. Procura a assinatura no banco
   *   4. Atualiza o status
   *   5. Limpa o cache (para forçar atualização)
   *   6. Retorna confirmação
   */
  async handleWebhook(data: WebhookInput) {
    const reference = data.payment?.externalReference ?? data.subscription?.externalReference
    const status = data.payment?.status ?? data.subscription?.status

    if (!reference) {
      return { processed: false, reason: 'Missing externalReference' }
    }

    // Procura a assinatura
    const subscription = await prisma.subscription.findFirst({
      where: {
        OR: [{ startupId: reference }, { asaasSubscriptionId: reference }],
      },
    })

    if (!subscription) {
      return { processed: false, reason: 'Subscription not found' }
    }

    // Atualiza o status
    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: this.subscriptionStatus(status, data.event),
        dueDate: data.payment?.dueDate ? new Date(data.payment.dueDate) : undefined,
        balance: this.balanceFromWebhook(data, Number(subscription.balance)),
      },
    })

    // Limpa o cache
    await this.invalidateMemberStatusCache(updated.startupId)

    return { processed: true, subscription: updated }
  }

  // ============================================
  // MÉTODOS PRIVADOS (AUXILIARES)
  // ============================================

  /**
   * Determina o status da assinatura baseado no saldo
   */
  private statusFromBalance(balance: number) {
    return balance > 0 ? SubscriptionStatus.PAST_DUE : SubscriptionStatus.ACTIVE
  }

  /**
   * Sincroniza a assinatura com ASAAS
   * Busca pagamentos no ASAAS e atualiza o banco
   */
  private async syncSubscriptionFromAsaas(member: MemberWithSubscription) {
    const subscription = member.startup.subscription

    if (!member.asaasCustomerId && !member.cpfCnpj) {
      return subscription
    }

    try {
      // Procura o cliente no ASAAS
      const customerId = member.asaasCustomerId ?? (await this.findAsaasCustomerId(member.cpfCnpj))

      if (!customerId) {
        return subscription
      }

      // Busca pagamentos do cliente
      const payments = await this.asaasPayments.listPayments({ customer: customerId, limit: 100 })
      const overdue = payments.data.filter((payment) => payment.status === 'OVERDUE')
      const paid = payments.data.some((payment) => ['RECEIVED', 'CONFIRMED', 'RECEIVED_IN_CASH'].includes(payment.status))
      const nextPayment = payments.data
        .filter((payment) => payment.dueDate)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]

      const balance = overdue.reduce((total, payment) => total + payment.value, 0)
      const status = overdue.length > 0
        ? SubscriptionStatus.PAST_DUE
        : paid
          ? SubscriptionStatus.ACTIVE
          : subscription?.status ?? SubscriptionStatus.INACTIVE

      // Atualiza ou cria a assinatura
      return prisma.subscription.upsert({
        where: { startupId: member.startupId },
        update: {
          status,
          balance: balance as any,
          dueDate: nextPayment?.dueDate ? new Date(nextPayment.dueDate) : subscription?.dueDate,
        },
        create: {
          startupId: member.startupId,
          plan: subscription?.plan ?? PlanType.FREE,
          status,
          balance: balance as any,
          dueDate: nextPayment?.dueDate ? new Date(nextPayment.dueDate) : undefined,
        },
      })
    } catch {
      return subscription
    }
  }

  /**
   * Procura o ID do cliente no ASAAS pelo CPF/CNPJ
   */
  private async findAsaasCustomerId(cpfCnpj?: string | null) {
    if (!cpfCnpj) {
      return null
    }

    const customers = await this.asaasCustomers.listCustomers({
      cpfCnpj: cpfCnpj.replace(/\D/g, ''),
      limit: 1,
    })

    return customers.data[0]?.id ?? null
  }

  /**
   * Determina o status da assinatura baseado no evento
   */
  private subscriptionStatus(status?: string, event?: string) {
    if (status === 'OVERDUE' || event === 'PAYMENT_OVERDUE') return SubscriptionStatus.PAST_DUE
    if (status === 'RECEIVED' || status === 'CONFIRMED' || status === 'ACTIVE') return SubscriptionStatus.ACTIVE
    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') return SubscriptionStatus.ACTIVE
    if (status === 'CANCELED' || event === 'PAYMENT_DELETED' || event === 'PAYMENT_CANCELLED' || event === 'SUBSCRIPTION_DELETED') {
      return SubscriptionStatus.CANCELED
    }

    return SubscriptionStatus.INACTIVE
  }

  /**
   * Calcula o saldo baseado no webhook
   */
  private balanceFromWebhook(data: WebhookInput, currentBalance: number) {
    if (data.payment?.status === 'OVERDUE' || data.event === 'PAYMENT_OVERDUE') {
      return data.payment?.value ?? currentBalance
    }

    if (
      data.payment?.status === 'RECEIVED' ||
      data.payment?.status === 'CONFIRMED' ||
      data.event === 'PAYMENT_RECEIVED' ||
      data.event === 'PAYMENT_CONFIRMED'
    ) {
      return 0
    }

    return currentBalance
  }

  /**
   * Determina o status do membro baseado na assinatura
   */
  private memberStatus(memberStatus: MemberStatus, subscriptionStatus?: SubscriptionStatus) {
    if (subscriptionStatus === SubscriptionStatus.PAST_DUE) {
      return MemberStatus.INADIMPLENTE
    }

    if (subscriptionStatus === SubscriptionStatus.ACTIVE) {
      return MemberStatus.ATIVO
    }

    return memberStatus
  }

  /**
   * Limpa o cache de status dos membros
   */
  private async invalidateMemberStatusCache(startupId: string) {
    const members = await prisma.member.findMany({
      where: { startupId, deletedAt: null, cpfCnpj: { not: null } },
      select: { cpfCnpj: true },
    })

    await Promise.all(members.map((member) => cache.delete(`member-status:${member.cpfCnpj}`)))
  }
}

// ============================================
// TIPOS AUXILIARES
// ============================================

type MemberWithSubscription = NonNullable<Awaited<ReturnType<typeof prisma.member.findFirst>>> & {
  startup: NonNullable<Awaited<ReturnType<typeof prisma.startup.findFirst>>> & {
    subscription: Awaited<ReturnType<typeof prisma.subscription.findFirst>>
  }
}

type MemberStatusResponse = {
  status: MemberStatus
  plan: PlanType
  dueDate: string | null
  balance: number
}