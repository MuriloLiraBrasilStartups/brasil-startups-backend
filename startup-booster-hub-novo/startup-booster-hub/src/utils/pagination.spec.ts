import { getPagination, getPaginationMeta } from './pagination'

describe('pagination utils', () => {
  it('uses safe defaults', () => {
    expect(getPagination({})).toEqual({
      page: 1,
      perPage: 20,
      skip: 0,
      take: 20,
    })
  })

  it('caps perPage at 100', () => {
    expect(getPagination({ page: 2, perPage: 500 })).toEqual({
      page: 2,
      perPage: 100,
      skip: 100,
      take: 100,
    })
  })

  it('returns pagination metadata', () => {
    expect(getPaginationMeta(45, { page: 2, perPage: 20 })).toEqual({
      page: 2,
      perPage: 20,
      total: 45,
      totalPages: 3,
    })
  })
})
