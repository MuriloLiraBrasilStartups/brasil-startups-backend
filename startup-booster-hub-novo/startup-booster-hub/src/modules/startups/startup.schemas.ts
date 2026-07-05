import { StartupPhase } from '@prisma/client'
import { z } from 'zod'

const cnpjSchema = z
  .string()
  .min(14)
  .transform((value) => value.replace(/\D/g, ''))
  .refine((value) => value.length === 14, 'CNPJ must contain 14 digits')

export const createStartupSchema = z.object({
  name: z.string().min(2),
  cnpj: cnpjSchema,
  state: z.string().length(2).transform((value) => value.toUpperCase()),
  city: z.string().min(2),
  segment: z.string().min(2),
  phase: z.nativeEnum(StartupPhase).default(StartupPhase.IDEACAO),
  product: z.string().min(2).optional(),
  businessModel: z.string().min(2).optional(),
  founders: z.array(z.string().min(2)).default([]),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

export const updateStartupSchema = createStartupSchema.partial().extend({
  cnpj: cnpjSchema.optional(),
})

export const startupParamsSchema = z.object({
  id: z.string().uuid(),
})

export const listStartupsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  name: z.string().optional(),
  cnpj: z.string().transform((value) => value.replace(/\D/g, '')).optional(),
  state: z.string().length(2).transform((value) => value.toUpperCase()).optional(),
  city: z.string().optional(),
  segment: z.string().optional(),
  phase: z.nativeEnum(StartupPhase).optional(),
  product: z.string().optional(),
  businessModel: z.string().optional(),
  founder: z.string().optional(),
})

export const importStartupsSchema = z.object({
  content: z.string().min(1),
  format: z.enum(['csv', 'tsv', 'xlsx']).default('csv'),
  delimiter: z.string().length(1).optional(),
  base64: z.boolean().default(false),
})

export type CreateStartupInput = z.infer<typeof createStartupSchema>
export type UpdateStartupInput = z.infer<typeof updateStartupSchema>
export type ListStartupsQuery = z.infer<typeof listStartupsQuerySchema>
export type ImportStartupsInput = z.infer<typeof importStartupsSchema>
