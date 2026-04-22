// Dumps a libsql database to a JSON file. Schema + all rows + user indexes.
// Usage: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node db/dump.js [output-path]
const { createClient } = require('@libsql/client');
const fs = require('fs');

const outPath = process.argv[2] || `db/backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;

function stringifyReplacer(_key, value) {
    if (typeof value === 'bigint') return value.toString() + 'n';
    if (value instanceof Uint8Array) return { __type: 'bytes', base64: Buffer.from(value).toString('base64') };
    return value;
}

(async () => {
    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const tablesRes = await client.execute(
        `SELECT name, sql FROM sqlite_master
         WHERE type='table' AND name NOT LIKE 'sqlite_%'
         ORDER BY name`
    );
    const indexesRes = await client.execute(
        `SELECT name, tbl_name, sql FROM sqlite_master
         WHERE type='index' AND name NOT LIKE 'sqlite_%' AND sql IS NOT NULL
         ORDER BY tbl_name, name`
    );

    const dump = {
        meta: {
            dumped_at: new Date().toISOString(),
            source_url: process.env.TURSO_DATABASE_URL,
        },
        tables: [],
        indexes: indexesRes.rows.map(r => ({ name: r.name, tbl_name: r.tbl_name, sql: r.sql })),
    };

    console.log('Tables:');
    for (const t of tablesRes.rows) {
        const name = t.name;
        const data = await client.execute(`SELECT * FROM "${name}"`);
        dump.tables.push({
            name,
            create_sql: t.sql,
            columns: data.columns,
            rows: data.rows.map(r => {
                const out = {};
                for (const c of data.columns) out[c] = r[c];
                return out;
            }),
        });
        console.log(`  ${name.padEnd(28)} -> ${data.rows.length} rows`);
    }
    console.log(`\nIndexes: ${dump.indexes.length}`);

    fs.writeFileSync(outPath, JSON.stringify(dump, stringifyReplacer, 2));
    console.log(`\nBackup written: ${outPath}`);
    console.log(`Size: ${fs.statSync(outPath).size} bytes`);
    process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
