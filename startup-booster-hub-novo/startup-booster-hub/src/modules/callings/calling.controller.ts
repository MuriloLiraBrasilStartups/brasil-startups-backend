import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CallingService } from './calling.service'
import {
  applicationSchema,
  callingParamsSchema,
  createCallingSchema,
  listCallingsQuerySchema,
  scoreApplicationSchema,
  updateCallingSchema,
} from './calling.schemas'

const applicationParamsSchema = z.object({
  applicationId: z.string().uuid(),
})

export class CallingController {
  constructor(private readonly callingService = new CallingService()) {}

  async index(request: FastifyRequest, reply: FastifyReply) {
    const query = listCallingsQuerySchema.parse(request.query)
    const result = await this.callingService.list(query)

    return reply.send(result)
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = callingParamsSchema.parse(request.params)
    const calling = await this.callingService.get(id)

    return reply.send({ calling })
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const data = createCallingSchema.parse(request.body)
    const calling = await this.callingService.create(data)

    return reply.status(201).send({ calling })
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = callingParamsSchema.parse(request.params)
    const data = updateCallingSchema.parse(request.body)
    const calling = await this.callingService.update(id, data)

    return reply.send({ calling })
  }

  async destroy(request: FastifyRequest, reply: FastifyReply) {
    const { id } = callingParamsSchema.parse(request.params)
    await this.callingService.delete(id)

    return reply.status(204).send()
  }

  async apply(request: FastifyRequest, reply: FastifyReply) {
    const { id } = callingParamsSchema.parse(request.params)
    const data = applicationSchema.parse(request.body)
    const application = await this.callingService.apply(id, data)

    return reply.status(201).send({ application })
  }

  async score(request: FastifyRequest, reply: FastifyReply) {
    const { applicationId } = applicationParamsSchema.parse(request.params)
    const data = scoreApplicationSchema.parse(request.body)
    const application = await this.callingService.score(applicationId, data.score, data.status)

    return reply.send({ application })
  }
}
