// src/routes/member.routes.ts
import { FastifyInstance } from 'fastify'
import { AsaasMemberStatusService } from '../../integrations/asaas/asaas-member-status.service'

const memberStatusService = new AsaasMemberStatusService()

export async function memberRoutes(fastify: FastifyInstance) {
  
  // Endpoint de Status
  fastify.get('/api/members/:cpfCnpj/status', async (request, reply) => {
    const { cpfCnpj } = request.params as { cpfCnpj: string }
    const status = await memberStatusService.getMemberStatus(cpfCnpj)
    return reply.send(status)
  })

  // Webhook do Asaas
  fastify.post('/api/webhooks/asaas', async (request, reply) => {
    const token = request.headers['asaas-access-token']

    // Validação de segurança (O "Crachá" do Asaas)
    if (token !== process.env.ASAAS_WEBHOOK_SECRET) {
      return reply.status(401).send({ error: 'Não autorizado' })
    }

    const body = request.body as any
    const customerId = body.payment?.customer || body.subscription?.customer

    if (customerId) {
      try {
        // 💡 Agora acessamos diretamente pois é 'public'
        const customer = await memberStatusService.customersService.getCustomer(customerId)
        
        if (customer?.cpfCnpj) {
          // Limpa o Post-it (Cache) para que a próxima consulta pegue o dado novo do Asaas
          await memberStatusService.invalidateCache(customer.cpfCnpj)
        }
      } catch (err) {
        fastify.log.error(err, 'Erro ao processar atualização de cache via Webhook')
      }
    }

    return reply.status(200).send({ received: true })
  })
}