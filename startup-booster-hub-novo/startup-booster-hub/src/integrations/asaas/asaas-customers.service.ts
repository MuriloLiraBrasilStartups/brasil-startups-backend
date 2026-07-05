import { AsaasClient } from './asaas.client'
import type {
  AsaasCustomer,
  AsaasListParams,
  AsaasPaginatedResponse,
  CreateAsaasCustomerInput,
} from './asaas.types'

export class AsaasCustomersService {
  constructor(private readonly asaasClient = new AsaasClient()) {}

  async createCustomer(data: CreateAsaasCustomerInput) {
    return this.asaasClient.request<AsaasCustomer>('/customers', {
      method: 'POST',
      body: {
        ...data,
        cpfCnpj: data.cpfCnpj.replace(/\D/g, ''),
      },
    })
  }

  async getCustomer(customerId: string) {
    return this.asaasClient.request<AsaasCustomer>(`/customers/${customerId}`)
  }

  async listCustomers(params: AsaasListParams = {}) {
    return this.asaasClient.request<AsaasPaginatedResponse<AsaasCustomer>>('/customers', {
      query: params,
    })
  }
  
}
