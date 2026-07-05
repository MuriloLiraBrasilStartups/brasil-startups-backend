import cors from '@fastify/cors'
import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { errorHandler } from './http/plugins/error-handler'
import { registerJwt } from './http/plugins/jwt'
import { rateLimit } from './http/plugins/rate-limit'
import { shutdown } from './http/plugins/shutdown'
import { appRoutes } from './http/routes'

export const app = fastify({
  logger: true,
})

app.register(errorHandler)
app.register(shutdown)
app.register(rateLimit)
app.register(cors, { origin: true })
registerJwt(app)

app.register(swagger, {
  openapi: {
    info: {
      title: 'Startup Booster API',
      description: 'Documentacao da API do projeto',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.register(appRoutes)
