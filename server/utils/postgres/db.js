const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'rta',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'collaboration_app',
    password: process.env.DB_PASSWORD || 'rta',
    port: process.env.DB_PORT || 5000,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
