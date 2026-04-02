const { createClient } = require('@libsql/client');

const client = createClient({
    url: process.env.TURSO_DATABASE_URL || 'file:local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

let initialized = false;

async function ensureTables() {
    if (initialized) return;

    await client.batch([
        `CREATE TABLE IF NOT EXISTS lockers (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL DEFAULT '',
            min_stock INTEGER NOT NULL DEFAULT 5,
            position INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            locker_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            qty INTEGER NOT NULL DEFAULT 0,
            image TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (locker_id) REFERENCES lockers(id) ON DELETE CASCADE
        )`
    ], 'write');

    // Seed default lockers if table is empty
    const result = await client.execute('SELECT COUNT(*) as c FROM lockers');
    if (Number(result.rows[0].c) === 0) {
        const numbers = [
            12, 13, 14, 15, 16, 17, 18, 19,
            22, 23, 24, 25, 26, 27, 28, 29,
            32, 33, 34, 35, 36, 37, 38, 39,
        ];
        const stmts = numbers.map((num, idx) => ({
            sql: 'INSERT INTO lockers (id, name, min_stock, position) VALUES (?, ?, ?, ?)',
            args: [num, '', 5, idx]
        }));
        await client.batch(stmts, 'write');
    }

    initialized = true;
}

module.exports = { client, ensureTables };
