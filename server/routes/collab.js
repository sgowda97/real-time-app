async function collabRoutes(fastify, options) {
    fastify.get('/health', async (req, res) => {
        return { status: 'OK', message: 'Server is healthy!' };
    });
}

module.exports = collabRoutes;