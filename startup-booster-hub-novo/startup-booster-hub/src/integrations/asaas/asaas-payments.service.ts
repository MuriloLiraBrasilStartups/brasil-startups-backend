import { AsaasClient } from './asaas.client'
import type {
  AsaasListParams,
  AsaasPaginatedResponse,
  AsaasPayment,
  CreateAsaasPaymentInput,
} from './asaas.types'

export class AsaasPaymentsService {
  constructor(private readonly asaasClient = new AsaasClient()) {}

  async createPayment(data: CreateAsaasPaymentInput) {
    return this.asaasClient.request<AsaasPayment>('/payments', {
      method: 'POST',
      body: data,
    })
  }

  async getPayment(paymentId: string) {
    return this.asaasClient.request<AsaasPayment>(`/payments/${paymentId}`)
  }

  async listPayments(params: AsaasListParams & { customer?: string } = {}) {
    return this.asaasClient.request<AsaasPaginatedResponse<AsaasPayment>>('/payments', {
      query: params,
    })
  }
}
