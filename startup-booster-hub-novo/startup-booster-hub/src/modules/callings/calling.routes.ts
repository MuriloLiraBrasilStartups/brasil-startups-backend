import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../http/middlewares/authenticate'
import { authorizeRoles } from '../../http/middlewares/authorize-roles'
import { CallingController } from './calling.controller'

export async function callingRoutes(app: FastifyInstance) {
  const callingController = new CallingController()
  const canManageCallings = [authenticate, authorizeRoles([UserRole.ADMIN, UserRole.GESTOR])]
  const canScoreApplications = [authenticate, authorizeRoles([UserRole.ADMIN, UserRole.GESTOR])]

  app.get('/', { schema: routeSchema('Callings', 'Lista chamamentos', false) }, callingController.index.bind(callingController))
  app.get('/:id', { schema: routeSchema('Callings', 'Detalha chamamento') }, callingController.show.bind(callingController))
  app.post('/', { preHandler: canManageCallings, schema: routeSchema('Callings', 'Cria chamamento') }, callingController.store.bind(callingController))
  app.put('/:id', { preHandler: canManageCallings, schema: routeSchema('Callings', 'Atualiza chamamento') }, callingController.update.bind(callingController))
  app.delete('/:id', { preHandler: canManageCallings, schema: routeSchema('Callings', 'Remove chamamento logicamente') }, callingController.destroy.bind(callingController))
  app.post('/:id/applications', { schema: routeSchema('Callings', 'Envia inscricao multi-step', false) }, callingController.apply.bind(callingController))
  app.patch('/applications/:applicationId/score', { preHandler: canScoreApplications, schema: routeSchema('Callings', 'Avalia e pontua inscricao') }, callingController.score.bind(callingController))
}

function routeSchema(tag: string, summary: string, authenticated = true) {
  return {
    tags: [tag],
    summary,
    security: authenticated ? [{ bearerAuth: [] }] : [],
    response: {
      200: { type: 'object', additionalProperties: true },
      201: { type: 'object', additionalProperties: true },
      204: { type: 'null' },
    },
  }
}
