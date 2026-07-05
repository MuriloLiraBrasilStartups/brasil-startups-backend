import type { FastifyReply, FastifyRequest } from 'fastify'
import { DocumentService } from './document.service'
import { generateDocumentSchema } from './document.schemas'

export class DocumentController {
  constructor(private readonly documentService = new DocumentService()) {}

  async index(_request: FastifyRequest, reply: FastifyReply) {
    const documents = await this.documentService.listDocuments()

    return reply.send({ documents })
  }

  async generate(request: FastifyRequest, reply: FastifyReply) {
    const data = generateDocumentSchema.parse(request.body)
    const result = await this.documentService.generate(data, request.user?.sub)

    return reply.status(201).send(result)
  }
}
