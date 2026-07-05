import type { FastifyInstance } from 'fastify'
import { prisma } from '../../database/prisma'

export async function shutdown(app: FastifyInstance) {
  app.addHook('onClose', async () => {
    await prisma.$disconnect()
  })
}
