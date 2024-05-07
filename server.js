const fastify = require("fastify")({ logger: true });
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const path = require("path")
const cors = require("@fastify/cors");
const multer = require('fastify-multer');
const connectDB = require("./config/database");
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/public/',
})
const userRoutes = require("./routes/user");
const playerRoutes = require("./routes/player");

fastify.register(cors, { origin: "*" });
fastify.register(multer.contentParser)

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Ollosa Shop API',
      description: 'Documentation de L\'API Ollosa.shop',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:8000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
  },

  swagger: {
    info: {
      title: 'Ollosa Shop API',
      description: 'Documentation de l\'API Ollosa.shop',
      version: '1.0.0'
    },

    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
  }
});


fastify.register(userRoutes);
fastify.register(playerRoutes)




fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next();
    },
    preHandler: function (_request, _reply, next) {
      next();
    }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true
});






const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: process.env.PORT });
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
