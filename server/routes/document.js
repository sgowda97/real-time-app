const documentService = require('../utils/postgres/document');

async function documentRoutes(fastify, options) {
    fastify.post('/documents', async (request, reply) => {
        const { title, content, ownerEmail } = request.body;

        try {
            const document = await documentService.createDocument(title, content, ownerEmail);
            reply.send({ success: true, document });
        } catch (err) {
            reply.status(500).send({ error: 'Failed to save document' });
        }
    });

    fastify.get('/documents', async (request, reply) => {
        const { userEmail } = request.query;

        try {
            const documents = await documentService.getDocumentsForUser(userEmail);
            reply.send({ success: true, documents });
        } catch (err) {
            reply.status(500).send({ error: 'Failed to fetch documents' });
        }
    });

    fastify.put('/documents/:id', async (request, reply) => {
        const { id } = request.params;
        const { content } = request.body;

        try {
            const updatedDocument = await documentService.updateDocumentContent(id, content);
            reply.send({ success: true, document: updatedDocument });
        } catch (err) {
            reply.status(500).send({ error: 'Failed to update document' });
        }
    });

    fastify.get('/documents/:id', async (request, reply) => {
        const { id } = request.params;

        try {
            const document = await documentService.getDocumentById(id);
            reply.send({ success: true, document });
        } catch (err) {
            reply.status(500).send({ error: 'Failed to fetch document' });
        }
    });

    fastify.post('/documents/:id/share', async (request, reply) => {
        const { id } = request.params;
        const { sharedWithEmail, sharedByEmail } = request.body;

        try {
            await documentService.shareDocument(id, sharedWithEmail, sharedByEmail);
            reply.send({ success: true, message: 'Document shared successfully' });
        } catch (err) {
            reply.status(500).send({ error: 'Failed to share document' });
        }
    });
}

module.exports = documentRoutes;