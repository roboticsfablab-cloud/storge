const bcrypt = require('bcryptjs');
const { client, ensureTables } = require('./schema');

async function seed() {
    await ensureTables();

    const username = process.argv[2] || 'manager';
    const password = process.argv[3] || '123456789';

    const existing = await client.execute({
        sql: 'SELECT id FROM users WHERE username = ?',
        args: [username]
    });
    if (existing.rows.length) {
        console.log(`User '${username}' already exists. Seed skipped.`);
        return;
    }

    const hash = await bcrypt.hash(password, 10);
    await client.execute({
        sql: `INSERT INTO users (username, password_hash, role, active) VALUES (?, ?, 'manager', 1)`,
        args: [username, hash]
    });

    console.log('---------------------------------------------');
    console.log('Manager account created.');
    console.log(`  Username: ${username}`);
    console.log(`  Password: ${password}`);
    console.log('---------------------------------------------');
    console.log('IMPORTANT: change this password after first login.');
}

seed()
    .then(() => process.exit(0))
    .catch((err) => { console.error(err); process.exit(1); });
