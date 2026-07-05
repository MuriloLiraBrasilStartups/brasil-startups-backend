import type { Prisma } from '@prisma/client'
import { prisma } from '../../database/prisma'
import type { CreateStartupInput, UpdateStartupInput } from './startup.schemas'

const startupSelect = {
  id: true,
  name: true,
  cnpj: true,
  state: true,
  city: true,
  segment: true,
  phase: true,
  product: true,
  businessModel: true,
  founders: true,
  latitude: true,
  longitude: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.StartupSelect

export type StartupWhereInput = Prisma.StartupWhereInput

export class StartupRepository {
  async findMany(params: { where: StartupWhereInput; skip: number; take: number }) {
    return prisma.startup.findMany({
      where: params.where,
      skip: params.skip,
      take: params.take,
      orderBy: {
        createdAt: 'desc',
      },
      select: startupSelect,
    })
  }

  async count(where: StartupWhereInput) {
    return prisma.startup.count({ where })
  }

  async findById(id: string) {
    return prisma.startup.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: startupSelect,
    })
  }

  async findByCnpj(cnpj: string) {
    return prisma.startup.findUnique({
      where: {
        cnpj,
      },
      select: startupSelect,
    })
  }

  async create(data: CreateStartupInput) {
    return prisma.startup.create({
      data: data as Prisma.StartupUncheckedCreateInput,
      select: startupSelect,
    })
  }

  async update(id: string, data: UpdateStartupInput) {
    return prisma.startup.update({
      where: {
        id,
      },
      data: data as Prisma.StartupUncheckedUpdateInput,
      select: startupSelect,
    })
  }

  async softDelete(id: string) {
    return prisma.startup.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: startupSelect,
    })
  }
}
