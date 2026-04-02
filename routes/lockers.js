const express = require('express');
const router = express.Router();

module.exports = function (db) {

    // ─── GET all lockers (with item counts & alert status) ───
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT l.*,
                   COUNT(i.id) AS item_count,
                   COALESCE(SUM(i.qty), 0) AS total_qty,
                   COALESCE(SUM(CASE WHEN i.qty <= l.min_stock THEN 1 ELSE 0 END), 0) AS low_stock_count
            FROM lockers l
            LEFT JOIN items i ON i.locker_id = l.id
            GROUP BY l.id
            ORDER BY l.position, l.id
        `);
        res.json(result.rows);
    });

    // ─── GET single locker with its items ───
    router.get('/:id', async (req, res) => {
        const lockerResult = await db.execute({ sql: 'SELECT * FROM lockers WHERE id = ?', args: [req.params.id] });
        if (lockerResult.rows.length === 0) return res.status(404).json({ error: 'Locker not found' });

        const itemsResult = await db.execute({ sql: 'SELECT * FROM items WHERE locker_id = ? ORDER BY created_at', args: [req.params.id] });
        res.json({ ...lockerResult.rows[0], items: itemsResult.rows });
    });

    // ─── POST create locker ───
    router.post('/', async (req, res) => {
        const { id, name } = req.body;
        if (!id || id < 1) return res.status(400).json({ error: 'Valid locker number required' });

        const existing = await db.execute({ sql: 'SELECT id FROM lockers WHERE id = ?', args: [id] });
        if (existing.rows.length > 0) return res.status(409).json({ error: 'Locker already exists' });

        const maxPosResult = await db.execute('SELECT COALESCE(MAX(position), 0) + 1 AS p FROM lockers');
        const maxPos = Number(maxPosResult.rows[0].p);
        await db.execute({ sql: 'INSERT INTO lockers (id, name, min_stock, position) VALUES (?, ?, 5, ?)', args: [id, name || '', maxPos] });

        const locker = await db.execute({ sql: 'SELECT * FROM lockers WHERE id = ?', args: [id] });
        res.status(201).json(locker.rows[0]);
    });

    // ─── PUT update locker (name, min_stock) ───
    router.put('/:id', async (req, res) => {
        const lockerResult = await db.execute({ sql: 'SELECT * FROM lockers WHERE id = ?', args: [req.params.id] });
        if (lockerResult.rows.length === 0) return res.status(404).json({ error: 'Locker not found' });

        const { name, min_stock } = req.body;
        if (name !== undefined) {
            await db.execute({ sql: 'UPDATE lockers SET name = ? WHERE id = ?', args: [name, req.params.id] });
        }
        if (min_stock !== undefined) {
            await db.execute({ sql: 'UPDATE lockers SET min_stock = ? WHERE id = ?', args: [Math.max(0, parseInt(min_stock)), req.params.id] });
        }

        const updated = await db.execute({ sql: 'SELECT * FROM lockers WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // ─── DELETE locker ───
    router.delete('/:id', async (req, res) => {
        const locker = await db.execute({ sql: 'SELECT id FROM lockers WHERE id = ?', args: [req.params.id] });
        if (locker.rows.length === 0) return res.status(404).json({ error: 'Locker not found' });

        await db.execute({ sql: 'DELETE FROM items WHERE locker_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM lockers WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    return router;
};
