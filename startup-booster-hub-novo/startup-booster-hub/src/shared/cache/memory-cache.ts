import type { CacheOptions, CacheProvider } from './cache'
import { env } from '../../config/env'
import { RedisCacheProvider } from './redis-cache'

type CacheEntry<TValue> = {
  value: TValue
  expiresAt: number
}

export class MemoryCacheProvider implements CacheProvider {
  private store = new Map<string, CacheEntry<unknown>>()

  async get<TValue>(key: string) {
    const entry = this.store.get(key)

    if (!entry || entry.expiresAt <= Date.now()) {
      this.store.delete(key)
      return null
    }

    return entry.value as TValue
  }

  async set<TValue>(key: string, value: TValue, options: CacheOptions) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + options.ttlInSeconds * 1000,
    })
  }

  async delete(key: string) {
    this.store.delete(key)
  }
}

export const cache = env.REDIS_URL ? new RedisCacheProvider(env.REDIS_URL) : new MemoryCacheProvider()
