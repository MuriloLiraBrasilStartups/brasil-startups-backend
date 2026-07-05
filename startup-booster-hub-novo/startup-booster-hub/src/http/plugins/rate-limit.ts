import type { FastifyInstance } from 'fastify'
import { cache } from '../../shared/cache/memory-cache'
import { AppError } from '../../shared/errors/app-error'

type RateLimitEntry = {
  count: number
  resetAt: number
}

const hits = new Map<string, RateLimitEntry>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 120

export async function rateLimit(app: FastifyInstance) {
  app.addHook('onRequest', async (request) => {
    const key = request.ip
    const cacheKey = `rate-limit:${key}`
    const now = Date.now()
    const cached = await cache.get<RateLimitEntry>(cacheKey)
    const activeEntry = cached && cached.resetAt > now ? cached : null

    if (activeEntry) {
      activeEntry.count += 1
      await cache.set(cacheKey, activeEntry, { ttlInSeconds: Math.ceil((activeEntry.resetAt - now) / 1000) })

      if (activeEntry.count > MAX_REQUESTS) {
        throw new AppError('Too many requests', 429)
      }

      return
    }

    const entry = hits.get(key)

    if (!entry || entry.resetAt <= now) {
      const nextEntry = { count: 1, resetAt: now + WINDOW_MS }
      hits.set(key, nextEntry)
      await cache.set(cacheKey, nextEntry, { ttlInSeconds: WINDOW_MS / 1000 })
      return
    }

    entry.count += 1
    await cache.set(cacheKey, entry, { ttlInSeconds: Math.ceil((entry.resetAt - now) / 1000) })

    if (entry.count > MAX_REQUESTS) {
      throw new AppError('Too many requests', 429)
    }
  })
}
