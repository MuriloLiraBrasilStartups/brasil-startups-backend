import type { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from './auth.service'
import { loginSchema, oauthCallbackSchema, refreshSchema, registerSchema } from './auth.schemas'

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const data = registerSchema.parse(request.body)
    const session = await this.authService.register(data, request.server)

    return reply.status(201).send(session)
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body)
    const session = await this.authService.login(data, request.server)

    return reply.send(session)
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const data = refreshSchema.parse(request.body)
    const session = await this.authService.refresh(data, request.server)

    return reply.send(session)
  }

  async googleUrl(_request: FastifyRequest, reply: FastifyReply) {
    return reply.send(this.authService.getOauthUrl('google'))
  }

  async linkedinUrl(_request: FastifyRequest, reply: FastifyReply) {
    return reply.send(this.authService.getOauthUrl('linkedin'))
  }

  async googleCallback(request: FastifyRequest, reply: FastifyReply) {
    const data = oauthCallbackSchema.parse(request.body)
    const session = await this.authService.oauthLogin('google', data, request.server)

    return reply.send(session)
  }

  async linkedinCallback(request: FastifyRequest, reply: FastifyReply) {
    const data = oauthCallbackSchema.parse(request.body)
    const session = await this.authService.oauthLogin('linkedin', data, request.server)

    return reply.send(session)
  }
}
