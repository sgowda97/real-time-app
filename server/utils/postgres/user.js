const db = require('./db');

async function createUser(email, hashedPassword) {
    try {
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email';
        const values = [email, hashedPassword];
        const result = await db.query(query, values);

        return result.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

async function findUserByEmail(email) {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);

        return result.rows[0];
    } catch (err) {
        console.error('Error finding user:', err);
        throw err;
    }
}

module.exports = {
    createUser,
    findUserByEmail,
};
