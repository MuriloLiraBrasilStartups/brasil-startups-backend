// src/routes/member.routes.ts
import { FastifyInstance } from 'fastify'
import { AsaasMemberStatusService } from '../../integrations/asaas/asaas-member-status.service'

const memberStatusService = new AsaasMemberStatusService()

export async function memberRoutes(fastify: FastifyInstance) {
  
  // Rota de Status
  fastify.get('/api/members/:cpfCnpj/status', async (request, reply) => {
    const { cpfCnpj } = request.params as { cpfCnpj: string }
    const status = await memberStatusService.getMemberStatus(cpfCnpj)
    return reply.send(status)
  })

  // Rota de Planos
  fastify.get('/api/members/plans', async () => {
    return await memberStatusService.listAvailablePlans()
  })

  // Webhook do Asaas
  fastify.post('/api/webhooks/asaas', async (request, reply) => {
    const token = request.headers['asaas-access-token']

    if (token !== process.env.ASAAS_WEBHOOK_SECRET) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const body = request.body as any
    // O Asaas pode mandar o ID do cliente no campo payment ou subscription
    const customerId = body.payment?.customer || body.subscription?.customer

    if (customerId) {
      try {
        // 💡 Usamos o tradutor público para descobrir o CPF do dono do pagamento
        const customer = await memberStatusService.customersService.getCustomer(customerId)
        
        if (customer?.cpfCnpj) {
          // 💡 Limpamos o cache para que a próxima consulta pegue o status novo
          await memberStatusService.invalidateCache(customer.cpfCnpj)
        }
      } catch (err) {
        fastify.log.error(err, 'Erro ao processar Webhook')
      }
    }

    return reply.status(200).send({ received: true })
  })
}