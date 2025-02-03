const db = require('./db');

async function createDocument(title, content, ownerEmail) {
    const query = `
        INSERT INTO documents (title, content, owner_email)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, owner_email, created_at, updated_at
    `;
    const values = [title, content, ownerEmail];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getDocumentsForUser(userEmail) {
    const query = `
        SELECT d.id, d.title, d.content, d.owner_email, d.created_at, d.updated_at
        FROM documents d
        WHERE d.owner_email = $1
        UNION
        SELECT d.id, d.title, d.content, d.owner_email, d.created_at, d.updated_at
        FROM documents d
        JOIN shared_documents sd ON d.id = sd.document_id
        WHERE sd.shared_with_email = $1
    `;
    const result = await db.query(query, [userEmail]);
    return result.rows;
}

async function updateDocumentContent(id, content) {
    const query = `
        UPDATE documents
        SET content = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING id, title, content, owner_email, created_at, updated_at
    `;
    const values = [content, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function getDocumentById(id) {
    const query = `
        SELECT id, title, content, owner_email, created_at, updated_at
        FROM documents
        WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function shareDocument(documentId, sharedWithEmail, sharedByEmail) {
    const query = `
        INSERT INTO shared_documents (document_id, shared_with_email, shared_by_email)
        VALUES ($1, $2, $3)
    `;
    const values = [documentId, sharedWithEmail, sharedByEmail];
    await db.query(query, values);
}

module.exports = {
    createDocument,
    getDocumentsForUser,
    updateDocumentContent,
    getDocumentById,
    shareDocument,
};