const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'lockers.db');

function initDB() {
    const db = new Database(DB_PATH);

    // Enable WAL mode for better concurrent reads
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Create tables
    db.exec(`
        CREATE TABLE IF NOT EXISTS lockers (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL DEFAULT '',
            min_stock INTEGER NOT NULL DEFAULT 5,
            position INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            locker_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            qty INTEGER NOT NULL DEFAULT 0,
            image TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (locker_id) REFERENCES lockers(id) ON DELETE CASCADE
        );
    `);

    // Seed default lockers if table is empty
    const count = db.prepare('SELECT COUNT(*) as c FROM lockers').get().c;
    if (count === 0) {
        const insert = db.prepare('INSERT INTO lockers (id, name, min_stock, position) VALUES (?, ?, ?, ?)');
        const seedLockers = db.transaction(() => {
            const numbers = [
                12, 13, 14, 15, 16, 17, 18, 19,
                22, 23, 24, 25, 26, 27, 28, 29,
                32, 33, 34, 35, 36, 37, 38, 39,
            ];
            numbers.forEach((num, idx) => {
                insert.run(num, '', 5, idx);
            });
        });
        seedLockers();
    }

    return db;
}

module.exports = { initDB };
