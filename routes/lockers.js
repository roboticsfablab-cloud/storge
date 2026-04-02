const express = require('express');
const router = express.Router();

module.exports = function (db) {

    // ─── GET all lockers (with item counts & alert status) ───
    router.get('/', (req, res) => {
        const lockers = db.prepare(`
            SELECT l.*,
                   COUNT(i.id) AS item_count,
                   COALESCE(SUM(i.qty), 0) AS total_qty,
                   COALESCE(SUM(CASE WHEN i.qty <= l.min_stock THEN 1 ELSE 0 END), 0) AS low_stock_count
            FROM lockers l
            LEFT JOIN items i ON i.locker_id = l.id
            GROUP BY l.id
            ORDER BY l.position, l.id
        `).all();
        res.json(lockers);
    });

    // ─── GET single locker with its items ───
    router.get('/:id', (req, res) => {
        const locker = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
        if (!locker) return res.status(404).json({ error: 'Locker not found' });

        const items = db.prepare('SELECT * FROM items WHERE locker_id = ? ORDER BY created_at').all(req.params.id);
        res.json({ ...locker, items });
    });

    // ─── POST create locker ───
    router.post('/', (req, res) => {
        const { id, name } = req.body;
        if (!id || id < 1) return res.status(400).json({ error: 'Valid locker number required' });

        const existing = db.prepare('SELECT id FROM lockers WHERE id = ?').get(id);
        if (existing) return res.status(409).json({ error: 'Locker already exists' });

        const maxPos = db.prepare('SELECT COALESCE(MAX(position), 0) + 1 AS p FROM lockers').get().p;
        db.prepare('INSERT INTO lockers (id, name, min_stock, position) VALUES (?, ?, 5, ?)').run(id, name || '', maxPos);

        const locker = db.prepare('SELECT * FROM lockers WHERE id = ?').get(id);
        res.status(201).json(locker);
    });

    // ─── PUT update locker (name, min_stock) ───
    router.put('/:id', (req, res) => {
        const locker = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
        if (!locker) return res.status(404).json({ error: 'Locker not found' });

        const { name, min_stock } = req.body;
        if (name !== undefined) {
            db.prepare('UPDATE lockers SET name = ? WHERE id = ?').run(name, req.params.id);
        }
        if (min_stock !== undefined) {
            db.prepare('UPDATE lockers SET min_stock = ? WHERE id = ?').run(Math.max(0, parseInt(min_stock)), req.params.id);
        }

        const updated = db.prepare('SELECT * FROM lockers WHERE id = ?').get(req.params.id);
        res.json(updated);
    });

    // ─── DELETE locker ───
    router.delete('/:id', (req, res) => {
        const locker = db.prepare('SELECT id FROM lockers WHERE id = ?').get(req.params.id);
        if (!locker) return res.status(404).json({ error: 'Locker not found' });

        db.prepare('DELETE FROM lockers WHERE id = ?').run(req.params.id);
        res.json({ success: true });
    });

    return router;
};
