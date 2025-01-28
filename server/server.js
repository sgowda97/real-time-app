const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const socketio = require('fastify-socket.io');
const collabRoutes = require('./routes/collab');
const collaborationHandler = require('./sockets/collab');

fastify.register(socketio, {
    cors: {
        origin: 'http://localhost:3001',
        credentials: true,
    },
    transports: ['websocket'],
});

fastify.register(cors, {
    origin: 'http://localhost:3001',
    credentials: true
});

fastify.register(collabRoutes, { prefix: 'api' });

fastify.ready().then(() => collaborationHandler(fastify.io));

const start = async () => {
    try {
        await fastify.listen({ port: 4000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();