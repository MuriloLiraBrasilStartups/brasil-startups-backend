export type CacheOptions = {
  ttlInSeconds: number
}

export interface CacheProvider {
  get<TValue>(key: string): Promise<TValue | null>
  set<TValue>(key: string, value: TValue, options: CacheOptions): Promise<void>
  delete(key: string): Promise<void>
}
