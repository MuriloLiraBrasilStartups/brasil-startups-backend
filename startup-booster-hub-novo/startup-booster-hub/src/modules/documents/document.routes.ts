import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../http/middlewares/authenticate'
import { authorizeRoles } from '../../http/middlewares/authorize-roles'
import { DocumentController } from './document.controller'

export async function documentRoutes(app: FastifyInstance) {
  const documentController = new DocumentController()
  const canGenerateDocuments = [
    authenticate,
    authorizeRoles([UserRole.ADMIN, UserRole.GESTOR, UserRole.ASSOCIADO, UserRole.STARTUP]),
  ]

  app.get('/', { preHandler: canGenerateDocuments, schema: routeSchema('Documents', 'Lista documentos gerados') }, documentController.index.bind(documentController))
  app.post('/generate', { preHandler: canGenerateDocuments, schema: routeSchema('Documents', 'Gera PDF de declaracao, carta ou certificado') }, documentController.generate.bind(documentController))
}

function routeSchema(tag: string, summary: string) {
  return {
    tags: [tag],
    summary,
    security: [{ bearerAuth: [] }],
    response: {
      200: { type: 'object', additionalProperties: true },
      201: { type: 'object', additionalProperties: true },
    },
  }
}
