import { CallingStatus } from '@prisma/client'
import { z } from 'zod'

export const callingParamsSchema = z.object({
  id: z.string().uuid(),
})

export const createCallingSchema = z.object({
  startupId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().min(2),
  status: z.nativeEnum(CallingStatus).default(CallingStatus.RASCUNHO),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
  formSchema: z.record(z.unknown()).optional(),
})

export const updateCallingSchema = createCallingSchema.partial()

export const listCallingsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  status: z.nativeEnum(CallingStatus).optional(),
  startupId: z.string().uuid().optional(),
})

export const applicationSchema = z.object({
  userId: z.string().uuid().optional(),
  applicantName: z.string().min(2),
  applicantEmail: z.string().email(),
  stepData: z.record(z.unknown()),
})

export const scoreApplicationSchema = z.object({
  score: z.number().int().min(0).max(100),
  status: z.string().min(2).default('SCORED'),
})

export type CreateCallingInput = z.infer<typeof createCallingSchema>
export type UpdateCallingInput = z.infer<typeof updateCallingSchema>
export type ListCallingsQuery = z.infer<typeof listCallingsQuerySchema>
export type ApplicationInput = z.infer<typeof applicationSchema>
