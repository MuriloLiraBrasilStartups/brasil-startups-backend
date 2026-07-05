import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../http/middlewares/authenticate'
import { authorizeRoles } from '../../http/middlewares/authorize-roles'
import { StartupController } from './startup.controller'

export async function startupRoutes(app: FastifyInstance) {
  const startupController = new StartupController()
  const canManageStartups = [authenticate, authorizeRoles([UserRole.ADMIN, UserRole.GESTOR])]

  app.get('/', { schema: routeSchema('Startups', 'Lista startups com filtros e paginacao', false) }, startupController.index.bind(startupController))
  app.get('/:id', { schema: routeSchema('Startups', 'Detalha startup por ID', false) }, startupController.show.bind(startupController))

  app.post('/', { preHandler: canManageStartups, schema: routeSchema('Startups', 'Cria startup') }, startupController.store.bind(startupController))
  app.put('/:id', { preHandler: canManageStartups, schema: routeSchema('Startups', 'Atualiza startup') }, startupController.update.bind(startupController))
  app.delete('/:id', { preHandler: canManageStartups, schema: routeSchema('Startups', 'Remove startup logicamente') }, startupController.destroy.bind(startupController))
  app.post('/import', { preHandler: canManageStartups, schema: routeSchema('Startups', 'Importa startups em massa por CSV, TSV ou XLSX') }, startupController.importStartups.bind(startupController))
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
