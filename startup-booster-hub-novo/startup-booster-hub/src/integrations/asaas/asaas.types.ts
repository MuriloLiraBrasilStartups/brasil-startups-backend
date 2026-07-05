export type AsaasCustomer = {
  id: string
  name: string
  email?: string
  cpfCnpj: string
  phone?: string
  mobilePhone?: string
  externalReference?: string
  dateCreated?: string
}

export type CreateAsaasCustomerInput = {
  name: string
  cpfCnpj: string
  email?: string
  phone?: string
  mobilePhone?: string
  externalReference?: string
}

export type AsaasBillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'UNDEFINED'

export type AsaasPaymentStatus =
  | 'PENDING'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'OVERDUE'
  | 'REFUNDED'
  | 'RECEIVED_IN_CASH'
  | 'REFUND_REQUESTED'
  | 'CHARGEBACK_REQUESTED'
  | 'CHARGEBACK_DISPUTE'
  | 'AWAITING_CHARGEBACK_REVERSAL'
  | 'DUNNING_REQUESTED'
  | 'DUNNING_RECEIVED'
  | 'AWAITING_RISK_ANALYSIS'

export type AsaasPayment = {
  id: string
  customer: string
  billingType: AsaasBillingType
  value: number
  dueDate: string
  status: AsaasPaymentStatus
  invoiceUrl?: string
  bankSlipUrl?: string
  pixTransaction?: string
  externalReference?: string
  dateCreated?: string
}

export type CreateAsaasPaymentInput = {
  customer: string
  billingType: AsaasBillingType
  value: number
  dueDate: string
  description?: string
  externalReference?: string
}

export type AsaasPaginatedResponse<T> = {
  object: 'list'
  hasMore: boolean
  totalCount: number
  limit: number
  offset: number
  data: T[]
}

export type AsaasListParams = {
  limit?: number
  offset?: number
  cpfCnpj?: string
  customer?: string
  status?: string
}
