// src/modules/members/member.routes.ts

import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from '../../http/middlewares/authenticate'
import { authorizeRoles } from '../../http/middlewares/authorize-roles'
import { MemberController } from './member.controller'

export async function memberRoutes(app: FastifyInstance) {
  const memberController = new MemberController()
  const canManageMembers = [authenticate, authorizeRoles([UserRole.ADMIN, UserRole.GESTOR])]

  // ROTAS COM AUTENTICAÇÃO
  app.get('/', { preHandler: canManageMembers }, memberController.index.bind(memberController))
  app.post('/', { preHandler: canManageMembers }, memberController.store.bind(memberController))
  app.post('/subscriptions', { preHandler: canManageMembers }, memberController.subscription.bind(memberController))
  app.post('/asaas/customers', { preHandler: canManageMembers }, memberController.asaasCustomer.bind(memberController))
  app.post('/asaas/payments', { preHandler: canManageMembers }, memberController.asaasPayment.bind(memberController))

  // ROTAS SEM AUTENTICAÇÃO
  app.get('/:cpfCnpj/status', memberController.status.bind(memberController))
  app.get('/plans', memberController.plans.bind(memberController))
  app.post('/webhooks/asaas', memberController.webhook.bind(memberController))
}