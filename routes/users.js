const express = require('express');
const bcrypt = require('bcryptjs');

const VALID_ROLES = ['manager', 'admin', 'employee'];

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT u.id, u.username, u.role, u.active, u.employee_id, u.department_id, u.created_at,
                   e.name AS employee_name,
                   d.name AS department_name
            FROM users u
            LEFT JOIN employees e ON e.id = u.employee_id
            LEFT JOIN departments d ON d.id = u.department_id
            ORDER BY u.role, u.username
        `);
        res.json(result.rows);
    });

    router.post('/', async (req, res) => {
        const { username, password, role, employee_id, department_id } = req.body || {};
        if (!username || !username.trim()) return res.status(400).json({ error: 'Username is required' });
        if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
        if (!VALID_ROLES.includes(role)) return res.status(400).json({ error: 'Role must be manager, admin, or employee' });

        const dup = await db.execute({ sql: 'SELECT id FROM users WHERE username = ?', args: [username.trim()] });
        if (dup.rows.length) return res.status(409).json({ error: 'Username already exists' });

        const hash = await bcrypt.hash(password, 10);
        const result = await db.execute({
            sql: `INSERT INTO users (username, password_hash, role, employee_id, department_id, active)
                  VALUES (?, ?, ?, ?, ?, 1)`,
            args: [username.trim(), hash, role, employee_id || null, department_id || null]
        });

        const created = await db.execute({
            sql: `SELECT id, username, role, active, employee_id, department_id, created_at
                  FROM users WHERE id = ?`,
            args: [Number(result.lastInsertRowid)]
        });
        res.status(201).json(created.rows[0]);
    });

    router.put('/:id', async (req, res) => {
        const { username, role, active, employee_id, department_id } = req.body || {};
        const id = req.params.id;

        const existing = await db.execute({ sql: 'SELECT id FROM users WHERE id = ?', args: [id] });
        if (!existing.rows.length) return res.status(404).json({ error: 'User not found' });

        if (username !== undefined) {
            if (!username.trim()) return res.status(400).json({ error: 'Username cannot be empty' });
            const dup = await db.execute({ sql: 'SELECT id FROM users WHERE username = ? AND id <> ?', args: [username.trim(), id] });
            if (dup.rows.length) return res.status(409).json({ error: 'Username already exists' });
            await db.execute({ sql: 'UPDATE users SET username = ? WHERE id = ?', args: [username.trim(), id] });
        }
        if (role !== undefined) {
            if (!VALID_ROLES.includes(role)) return res.status(400).json({ error: 'Invalid role' });
            await db.execute({ sql: 'UPDATE users SET role = ? WHERE id = ?', args: [role, id] });
        }
        if (active !== undefined) {
            await db.execute({ sql: 'UPDATE users SET active = ? WHERE id = ?', args: [active ? 1 : 0, id] });
        }
        if (employee_id !== undefined) {
            await db.execute({ sql: 'UPDATE users SET employee_id = ? WHERE id = ?', args: [employee_id || null, id] });
        }
        if (department_id !== undefined) {
            await db.execute({ sql: 'UPDATE users SET department_id = ? WHERE id = ?', args: [department_id || null, id] });
        }

        const updated = await db.execute({
            sql: `SELECT id, username, role, active, employee_id, department_id, created_at
                  FROM users WHERE id = ?`,
            args: [id]
        });
        res.json(updated.rows[0]);
    });

    router.post('/:id/password', async (req, res) => {
        const { password } = req.body || {};
        if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

        const existing = await db.execute({ sql: 'SELECT id FROM users WHERE id = ?', args: [req.params.id] });
        if (!existing.rows.length) return res.status(404).json({ error: 'User not found' });

        const hash = await bcrypt.hash(password, 10);
        await db.execute({ sql: 'UPDATE users SET password_hash = ? WHERE id = ?', args: [hash, req.params.id] });
        res.json({ success: true });
    });

    router.delete('/:id', async (req, res) => {
        if (Number(req.params.id) === Number(req.user.id)) {
            return res.status(400).json({ error: 'You cannot delete your own account' });
        }
        const managers = await db.execute(`SELECT COUNT(*) AS c FROM users WHERE role = 'manager' AND active = 1`);
        const target = await db.execute({ sql: 'SELECT role FROM users WHERE id = ?', args: [req.params.id] });
        if (target.rows.length && target.rows[0].role === 'manager' && Number(managers.rows[0].c) <= 1) {
            return res.status(400).json({ error: 'Cannot delete the last active manager' });
        }
        await db.execute({ sql: 'DELETE FROM users WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    return router;
};
