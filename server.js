const express = require('express');
const path = require('path');
const { client, ensureTables } = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', async (req, res, next) => {
    try { await ensureTables(); next(); }
    catch (err) { next(err); }
});

app.use('/api/lockers', require('./routes/lockers')(client));
app.use('/api/items', require('./routes/items')(client));
app.use('/api/alerts', require('./routes/alerts')(client));
app.use('/api/warehouse', require('./routes/warehouse')(client));
app.use('/api/departments', require('./routes/departments')(client));

app.get('/api/search', async (req, res) => {
    const q = req.query.q || '';
    if (!q.trim()) return res.json({ lockers: [], items: [] });
    const term = `%${q.trim()}%`;
    const lockers = await client.execute({ sql: `SELECT l.*, COUNT(i.id) AS item_count, COALESCE(SUM(i.qty), 0) AS total_qty FROM lockers l LEFT JOIN items i ON i.locker_id = l.id WHERE l.name LIKE ? OR CAST(l.id AS TEXT) LIKE ? GROUP BY l.id ORDER BY l.id`, args: [term, term] });
    const items = await client.execute({ sql: `SELECT i.*, l.name AS locker_name FROM items i JOIN lockers l ON l.id = i.locker_id WHERE i.name LIKE ? OR i.description LIKE ? ORDER BY i.name`, args: [term, term] });
    res.json({ lockers: lockers.rows, items: items.rows });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => { console.log(`\n  Locker Manager running at http://localhost:${PORT}\n`); });
}

module.exports = app;
