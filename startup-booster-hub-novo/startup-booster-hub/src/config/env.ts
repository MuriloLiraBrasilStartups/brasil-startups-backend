import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32).optional(),
  ASAAS_API_KEY: z.string().optional(),
  ASAAS_BASE_URL: z.string().url().default('https://sandbox.asaas.com/v3'),
  ASAAS_WEBHOOK_TOKEN: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
  LINKEDIN_CLIENT_ID: z.string().optional(),
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  LINKEDIN_REDIRECT_URI: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ENDPOINT: z.string().url().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_PUBLIC_URL: z.string().url().optional(),
  PUBLIC_API_URL: z.string().url().default('http://localhost:3333'),
})

const parsedEnv = envSchema.safeParse({
  ...process.env,
  ASAAS_API_KEY: process.env.ASAAS_API_KEY ?? process.env.AASAAS_API_KEY,
  ASAAS_BASE_URL: process.env.ASAAS_BASE_URL ?? process.env.AASAAS_BASE_URL,
})

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
