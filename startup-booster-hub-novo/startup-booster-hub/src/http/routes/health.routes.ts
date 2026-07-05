import type { FastifyInstance } from 'fastify'
import { prisma } from '../../database/prisma'

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', {
    schema: {
      tags: ['Health'],
      summary: 'Verifica disponibilidade da API e banco de dados',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            service: { type: 'string' },
          },
        },
      },
    },
  }, async () => {
    await prisma.$queryRaw`SELECT 1`

    return {
      status: 'OK',
      service: 'startup-booster-api',
    }
  })
}
