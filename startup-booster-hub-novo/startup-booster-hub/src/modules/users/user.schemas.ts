import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.nativeEnum(UserRole).default(UserRole.PUBLICO),
})

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>
