import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { AppError } from '../../shared/errors/app-error'

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
        issues: error.flatten().fieldErrors,
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      })
    }

    app.log.error(error)

    return reply.status(500).send({
      message: 'Internal server error',
    })
  })
}
