import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createStartupSchema,
  importStartupsSchema,
  listStartupsQuerySchema,
  startupParamsSchema,
  updateStartupSchema,
} from './startup.schemas'
import { StartupService } from './startup.service'

export class StartupController {
  constructor(private readonly startupService = new StartupService()) {}

  async index(request: FastifyRequest, reply: FastifyReply) {
    const query = listStartupsQuerySchema.parse(request.query)
    const result = await this.startupService.listStartups(query)

    return reply.send(result)
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = startupParamsSchema.parse(request.params)
    const startup = await this.startupService.getStartup(id)

    return reply.send({ startup })
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const data = createStartupSchema.parse(request.body)
    const startup = await this.startupService.createStartup(data)

    return reply.status(201).send({ startup })
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = startupParamsSchema.parse(request.params)
    const data = updateStartupSchema.parse(request.body)
    const startup = await this.startupService.updateStartup(id, data)

    return reply.send({ startup })
  }

  async destroy(request: FastifyRequest, reply: FastifyReply) {
    const { id } = startupParamsSchema.parse(request.params)
    await this.startupService.deleteStartup(id)

    return reply.status(204).send()
  }

  async importStartups(request: FastifyRequest, reply: FastifyReply) {
    const data = importStartupsSchema.parse(request.body)
    const result = await this.startupService.importStartups(data)

    return reply.status(201).send(result)
  }
}
