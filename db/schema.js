const { createClient } = require('@libsql/client');

const client = createClient({
    url: process.env.TURSO_DATABASE_URL || 'file:local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

let initialized = false;

const SCHEMA_VERSION = 2;

async function ensureTables() {
    if (initialized) return;

    await client.execute(`CREATE TABLE IF NOT EXISTS schema_version (version INTEGER PRIMARY KEY, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    const verRes = await client.execute(`SELECT COALESCE(MAX(version), 0) AS v FROM schema_version`);
    if (Number(verRes.rows[0].v) >= SCHEMA_VERSION) {
        initialized = true;
        return;
    }

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
            min_stock INTEGER NOT NULL DEFAULT 5,
            image TEXT DEFAULT '',
            description TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (locker_id) REFERENCES lockers(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS warehouse_zones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT DEFAULT '',
            description TEXT DEFAULT '',
            color TEXT DEFAULT '#7b2ff7',
            image TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS warehouse_areas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            zone_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            image TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (zone_id) REFERENCES warehouse_zones(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS warehouse_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            zone_id INTEGER NOT NULL,
            area_id INTEGER DEFAULT NULL,
            name TEXT NOT NULL,
            qty INTEGER NOT NULL DEFAULT 0,
            min_stock INTEGER NOT NULL DEFAULT 5,
            image TEXT DEFAULT '',
            description TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (zone_id) REFERENCES warehouse_zones(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            manager TEXT DEFAULT '',
            description TEXT DEFAULT '',
            image TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS department_lockers (
            department_id INTEGER NOT NULL,
            locker_id INTEGER NOT NULL,
            PRIMARY KEY (department_id, locker_id),
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            job_title TEXT DEFAULT '',
            department_id INTEGER DEFAULT NULL,
            photo TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
        )`,
        `CREATE TABLE IF NOT EXISTS department_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_id INTEGER NOT NULL,
            employee_id INTEGER DEFAULT NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            qty INTEGER NOT NULL DEFAULT 1,
            image TEXT DEFAULT '',
            receipt_date TEXT DEFAULT '',
            purpose TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
        )`,
        `CREATE TABLE IF NOT EXISTS responsibility_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_id INTEGER NOT NULL,
            employee_id INTEGER NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'active',
            notes TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS covenant_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_type TEXT NOT NULL DEFAULT 'item',
            item_id INTEGER NOT NULL,
            from_employee_id INTEGER DEFAULT NULL,
            from_department_id INTEGER DEFAULT NULL,
            to_employee_id INTEGER DEFAULT NULL,
            to_department_id INTEGER DEFAULT NULL,
            transfer_date TEXT NOT NULL,
            start_date TEXT DEFAULT '',
            end_date TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'active',
            condition TEXT DEFAULT '',
            condition_notes TEXT DEFAULT '',
            return_condition TEXT DEFAULT '',
            return_notes TEXT DEFAULT '',
            notes TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS department_equipment (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            department_id INTEGER NOT NULL,
            employee_id INTEGER DEFAULT NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            qty INTEGER NOT NULL DEFAULT 1,
            image TEXT DEFAULT '',
            receipt_date TEXT DEFAULT '',
            purpose TEXT DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
        )`,
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('manager','admin','employee')),
            employee_id INTEGER DEFAULT NULL,
            department_id INTEGER DEFAULT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
        )`
    ], 'write');

    const migrations = [
        `ALTER TABLE items ADD COLUMN description TEXT DEFAULT ''`,
        `ALTER TABLE items ADD COLUMN min_stock INTEGER NOT NULL DEFAULT 5`,
        `ALTER TABLE warehouse_zones ADD COLUMN description TEXT DEFAULT ''`,
        `ALTER TABLE warehouse_zones ADD COLUMN color TEXT DEFAULT '#7b2ff7'`,
        `ALTER TABLE warehouse_zones ADD COLUMN image TEXT DEFAULT ''`,
        `ALTER TABLE warehouse_items ADD COLUMN area_id INTEGER DEFAULT NULL`,
        `ALTER TABLE warehouse_areas ADD COLUMN image TEXT DEFAULT ''`,
        `ALTER TABLE departments ADD COLUMN description TEXT DEFAULT ''`,
        `ALTER TABLE departments ADD COLUMN image TEXT DEFAULT ''`,
        `ALTER TABLE department_items ADD COLUMN receipt_date TEXT DEFAULT ''`,
        `ALTER TABLE department_items ADD COLUMN purpose TEXT DEFAULT ''`,
        `ALTER TABLE lockers ADD COLUMN description TEXT DEFAULT ''`,
        `ALTER TABLE lockers ADD COLUMN image TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN start_date TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN end_date TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN condition TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN condition_notes TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN return_condition TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN return_notes TEXT DEFAULT ''`,
        `ALTER TABLE covenant_history ADD COLUMN entity_type TEXT NOT NULL DEFAULT 'item'`,
        `ALTER TABLE covenant_history ADD COLUMN to_department_id INTEGER DEFAULT NULL`,
        `ALTER TABLE covenant_history ADD COLUMN from_department_id INTEGER DEFAULT NULL`,
    ];
    for (const sql of migrations) {
        try { await client.execute(sql); } catch (e) { /* column exists */ }
    }

    // Migration: relax NOT NULL on covenant_history.to_employee_id (recreate table once)
    try {
        const info = await client.execute("PRAGMA table_info(covenant_history)");
        const toEmpRow = info.rows.find(r => r.name === 'to_employee_id');
        if (toEmpRow && Number(toEmpRow.notnull) === 1) {
            await client.batch([
                `CREATE TABLE covenant_history__new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    entity_type TEXT NOT NULL DEFAULT 'item',
                    item_id INTEGER NOT NULL,
                    from_employee_id INTEGER DEFAULT NULL,
                    from_department_id INTEGER DEFAULT NULL,
                    to_employee_id INTEGER DEFAULT NULL,
                    to_department_id INTEGER DEFAULT NULL,
                    transfer_date TEXT NOT NULL,
                    start_date TEXT DEFAULT '',
                    end_date TEXT DEFAULT '',
                    status TEXT NOT NULL DEFAULT 'active',
                    condition TEXT DEFAULT '',
                    condition_notes TEXT DEFAULT '',
                    return_condition TEXT DEFAULT '',
                    return_notes TEXT DEFAULT '',
                    notes TEXT DEFAULT '',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`,
                `INSERT INTO covenant_history__new
                    (id, entity_type, item_id, from_employee_id, from_department_id, to_employee_id, to_department_id, transfer_date, start_date, end_date, status, condition, condition_notes, return_condition, return_notes, notes, created_at)
                 SELECT id, COALESCE(entity_type,'item'), item_id, from_employee_id, NULL, to_employee_id, NULL, transfer_date, COALESCE(start_date,''), COALESCE(end_date,''), status, COALESCE(condition,''), COALESCE(condition_notes,''), COALESCE(return_condition,''), COALESCE(return_notes,''), COALESCE(notes,''), created_at
                 FROM covenant_history`,
                `DROP TABLE covenant_history`,
                `ALTER TABLE covenant_history__new RENAME TO covenant_history`
            ], 'write');
        }
    } catch (e) { /* ignore */ }

    const result = await client.execute('SELECT COUNT(*) as c FROM lockers');
    if (Number(result.rows[0].c) === 0) {
        const numbers = [12,13,14,15,16,17,18,19,22,23,24,25,26,27,28,29,32,33,34,35,36,37,38,39];
        const stmts = numbers.map((num, idx) => ({
            sql: 'INSERT INTO lockers (id, name, min_stock, position) VALUES (?, ?, ?, ?)',
            args: [num, '', 5, idx]
        }));
        await client.batch(stmts, 'write');
    }

    await client.execute({ sql: `INSERT OR IGNORE INTO schema_version (version) VALUES (?)`, args: [SCHEMA_VERSION] });
    initialized = true;
}

module.exports = { client, ensureTables };
