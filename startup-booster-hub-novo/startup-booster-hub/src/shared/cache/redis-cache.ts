import { Socket } from 'node:net'
import { URL } from 'node:url'
import type { CacheOptions, CacheProvider } from './cache'

export class RedisCacheProvider implements CacheProvider {
  private readonly url: URL

  constructor(redisUrl: string) {
    this.url = new URL(redisUrl)
  }

  async get<TValue>(key: string) {
    const response = await this.command(['GET', key])

    if (response === null) {
      return null
    }

    return JSON.parse(response) as TValue
  }

  async set<TValue>(key: string, value: TValue, options: CacheOptions) {
    await this.command(['SET', key, JSON.stringify(value), 'EX', String(options.ttlInSeconds)])
  }

  async delete(key: string) {
    await this.command(['DEL', key])
  }

  private command(args: string[]) {
    return new Promise<string | null>((resolve, reject) => {
      const socket = new Socket()
      const chunks: Buffer[] = []
      const port = Number(this.url.port || 6379)
      const host = this.url.hostname
      const password = this.url.password ? decodeURIComponent(this.url.password) : ''
      const commands = password ? [['AUTH', password], args] : [args]

      socket.setTimeout(2_000)
      socket.once('error', reject)
      socket.once('timeout', () => {
        socket.destroy()
        reject(new Error('Redis command timed out'))
      })
      socket.on('data', (chunk) => chunks.push(chunk))
      socket.once('end', () => {
        try {
          resolve(this.parseResponse(Buffer.concat(chunks).toString('utf8'), commands.length))
        } catch (error) {
          reject(error)
        }
      })
      socket.connect(port, host, () => {
        socket.write(commands.map((command) => this.encode(command)).join(''))
        socket.end()
      })
    })
  }

  private encode(args: string[]) {
    return `*${args.length}\r\n${args.map((arg) => `$${Buffer.byteLength(arg)}\r\n${arg}\r\n`).join('')}`
  }

  private parseResponse(raw: string, responseCount: number) {
    const responses = raw.split(/\r\n(?=[+$:*-])/g).filter(Boolean)
    const response = responses[responseCount - 1] ?? raw

    if (response.startsWith('$-1')) {
      return null
    }

    if (response.startsWith('$')) {
      const firstBreak = response.indexOf('\r\n')
      return response.slice(firstBreak + 2).replace(/\r\n$/, '')
    }

    if (response.startsWith('-')) {
      throw new Error(response.slice(1).trim())
    }

    return null
  }
}
