import type { Prisma } from '@prisma/client'
import { prisma } from '../../database/prisma'
import type { CreateUserInput } from './user.schemas'

export class UserRepository {
  async findMany(params: { skip: number; take: number }) {
    return prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      skip: params.skip,
      take: params.take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async count() {
    return prisma.user.count({
      where: {
        deletedAt: null,
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: data as Prisma.UserUncheckedCreateInput,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
  }
}
