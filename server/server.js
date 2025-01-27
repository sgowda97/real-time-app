const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const collabRoutes = require('./routes/collab');

fastify.register(cors);

fastify.register(collabRoutes, { prefix: 'api' });

const start = async () => {
    try {
        await fastify.listen({ port: 4000 });
        fastify.log.info('Server running at http://localhost:4000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();