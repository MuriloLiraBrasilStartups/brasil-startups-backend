import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../../shared/errors/app-error'

export async function authenticate(request: FastifyRequest, _reply: FastifyReply) {
  if (!request.jwtVerify) {
    throw new AppError('Authentication is not configured', 500)
  }

  try {
    await request.jwtVerify()
  } catch {
    throw new AppError('Invalid or missing authentication token', 401)
  }
}
