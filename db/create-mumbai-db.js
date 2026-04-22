// Uses a Turso Platform API token to create a new group + database at Mumbai,
// then mint a full-access DB auth token. Prints the new URL and token.
//
// Usage: TURSO_API_TOKEN=<platform-token> node db/create-mumbai-db.js

const TOKEN = process.env.TURSO_API_TOKEN;
const ORG   = process.env.TURSO_ORG   || 'roboticsfablab-cloud';
const GROUP = process.env.TURSO_GROUP || 'mumbai';
const DB    = process.env.TURSO_DB    || 'locker-manager-bom';
const LOC   = process.env.TURSO_LOC   || 'bom';

if (!TOKEN) { console.error('Set TURSO_API_TOKEN (platform API token, not DB token).'); process.exit(2); }

async function api(method, path, body) {
    const res = await fetch(`https://api.turso.tech/v1/${path}`, {
        method,
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch (_) { data = { raw: text }; }
    if (!res.ok) {
        const err = new Error(`${method} ${path} -> ${res.status}: ${text}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

function alreadyExists(err) {
    const s = String(err.message || '').toLowerCase();
    return s.includes('already exists') || s.includes('conflict') || err.status === 409;
}

(async () => {
    console.log(`Org:      ${ORG}`);
    console.log(`Group:    ${GROUP} @ ${LOC}`);
    console.log(`Database: ${DB}\n`);

    try {
        const g = await api('POST', `organizations/${ORG}/groups`, { name: GROUP, location: LOC });
        console.log(`Created group "${GROUP}" at location "${LOC}".`);
    } catch (e) {
        if (!alreadyExists(e)) throw e;
        console.log(`Group "${GROUP}" already exists, continuing.`);
    }

    try {
        await api('POST', `organizations/${ORG}/databases`, { name: DB, group: GROUP });
        console.log(`Created database "${DB}" in group "${GROUP}".`);
    } catch (e) {
        if (!alreadyExists(e)) throw e;
        console.log(`Database "${DB}" already exists, continuing.`);
    }

    const dbInfo = await api('GET', `organizations/${ORG}/databases/${DB}`);
    const hostname = dbInfo?.database?.Hostname || dbInfo?.database?.hostname;
    if (!hostname) throw new Error('Could not resolve hostname from API response: ' + JSON.stringify(dbInfo));
    const url = `libsql://${hostname}`;

    const t = await api('POST', `organizations/${ORG}/databases/${DB}/auth/tokens?expiration=none&authorization=full-access`);
    const jwt = t?.jwt;
    if (!jwt) throw new Error('Token response missing jwt: ' + JSON.stringify(t));

    console.log('\n================ NEW MUMBAI DB ================');
    console.log(`TURSO_DATABASE_URL=${url}`);
    console.log(`TURSO_AUTH_TOKEN=${jwt}`);
    console.log('===============================================');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
