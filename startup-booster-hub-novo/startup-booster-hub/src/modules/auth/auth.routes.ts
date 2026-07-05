import type { FastifyInstance } from 'fastify'
import { AuthController } from './auth.controller'

export async function authRoutes(app: FastifyInstance) {
  const authController = new AuthController()

  app.post('/register', { schema: routeSchema('Auth', 'Cria usuario e sessao JWT') }, authController.register.bind(authController))
  app.post('/login', { schema: routeSchema('Auth', 'Autentica usuario com email e senha') }, authController.login.bind(authController))
  app.post('/refresh', { schema: routeSchema('Auth', 'Renova access token via refresh token') }, authController.refresh.bind(authController))
  app.get('/google', { schema: routeSchema('Auth', 'Retorna URL OAuth do Google') }, authController.googleUrl.bind(authController))
  app.post('/google/callback', { schema: routeSchema('Auth', 'Finaliza OAuth Google via authorization code') }, authController.googleCallback.bind(authController))
  app.get('/linkedin', { schema: routeSchema('Auth', 'Retorna URL OAuth do LinkedIn') }, authController.linkedinUrl.bind(authController))
  app.post('/linkedin/callback', { schema: routeSchema('Auth', 'Finaliza OAuth LinkedIn via authorization code') }, authController.linkedinCallback.bind(authController))
}

function routeSchema(tag: string, summary: string) {
  return {
    tags: [tag],
    summary,
    response: {
      200: { type: 'object', additionalProperties: true },
      201: { type: 'object', additionalProperties: true },
    },
  }
}
