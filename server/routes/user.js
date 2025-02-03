const userService = require('../utils/postgres/user');

async function userRoutes(fastify, options) {
    const userSchema = {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 8 },
            },
        },
    };

    fastify.post("/signup", { schema: userSchema }, async (request, reply) => {
        const { email, password } = request.body;

        const hashedPassword = await fastify.bcrypt.hash(password);
        const user = await userService.createUser(email, hashedPassword);

        reply.send({ success: true, user });
    });

    fastify.post("/login", { schema: userSchema }, async (request, reply) => {
        try {
            const { email, password } = request.body;
            const user = await userService.findUserByEmail(email);

            if (!user || !(await fastify.bcrypt.compare(password, user.password))) {
                return reply.status(401).send({ error: 'Invalid credentials' });
            }

            const token = fastify.jwt.sign({ userId: user.id, email }, { expiresIn: '1h' });
            reply.send({ token, userId: user.id });
        } catch (err) {
            fastify.log.error(err);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.get('/profile', async (req, reply) => {
        try {
            await req.jwtVerify();
            reply.send({ message: 'You have access!' });
        } catch (err) {
            reply.code(401).send({ error: err });
        }
    });
}

module.exports = userRoutes;