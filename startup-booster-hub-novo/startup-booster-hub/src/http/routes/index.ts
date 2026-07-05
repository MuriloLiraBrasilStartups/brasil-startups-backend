import type { FastifyInstance } from 'fastify'
import { authRoutes } from '../../modules/auth/auth.routes'
import { callingRoutes } from '../../modules/callings/calling.routes'
import { documentRoutes } from '../../modules/documents/document.routes'
import { memberRoutes } from '../../modules/members/member.routes'
import { startupRoutes } from '../../modules/startups/startup.routes'
import { userRoutes } from '../../modules/users/user.routes'
import { generatedDocumentsRoutes } from './generated-documents.routes'
import { healthRoutes } from './health.routes'
import { memberRoutes as asaasMemberRoutes } from './member.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(healthRoutes)
  app.register(generatedDocumentsRoutes)

  app.register(async (api) => {
    api.register(userRoutes, { prefix: '/users' })
    api.register(startupRoutes, { prefix: '/startups' })
    api.register(authRoutes, { prefix: '/auth' })
    api.register(asaasMemberRoutes, { prefix: '/members' })
    api.register(documentRoutes, { prefix: '/documents' })
    api.register(callingRoutes, { prefix: '/callings' })
  }, { prefix: '/api/v1' })

  app.register(async (api) => {
    api.register(memberRoutes, { prefix: '/members' })
  }, { prefix: '/api' })
}
