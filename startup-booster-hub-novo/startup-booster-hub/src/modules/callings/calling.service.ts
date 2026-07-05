import type { Prisma } from '@prisma/client'
import { env } from '../../config/env'
import { prisma } from '../../database/prisma'
import { AppError } from '../../shared/errors/app-error'
import { getPagination, getPaginationMeta } from '../../utils/pagination'
import type { ApplicationInput, CreateCallingInput, ListCallingsQuery, UpdateCallingInput } from './calling.schemas'

export class CallingService {
  async list(query: ListCallingsQuery) {
    const pagination = getPagination(query)
    const where: Prisma.CallingWhereInput = {
      deletedAt: null,
      ...(query.status && { status: query.status }),
      ...(query.startupId && { startupId: query.startupId }),
    }
    const [callings, total] = await Promise.all([
      prisma.calling.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        include: { startup: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.calling.count({ where }),
    ])

    return { callings, meta: getPaginationMeta(total, query) }
  }

  async get(id: string) {
    const calling = await prisma.calling.findFirst({
      where: { id, deletedAt: null },
      include: {
        startup: { select: { id: true, name: true } },
        applications: { where: { deletedAt: null } },
      },
    })

    if (!calling) {
      throw new AppError('Calling not found', 404)
    }

    return calling
  }

  async create(data: CreateCallingInput) {
    return prisma.calling.create({ data: data as Prisma.CallingUncheckedCreateInput })
  }

  async update(id: string, data: UpdateCallingInput) {
    await this.get(id)

    return prisma.calling.update({ where: { id }, data: data as Prisma.CallingUncheckedUpdateInput })
  }

  async delete(id: string) {
    await this.get(id)

    return prisma.calling.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }

  async apply(callingId: string, data: ApplicationInput) {
    await this.get(callingId)

    const application = await prisma.callingApplication.create({
      data: {
        callingId,
        userId: data.userId,
        applicantName: data.applicantName,
        applicantEmail: data.applicantEmail,
        stepData: data.stepData as Prisma.InputJsonValue,
      },
    })

    await this.notifyApplication(application.applicantEmail, application.applicantName)

    return application
  }

  async score(applicationId: string, score: number, status: string) {
    return prisma.callingApplication.update({
      where: { id: applicationId },
      data: { score, status },
    })
  }

  private async notifyApplication(email: string, name: string) {
    if (!env.RESEND_API_KEY) {
      return { skipped: true }
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Brasil Startups <no-reply@brasilstartups.org>',
        to: email,
        subject: 'Inscricao recebida',
        text: `Ola, ${name}. Sua inscricao foi recebida.`,
      }),
    })

    return { skipped: false }
  }
}
