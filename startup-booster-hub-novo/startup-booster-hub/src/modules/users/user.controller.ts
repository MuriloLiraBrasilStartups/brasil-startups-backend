import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from './user.service'
import { createUserSchema, listUsersQuerySchema } from './user.schemas'

export class UserController {
  constructor(private readonly userService = new UserService()) {}

  async index(_request: FastifyRequest, reply: FastifyReply) {
    const query = listUsersQuerySchema.parse(_request.query)
    const result = await this.userService.listUsers(query)

    return reply.send(result)
  }

  async store(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserSchema.parse(request.body)
    const user = await this.userService.createUser(data)

    return reply.status(201).send({ user })
  }
}
