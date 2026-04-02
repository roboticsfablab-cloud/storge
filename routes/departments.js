const express = require('express');
const router = express.Router();

module.exports = function (db) {

    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT d.*, COUNT(dl.locker_id) AS locker_count
            FROM departments d
            LEFT JOIN department_lockers dl ON dl.department_id = d.id
            GROUP BY d.id ORDER BY d.name
        `);
        res.json(result.rows);
    });

    router.get('/:id', async (req, res) => {
        const dept = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        if (dept.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
        const lockers = await db.execute({
            sql: `SELECT l.* FROM lockers l
                  JOIN department_lockers dl ON dl.locker_id = l.id
                  WHERE dl.department_id = ?
                  ORDER BY l.id`,
            args: [req.params.id]
        });
        const available = await db.execute({
            sql: `SELECT l.* FROM lockers l
                  WHERE l.id NOT IN (SELECT locker_id FROM department_lockers WHERE department_id = ?)
                  ORDER BY l.id`,
            args: [req.params.id]
        });
        res.json({ ...dept.rows[0], lockers: lockers.rows, available_lockers: available.rows });
    });

    router.post('/', async (req, res) => {
        const { name, manager } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Department name required' });
        const result = await db.execute({ sql: 'INSERT INTO departments (name, manager) VALUES (?, ?)', args: [name.trim(), manager || ''] });
        const dept = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(dept.rows[0]);
    });

    router.put('/:id', async (req, res) => {
        const { name, manager } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE departments SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (manager !== undefined) await db.execute({ sql: 'UPDATE departments SET manager = ? WHERE id = ?', args: [manager, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM department_lockers WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM departments WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    router.post('/:id/lockers', async (req, res) => {
        const { locker_id } = req.body;
        try {
            await db.execute({ sql: 'INSERT INTO department_lockers (department_id, locker_id) VALUES (?, ?)', args: [req.params.id, locker_id] });
        } catch (e) { /* already assigned */ }
        res.json({ success: true });
    });

    router.delete('/:id/lockers/:lockerId', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM department_lockers WHERE department_id = ? AND locker_id = ?', args: [req.params.id, req.params.lockerId] });
        res.json({ success: true });
    });

    return router;
};
