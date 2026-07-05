import { DocumentType } from '@prisma/client'
import { z } from 'zod'

export const generateDocumentSchema = z.object({
  type: z.nativeEnum(DocumentType),
  memberId: z.string().uuid(),
  metadata: z.record(z.unknown()).optional(),
})

export type GenerateDocumentInput = z.infer<typeof generateDocumentSchema>
