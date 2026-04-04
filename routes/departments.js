const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        if (allowed.test(path.extname(file.originalname))) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    }
});

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'locker-manager/departments' },
            (error, result) => { if (error) reject(error); else resolve(result); }
        );
        Readable.from(buffer).pipe(stream);
    });
}

module.exports = function (db) {

    // List departments
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT d.*, COUNT(DISTINCT dl.locker_id) AS locker_count,
                   (SELECT COUNT(*) FROM employees e WHERE e.department_id = d.id) AS employee_count,
                   (SELECT COUNT(*) FROM department_items di WHERE di.department_id = d.id) AS item_count
            FROM departments d
            LEFT JOIN department_lockers dl ON dl.department_id = d.id
            GROUP BY d.id ORDER BY d.name
        `);
        res.json(result.rows);
    });

    // Get department detail
    router.get('/:id', async (req, res) => {
        const dept = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        if (dept.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
        const lockers = await db.execute({
            sql: `SELECT l.* FROM lockers l JOIN department_lockers dl ON dl.locker_id = l.id WHERE dl.department_id = ? ORDER BY l.id`,
            args: [req.params.id]
        });
        const available = await db.execute({
            sql: `SELECT l.* FROM lockers l WHERE l.id NOT IN (SELECT locker_id FROM department_lockers WHERE department_id = ?) ORDER BY l.id`,
            args: [req.params.id]
        });
        const employees = await db.execute({
            sql: 'SELECT * FROM employees WHERE department_id = ? ORDER BY name',
            args: [req.params.id]
        });
        const items = await db.execute({
            sql: `SELECT di.*, e.name AS employee_name FROM department_items di
                  LEFT JOIN employees e ON e.id = di.employee_id
                  WHERE di.department_id = ? ORDER BY di.created_at`,
            args: [req.params.id]
        });
        const history = await db.execute({
            sql: `SELECT rh.*, e.name AS employee_name, e.job_title, e.photo AS employee_photo
                  FROM responsibility_history rh
                  LEFT JOIN employees e ON e.id = rh.employee_id
                  WHERE rh.department_id = ? ORDER BY rh.start_date DESC`,
            args: [req.params.id]
        });
        res.json({
            ...dept.rows[0],
            lockers: lockers.rows,
            available_lockers: available.rows,
            employees: employees.rows,
            items: items.rows,
            history: history.rows
        });
    });

    // Create department
    router.post('/', async (req, res) => {
        const { name, manager, description } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Department name required' });
        const result = await db.execute({ sql: 'INSERT INTO departments (name, manager, description) VALUES (?, ?, ?)', args: [name.trim(), manager || '', description || ''] });
        const dept = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(dept.rows[0]);
    });

    // Update department
    router.put('/:id', async (req, res) => {
        const { name, manager, description } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE departments SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (manager !== undefined) await db.execute({ sql: 'UPDATE departments SET manager = ? WHERE id = ?', args: [manager, req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE departments SET description = ? WHERE id = ?', args: [description, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // Delete department
    router.delete('/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM department_lockers WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM department_items WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM responsibility_history WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'UPDATE employees SET department_id = NULL WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM departments WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // Assign/unassign lockers
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

    // ========== Department Items ==========
    router.get('/:id/items', async (req, res) => {
        const items = await db.execute({
            sql: `SELECT di.*, e.name AS employee_name FROM department_items di
                  LEFT JOIN employees e ON e.id = di.employee_id
                  WHERE di.department_id = ? ORDER BY di.created_at`,
            args: [req.params.id]
        });
        res.json(items.rows);
    });

    router.post('/:id/items', async (req, res) => {
        const { name, description, qty, employee_id } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Item name required' });
        const result = await db.execute({
            sql: 'INSERT INTO department_items (department_id, employee_id, name, description, qty) VALUES (?, ?, ?, ?, ?)',
            args: [req.params.id, employee_id || null, name.trim(), description || '', Math.max(1, parseInt(qty) || 1)]
        });
        const item = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(item.rows[0]);
    });

    router.put('/items/:id', async (req, res) => {
        const { name, description, qty, employee_id } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE department_items SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE department_items SET description = ? WHERE id = ?', args: [description, req.params.id] });
        if (qty !== undefined) await db.execute({ sql: 'UPDATE department_items SET qty = ? WHERE id = ?', args: [Math.max(1, parseInt(qty)), req.params.id] });
        if (employee_id !== undefined) await db.execute({ sql: 'UPDATE department_items SET employee_id = ? WHERE id = ?', args: [employee_id, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/items/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    router.post('/items/:id/image', upload.single('image'), async (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
        const cloudResult = await uploadToCloudinary(req.file.buffer);
        await db.execute({ sql: 'UPDATE department_items SET image = ? WHERE id = ?', args: [cloudResult.secure_url, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // ========== Responsibility History ==========
    router.get('/:id/history', async (req, res) => {
        const history = await db.execute({
            sql: `SELECT rh.*, e.name AS employee_name, e.job_title, e.photo AS employee_photo
                  FROM responsibility_history rh
                  LEFT JOIN employees e ON e.id = rh.employee_id
                  WHERE rh.department_id = ? ORDER BY rh.start_date DESC`,
            args: [req.params.id]
        });
        res.json(history.rows);
    });

    router.post('/:id/history', async (req, res) => {
        const { employee_id, start_date, end_date, status, notes } = req.body;
        if (!employee_id) return res.status(400).json({ error: 'Employee required' });
        if (!start_date) return res.status(400).json({ error: 'Start date required' });
        const result = await db.execute({
            sql: 'INSERT INTO responsibility_history (department_id, employee_id, start_date, end_date, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
            args: [req.params.id, employee_id, start_date, end_date || '', status || 'active', notes || '']
        });
        const entry = await db.execute({ sql: 'SELECT rh.*, e.name AS employee_name FROM responsibility_history rh LEFT JOIN employees e ON e.id = rh.employee_id WHERE rh.id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(entry.rows[0]);
    });

    router.put('/history/:id', async (req, res) => {
        const { start_date, end_date, status, notes } = req.body;
        if (start_date !== undefined) await db.execute({ sql: 'UPDATE responsibility_history SET start_date = ? WHERE id = ?', args: [start_date, req.params.id] });
        if (end_date !== undefined) await db.execute({ sql: 'UPDATE responsibility_history SET end_date = ? WHERE id = ?', args: [end_date, req.params.id] });
        if (status !== undefined) await db.execute({ sql: 'UPDATE responsibility_history SET status = ? WHERE id = ?', args: [status, req.params.id] });
        if (notes !== undefined) await db.execute({ sql: 'UPDATE responsibility_history SET notes = ? WHERE id = ?', args: [notes, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM responsibility_history WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/history/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM responsibility_history WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    return router;
};
