// src/modules/members/member.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify'
import { MemberService } from './member.service'
import { AppError } from '../../shared/errors/app-error'
import {
  memberParamsSchema,
  createMemberSchema,
  createSubscriptionSchema,
  webhookSchema,
} from './member.schemas'

export class MemberController {
  constructor(private memberService = new MemberService()) {}

  // ============================================
  // 1. LISTAR MEMBROS
  // ============================================
  /**
   * GET /members
   * Retorna lista de todos os membros
   */
  async index(request: FastifyRequest, reply: FastifyReply) {
    try {
      const members = await this.memberService.listMembers()
      return reply.status(200).send({
        data: members,
        total: members.length,
      })
    } catch (error) {
      console.error('Erro ao listar membros:', error)
      return reply.status(500).send({
        error: 'Erro ao listar membros',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 2. CRIAR MEMBRO
  // ============================================
  /**
   * POST /members
   * Cria um novo membro
   */
  async store(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Valida os dados com Zod
      const data = createMemberSchema.parse(request.body)

      // Chama o serviço para criar
      const member = await this.memberService.createMember(data)

      return reply.status(201).send(member)
    } catch (error) {
      console.error('Erro ao criar membro:', error)

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
          code: 'VALIDATION_ERROR',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao criar membro',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 3. CONSULTAR STATUS (SEM AUTENTICAÇÃO)
  // ============================================
  /**
   * GET /members/:cpfCnpj/status
   * Retorna o status do membro (ativo/inativo/inadimplente)
   * NÃO REQUER AUTENTICAÇÃO
   */
  async status(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Valida o CPF/CNPJ
      const { cpfCnpj } = memberParamsSchema.parse(request.params)

      // Chama o serviço
      const status = await this.memberService.getStatus(cpfCnpj)

      return reply.status(200).send(status)
    } catch (error) {
      console.error('Erro ao consultar status:', error)

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
          code: 'ASAAS_ERROR',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao consultar status',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 4. LISTAR PLANOS (SEM AUTENTICAÇÃO)
  // ============================================
  /**
   * GET /members/plans
   * Retorna lista de planos disponíveis
   * NÃO REQUER AUTENTICAÇÃO
   */
  async plans(request: FastifyRequest, reply: FastifyReply) {
    try {
      const plans = await this.memberService.listPlans()

      return reply.status(200).send({
        data: plans,
        total: plans.length,
      })
    } catch (error) {
      console.error('Erro ao listar planos:', error)

      return reply.status(500).send({
        error: 'Erro ao listar planos',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 5. CRIAR ASSINATURA
  // ============================================
  /**
   * POST /members/subscriptions
   * Cria uma assinatura para um membro
   * REQUER AUTENTICAÇÃO
   */
  async subscription(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Valida os dados
      const data = createSubscriptionSchema.parse(request.body)

      // Chama o serviço
      const subscription = await this.memberService.createSubscription(data)

      return reply.status(201).send(subscription)
    } catch (error) {
      console.error('Erro ao criar assinatura:', error)

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
          code: 'ASAAS_ERROR',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao criar assinatura',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 6. WEBHOOK ASAAS (SEM AUTENTICAÇÃO)
  // ============================================
  /**
   * POST /members/webhooks/asaas
   * Recebe notificações do ASAAS
   * NÃO REQUER AUTENTICAÇÃO
   */
  async webhook(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Valida os dados
      const data = webhookSchema.parse(request.body)

      // Processa o webhook
      await this.memberService.handleWebhook(data)

      // Sempre retorna 200 (ASAAS não vai reenviar se falhar)
      return reply.status(200).send({ ok: true })
    } catch (error) {
      console.error('Erro ao processar webhook:', error)
      // Retorna 200 mesmo com erro
      return reply.status(200).send({ ok: true })
    }
  }

  // ============================================
  // 7. CRIAR CLIENTE ASAAS
  // ============================================
  /**
   * POST /members/asaas/customers
   * Cria um cliente na plataforma ASAAS
   * REQUER AUTENTICAÇÃO
   */
  async asaasCustomer(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, cpfCnpj, email, phone } = request.body as any

      if (!name || !cpfCnpj) {
        return reply.status(400).send({
          error: 'Nome e CPF/CNPJ são obrigatórios',
          code: 'MISSING_FIELDS',
        })
      }

      const customer = await this.memberService.createAsaasCustomer({
        name,
        cpfCnpj,
        email,
        phone,
      })

      return reply.status(201).send(customer)
    } catch (error) {
      console.error('Erro ao criar cliente ASAAS:', error)

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
          code: 'ASAAS_ERROR',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao criar cliente ASAAS',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  // ============================================
  // 8. CRIAR COBRANÇA ASAAS
  // ============================================
  /**
   * POST /members/asaas/payments
   * Cria uma cobrança no ASAAS
   * REQUER AUTENTICAÇÃO
   */
  async asaasPayment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { customer, billingType, value, dueDate, description } = request.body as any

      if (!customer || !billingType || !value || !dueDate) {
        return reply.status(400).send({
          error: 'customer, billingType, value e dueDate são obrigatórios',
          code: 'MISSING_FIELDS',
        })
      }

      const payment = await this.memberService.createAsaasPayment({
        customer,
        billingType,
        value,
        dueDate,
        description,
      })

      return reply.status(201).send(payment)
    } catch (error) {
      console.error('Erro ao criar cobrança ASAAS:', error)

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
          code: 'ASAAS_ERROR',
        })
      }

      return reply.status(500).send({
        error: 'Erro ao criar cobrança ASAAS',
        code: 'INTERNAL_ERROR',
      })
    }
  }
}