export type PaginationInput = {
  page?: number
  perPage?: number
}

export function getPagination(input: PaginationInput) {
  const page = Math.max(input.page ?? 1, 1)
  const perPage = Math.min(Math.max(input.perPage ?? 20, 1), 100)

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    take: perPage,
  }
}

export function getPaginationMeta(total: number, input: PaginationInput) {
  const { page, perPage } = getPagination(input)

  return {
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  }
}
