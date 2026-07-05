import { MemoryCacheProvider } from './memory-cache'

describe('MemoryCacheProvider', () => {
  it('returns cached values before ttl expires', async () => {
    const cache = new MemoryCacheProvider()

    await cache.set('key', { ok: true }, { ttlInSeconds: 10 })

    await expect(cache.get('key')).resolves.toEqual({ ok: true })
  })

  it('deletes values', async () => {
    const cache = new MemoryCacheProvider()

    await cache.set('key', 'value', { ttlInSeconds: 10 })
    await cache.delete('key')

    await expect(cache.get('key')).resolves.toBeNull()
  })
})
