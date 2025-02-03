require('dotenv').config();

const cors = require('@fastify/cors');
const fastifyJWT = require('@fastify/jwt');

const fastify = require('fastify')({ logger: true });
const socketio = require('fastify-socket.io');
const bcrypt = require('fastify-bcrypt');

const collabRoutes = require('./routes/collab');
const userRoutes = require('./routes/user');
const documentRoutes = require('./routes/document');

const collaborationHandler = require('./sockets/collab');

fastify.register(socketio, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3001',
        credentials: true,
    },
    transports: ['websocket'],
});

fastify.register(cors, {
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true
});

fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET || "someSecret",
});

fastify.register(bcrypt, { saltWorkFactor: 12 });

fastify.register(collabRoutes, { prefix: 'api' });
fastify.register(userRoutes, { prefix: 'users' });
fastify.register(documentRoutes, { prefix: 'api' });

fastify.ready().then(() => collaborationHandler(fastify.io));

const start = async () => {
    try {
        fastify.listen({ port: process.env.PORT || 4000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();