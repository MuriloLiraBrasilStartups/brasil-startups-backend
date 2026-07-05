import { MemberRole, MemberStatus, PlanType } from '@prisma/client'
import { z } from 'zod'

const cpfCnpjSchema = z.string().min(11).transform((value) => value.replace(/\D/g, ''))

export const memberParamsSchema = z.object({
  cpfCnpj: cpfCnpjSchema,
})

export const createMemberSchema = z.object({
  userId: z.string().uuid(),
  startupId: z.string().uuid(),
  cpfCnpj: cpfCnpjSchema,
  asaasCustomerId: z.string().optional(),
  role: z.nativeEnum(MemberRole).default(MemberRole.MEMBER),
  status: z.nativeEnum(MemberStatus).default(MemberStatus.INATIVO),
})

export const webhookSchema = z.object({
  event: z.string(),
  payment: z
    .object({
      customer: z.string().optional(),
      externalReference: z.string().optional(),
      status: z.string().optional(),
      billingType: z.string().optional(),
      dueDate: z.string().optional(),
      value: z.number().optional(),
    })
    .optional(),
  subscription: z
    .object({
      externalReference: z.string().optional(),
      status: z.string().optional(),
      nextDueDate: z.string().optional(),
      value: z.number().optional(),
    })
    .optional(),
})

export const createSubscriptionSchema = z.object({
  startupId: z.string().uuid(),
  plan: z.nativeEnum(PlanType),
  dueDate: z.coerce.date().optional(),
  balance: z.coerce.number().default(0),
  asaasSubscriptionId: z.string().optional(),
})

export type CreateMemberInput = z.infer<typeof createMemberSchema>
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>
export type WebhookInput = z.infer<typeof webhookSchema>
