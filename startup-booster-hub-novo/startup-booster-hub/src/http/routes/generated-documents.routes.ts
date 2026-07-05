import { createReadStream } from 'node:fs'
import { access } from 'node:fs/promises'
import path from 'node:path'
import type { FastifyInstance } from 'fastify'
import { AppError } from '../../shared/errors/app-error'

export async function generatedDocumentsRoutes(app: FastifyInstance) {
  app.get('/generated-documents/:fileName', {
    schema: {
      tags: ['Documents'],
      summary: 'Entrega PDF gerado em storage local',
      response: {
        200: { type: 'string', format: 'binary' },
      },
    },
  }, async (request, reply) => {
    const { fileName } = request.params as { fileName: string }
    const safeName = path.basename(fileName)
    const filePath = path.resolve('public', 'generated-documents', safeName)

    try {
      await access(filePath)
    } catch {
      throw new AppError('Document not found', 404)
    }

    return reply.type('application/pdf').send(createReadStream(filePath))
  })
}
