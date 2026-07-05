// src/services/cache/cache.service.ts

import Redis from 'ioredis'
import { env } from '../../config/env'

export class CacheService {
  private redis: Redis

  constructor() {
    this.redis = new Redis(env.REDIS_URL || 'redis://localhost:6379')

    this.redis.on('error', (err) => {
      console.error('❌ Erro Redis:', err)
    })

    this.redis.on('connect', () => {
      console.log('✅ Redis conectado')
    })
  }

  /**
   * Guardar valor no cache
   * @param key Chave única
   * @param value Valor (será serializado para JSON)
   * @param ttl Tempo de vida em segundos (padrão: 300 = 5 min)
   */
  async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value))
    } catch (error) {
      console.error('Erro ao guardar no cache:', error)
      // Não lança erro - cache é opcional
    }
  }

  /**
   * Recuperar valor do cache
   * @param key Chave única
   * @returns Valor desserializado ou null
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key)
      return value ? (JSON.parse(value) as T) : null
    } catch (error) {
      console.error('Erro ao ler do cache:', error)
      return null
    }
  }

  /**
   * Deletar valor do cache
   */
  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key)
    } catch (error) {
      console.error('Erro ao deletar do cache:', error)
    }
  }

  /**
   * Limpar todo o cache
   */
  async flush(): Promise<void> {
    try {
      await this.redis.flushdb()
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
    }
  }

  /**
   * Fechar conexão
   */
  async disconnect(): Promise<void> {
    await this.redis.quit()
  }
}

export const cacheService = new CacheService()