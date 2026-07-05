// src/integrations/asaas/asaas-member-status.service.ts
import { AsaasCustomersService } from './asaas-customers.service'
import { AsaasPaymentsService } from './asaas-payments.service'
import { CacheService } from './cache.service'

export class AsaasMemberStatusService {
  constructor(
    // 💡 IMPORTANTE: O 'public' aqui é a chave que permite a Rota usar este serviço
    public readonly customersService = new AsaasCustomersService(),
    private readonly paymentsService = new AsaasPaymentsService(),
    private readonly cacheService = new CacheService(),
  ) {}

  async getMemberStatus(cpfCnpj: string) {
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '')
    const cacheKey = `member_status_${cleanCpfCnpj}`
    
    const cached = await this.cacheService.get(cacheKey)
    if (cached) return cached

    const customers = await this.customersService.listCustomers({
      cpfCnpj: cleanCpfCnpj,
      limit: 1,
    })

    if (!customers.data?.length) {
      return { status: 'inativo', balance: 0, plan: null }
    }

    const customer = customers.data[0]
    const payments = await this.paymentsService.listPayments({
      customer: customer.id,
      limit: 1,
    })

    const lastPayment = payments.data?.[0]
    
    let status = 'inativo'
    if (lastPayment) {
      status = lastPayment.status === 'OVERDUE' ? 'inadimplente' : 'ativo'
    }

    const result = {
      status,
      plan: lastPayment ? { id: lastPayment.id, dueDate: lastPayment.dueDate } : null,
      dueDate: lastPayment?.dueDate || null,
      balance: lastPayment?.value || 0
    }

    await this.cacheService.set(cacheKey, result, 3600)
    return result
  }

  // 💡 Método solicitado na Issue para o Menu de Opções
  async listAvailablePlans() {
    return [
      { id: 'silver', name: 'Plano Prata', price: 49.90 },
      { id: 'gold', name: 'Plano Ouro', price: 99.90 }
    ]
  }

  // 💡 Este método limpa o "Post-it" (Cache) do Redis
  async invalidateCache(cpfCnpj: string): Promise<void> {
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '')
    const cacheKey = `member_status_${cleanCpfCnpj}`
    await this.cacheService.delete(cacheKey)
  }
}