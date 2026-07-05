import { env } from '../../config/env'
import { AppError } from '../../shared/errors/app-error'

type AsaasRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  query?: Record<string, string | number | boolean | undefined>
}

type AsaasErrorResponse = {
  errors?: Array<{
    code?: string
    description?: string
  }>
}

export class AsaasClient {
  constructor(
    private readonly baseUrl = env.ASAAS_BASE_URL,
    private readonly apiKey = env.ASAAS_API_KEY,
  ) {}

  async request<TResponse>(path: string, options: AsaasRequestOptions = {}) {
    if (!this.apiKey) {
      throw new AppError('ASAAS_API_KEY is not configured', 500)
    }

    const url = new URL(`${this.baseUrl.replace(/\/$/, '')}${path}`)

    Object.entries(options.query ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })

    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: this.apiKey,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    const payload = await this.parseResponse(response)

    if (!response.ok) {
      throw new AppError(this.getErrorMessage(payload), response.status)
    }

    return payload as TResponse
  }

  private async parseResponse(response: Response) {
    const text = await response.text()

    if (!text) {
      return null
    }

    try {
      return JSON.parse(text) as unknown
    } catch {
      throw new AppError('Invalid ASAAS response', 502)
    }
  }

  private getErrorMessage(payload: unknown) {
    const asaasError = payload as AsaasErrorResponse
    const firstError = asaasError.errors?.[0]

    return firstError?.description ?? 'ASAAS request failed'
  }
}
