import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'
import { env } from '../../config/env'

export function registerJwt(app: FastifyInstance) {
  if (!env.JWT_SECRET) {
    app.log.warn('JWT_SECRET is not configured. Protected routes will reject requests.')
    return
  }

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  })
}
