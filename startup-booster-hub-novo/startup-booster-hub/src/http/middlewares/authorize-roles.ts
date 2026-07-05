import type { UserRole } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '../../shared/errors/app-error'

export function authorizeRoles(allowedRoles: UserRole[]) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const role = request.user?.role

    if (!role || !allowedRoles.includes(role)) {
      throw new AppError('Forbidden', 403)
    }
  }
}
