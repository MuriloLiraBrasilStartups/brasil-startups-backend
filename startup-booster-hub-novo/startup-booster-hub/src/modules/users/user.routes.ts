import type { FastifyInstance } from 'fastify'
import { UserRole } from '@prisma/client'
import { authenticate } from '../../http/middlewares/authenticate'
import { authorizeRoles } from '../../http/middlewares/authorize-roles'
import { UserController } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()
  const canManageUsers = [authenticate, authorizeRoles([UserRole.ADMIN, UserRole.GESTOR])]

  app.get('/', { preHandler: canManageUsers, schema: routeSchema('Users', 'Lista usuarios') }, userController.index.bind(userController))
  app.post('/', { preHandler: canManageUsers, schema: routeSchema('Users', 'Cria usuario administrativo sem senha') }, userController.store.bind(userController))
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
