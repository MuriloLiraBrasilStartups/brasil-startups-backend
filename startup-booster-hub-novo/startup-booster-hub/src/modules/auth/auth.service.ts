import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { UserRole } from '@prisma/client'
import { env } from '../../config/env'
import { prisma } from '../../database/prisma'
import { AppError } from '../../shared/errors/app-error'
import type { LoginInput, OauthCallbackInput, RefreshInput, RegisterInput } from './auth.schemas'
import { hashPassword, verifyPassword } from './password'

export class AuthService {
  async register(data: RegisterInput, app: FastifyInstance) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } })

    if (existing) {
      throw new AppError('User with this email already exists', 409)
    }

    const refreshToken = randomUUID()
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        passwordHash: hashPassword(data.password),
        refreshToken,
      },
      select: this.userSelect(),
    })

    return this.buildSession(app, user, refreshToken)
  }

  async login(data: LoginInput, app: FastifyInstance) {
    const user = await prisma.user.findUnique({ where: { email: data.email } })

    if (!user?.passwordHash || !verifyPassword(data.password, user.passwordHash)) {
      throw new AppError('Invalid credentials', 401)
    }

    const refreshToken = randomUUID()
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
      select: this.userSelect(),
    })

    return this.buildSession(app, updatedUser, refreshToken)
  }

  async refresh(data: RefreshInput, app: FastifyInstance) {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: data.refreshToken,
        deletedAt: null,
      },
      select: this.userSelect(),
    })

    if (!user) {
      throw new AppError('Invalid refresh token', 401)
    }

    const refreshToken = randomUUID()
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
      select: this.userSelect(),
    })

    return this.buildSession(app, updatedUser, refreshToken)
  }

  getOauthUrl(provider: 'google' | 'linkedin') {
    if (provider === 'google') {
      if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_REDIRECT_URI) {
        throw new AppError('Google OAuth is not configured', 500)
      }

      const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      url.searchParams.set('client_id', env.GOOGLE_CLIENT_ID)
      url.searchParams.set('redirect_uri', env.GOOGLE_REDIRECT_URI)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('scope', 'openid email profile')

      return { url: url.toString() }
    }

    if (!env.LINKEDIN_CLIENT_ID || !env.LINKEDIN_REDIRECT_URI) {
      throw new AppError('LinkedIn OAuth is not configured', 500)
    }

    const url = new URL('https://www.linkedin.com/oauth/v2/authorization')
    url.searchParams.set('client_id', env.LINKEDIN_CLIENT_ID)
    url.searchParams.set('redirect_uri', env.LINKEDIN_REDIRECT_URI)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', 'openid profile email')

    return { url: url.toString() }
  }

  async oauthLogin(provider: 'google' | 'linkedin', data: OauthCallbackInput, app: FastifyInstance) {
    const profile = await this.fetchOauthProfile(provider, data)
    const providerIdField = provider === 'google' ? 'googleId' : 'linkedinId'
    const providerId = profile.id ?? profile.email
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: profile.email }, { [providerIdField]: providerId }],
        deletedAt: null,
      },
    })
    const refreshToken = randomUUID()

    const user = existing
      ? await prisma.user.update({
          where: { id: existing.id },
          data: { [providerIdField]: providerId, refreshToken },
          select: this.userSelect(),
        })
      : await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            role: UserRole.PUBLICO,
            [providerIdField]: providerId,
            refreshToken,
          },
          select: this.userSelect(),
        })

    return this.buildSession(app, user, refreshToken)
  }

  private async fetchOauthProfile(provider: 'google' | 'linkedin', data: OauthCallbackInput) {
    if (provider === 'google') {
      const token = await this.exchangeToken({
        url: 'https://oauth2.googleapis.com/token',
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectUri: data.redirectUri ?? env.GOOGLE_REDIRECT_URI,
        code: data.code,
      })
      const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${token.access_token}` },
      })
      const profile = await response.json() as { sub?: string; email?: string; name?: string }

      if (!response.ok || !profile.email || !profile.name) {
        throw new AppError('Could not load Google profile', 401)
      }

      return { id: profile.sub, email: profile.email, name: profile.name }
    }

    const token = await this.exchangeToken({
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
      redirectUri: data.redirectUri ?? env.LINKEDIN_REDIRECT_URI,
      code: data.code,
    })
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    const profile = await response.json() as { sub?: string; email?: string; name?: string }

    if (!response.ok || !profile.email || !profile.name) {
      throw new AppError('Could not load LinkedIn profile', 401)
    }

    return { id: profile.sub, email: profile.email, name: profile.name }
  }

  private async exchangeToken(input: {
    url: string
    clientId?: string
    clientSecret?: string
    redirectUri?: string
    code: string
  }) {
    if (!input.clientId || !input.clientSecret || !input.redirectUri) {
      throw new AppError('OAuth provider is not configured', 500)
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: input.code,
      client_id: input.clientId,
      client_secret: input.clientSecret,
      redirect_uri: input.redirectUri,
    })
    const response = await fetch(input.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const payload = await response.json() as { access_token?: string; error_description?: string }

    if (!response.ok || !payload.access_token) {
      throw new AppError(payload.error_description ?? 'OAuth token exchange failed', 401)
    }

    return { access_token: payload.access_token }
  }

  private buildSession(
    app: FastifyInstance,
    user: { id: string; name: string; email: string; role: UserRole },
    refreshToken: string,
  ) {
    return {
      user,
      accessToken: app.jwt.sign({ sub: user.id, role: user.role }),
      refreshToken,
    }
  }

  private userSelect() {
    return {
      id: true,
      name: true,
      email: true,
      role: true,
    } as const
  }
}
