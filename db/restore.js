// Loads a dump.js backup into the DB at TURSO_DATABASE_URL.
// Refuses to run if the target already has non-empty tables (safety).
// Usage: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node db/restore.js <backup.json>

const { createClient } = require('@libsql/client');
const fs = require('fs');

const inputPath = process.argv[2];
if (!inputPath) { console.error('usage: node db/restore.js <backup.json>'); process.exit(2); }

(async () => {
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const existing = await client.execute(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
    );
    for (const t of existing.rows) {
        const r = await client.execute(`SELECT COUNT(*) AS c FROM "${t.name}"`);
        if (Number(r.rows[0].c) > 0) {
            console.error(`REFUSING: target table "${t.name}" already has ${r.rows[0].c} rows. Aborting so we don't mix data.`);
            process.exit(1);
        }
    }

    const dump = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    console.log(`Restoring from: ${inputPath}`);
    console.log(`Dumped at:      ${dump.meta.dumped_at}`);
    console.log(`Source:         ${dump.meta.source_url}`);
    console.log(`Target:         ${process.env.TURSO_DATABASE_URL}`);
    console.log(`Tables: ${dump.tables.length}, Indexes: ${dump.indexes.length}\n`);

    await client.execute(`PRAGMA foreign_keys = OFF`);

    console.log('Creating tables...');
    for (const t of dump.tables) {
        await client.execute(t.create_sql);
    }

    console.log('\nInserting rows:');
    for (const t of dump.tables) {
        if (t.rows.length === 0) { console.log(`  ${t.name.padEnd(28)} -> 0 rows (skip)`); continue; }
        const cols = t.columns.map(c => `"${c}"`).join(',');
        const placeholders = t.columns.map(() => '?').join(',');
        const batch = t.rows.map(row => ({
            sql: `INSERT INTO "${t.name}" (${cols}) VALUES (${placeholders})`,
            args: t.columns.map(c => {
                const v = row[c];
                if (v === null || v === undefined) return null;
                return v;
            }),
        }));
        for (let i = 0; i < batch.length; i += 50) {
            await client.batch(batch.slice(i, i + 50), 'write');
        }
        console.log(`  ${t.name.padEnd(28)} -> ${t.rows.length} rows`);
    }

    console.log('\nRecreating indexes:');
    let idxCreated = 0;
    for (const idx of dump.indexes) {
        try {
            await client.execute(idx.sql);
            idxCreated++;
        } catch (e) {
            if (!String(e.message).toLowerCase().includes('already exists')) throw e;
        }
    }
    console.log(`  ${idxCreated} of ${dump.indexes.length} (the rest were auto-created by UNIQUE constraints)`);

    await client.execute(`PRAGMA foreign_keys = ON`);

    console.log('\nVerification (expected vs actual per table):');
    let allOk = true;
    for (const t of dump.tables) {
        const r = await client.execute(`SELECT COUNT(*) AS c FROM "${t.name}"`);
        const expected = t.rows.length;
        const actual = Number(r.rows[0].c);
        const ok = expected === actual;
        allOk = allOk && ok;
        console.log(`  ${t.name.padEnd(28)} expected=${String(expected).padStart(4)} actual=${String(actual).padStart(4)} ${ok ? 'OK' : '*** MISMATCH ***'}`);
    }

    console.log(allOk ? '\nRestore complete, all row counts match.' : '\nRestore finished WITH MISMATCHES — do NOT switch traffic yet.');
    process.exit(allOk ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
