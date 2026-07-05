import { prisma } from '../../database/prisma'
import { AppError } from '../../shared/errors/app-error'
import type { GenerateDocumentInput } from './document.schemas'
import { buildSimplePdf } from './pdf'
import { DocumentStorage } from './storage'
import { renderDocumentTemplate } from './templates'

export class DocumentService {
  constructor(private readonly storage = new DocumentStorage()) {}

  async listDocuments() {
    return prisma.document.findMany({
      where: { deletedAt: null },
      include: {
        startup: { select: { id: true, name: true } },
        member: { select: { id: true, cpfCnpj: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async generate(data: GenerateDocumentInput, createdById?: string) {
    const member = await prisma.member.findFirst({
      where: { id: data.memberId, deletedAt: null },
      include: {
        user: true,
        startup: true,
      },
    })

    if (!member) {
      throw new AppError('Member not found', 404)
    }

    const template = renderDocumentTemplate(data.type, {
      memberName: member.user.name,
      memberEmail: member.user.email,
      startupName: member.startup.name,
      cpfCnpj: member.cpfCnpj ?? 'Nao informado',
      status: member.status,
      issuedAt: new Date().toISOString(),
      metadata: data.metadata ?? {},
    })
    const lines = [
      ...template.lines,
      ...Object.entries(data.metadata ?? {}).map(([key, value]) => `${key}: ${String(value)}`),
    ]
    const pdf = buildSimplePdf(template.title, lines)
    const fileName = `${data.type.toLowerCase()}-${member.id}-${Date.now()}.pdf`
    const storageKey = `generated-documents/${fileName}`
    const stored = await this.storage.upload(storageKey, pdf)

    const document = await prisma.document.create({
      data: {
        startupId: member.startupId,
        memberId: member.id,
        createdById,
        type: data.type,
        fileUrl: stored.fileUrl,
        storageKey: stored.storageKey,
        metadata: data.metadata as any,
      },
    })

    return { document, url: stored.fileUrl }
  }
}
