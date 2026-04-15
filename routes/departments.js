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

function uploadToCloudinary(buffer, folder) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'locker-manager/' + (folder || 'departments') },
            (error, result) => { if (error) reject(error); else resolve(result); }
        );
        Readable.from(buffer).pipe(stream);
    });
}

module.exports = function (db) {

    // List departments
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT d.*,
                   (SELECT COUNT(*) FROM employees e WHERE e.department_id = d.id) AS employee_count,
                   (SELECT COUNT(*) FROM department_items di WHERE di.department_id = d.id) AS item_count
            FROM departments d
            ORDER BY d.name
        `);
        res.json(result.rows);
    });

    // Get department detail
    router.get('/:id', async (req, res) => {
        const dept = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        if (dept.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
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
        // Get covenant history for each item
        const itemsWithCovenant = [];
        for (const item of items.rows) {
            const ch = await db.execute({
                sql: `SELECT ch.*, fe.name AS from_employee_name, te.name AS to_employee_name
                      FROM covenant_history ch
                      LEFT JOIN employees fe ON fe.id = ch.from_employee_id
                      LEFT JOIN employees te ON te.id = ch.to_employee_id
                      WHERE ch.item_id = ? ORDER BY ch.transfer_date DESC`,
                args: [item.id]
            });
            itemsWithCovenant.push({ ...item, covenant_history: ch.rows });
        }
        res.json({
            ...dept.rows[0],
            employees: employees.rows,
            items: itemsWithCovenant,
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
        await db.execute({ sql: 'DELETE FROM covenant_history WHERE item_id IN (SELECT id FROM department_items WHERE department_id = ?)', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM department_items WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM responsibility_history WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'UPDATE employees SET department_id = NULL WHERE department_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM departments WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // Department image
    router.post('/:id/image', upload.single('image'), async (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
        const cloudResult = await uploadToCloudinary(req.file.buffer, 'departments');
        await db.execute({ sql: 'UPDATE departments SET image = ? WHERE id = ?', args: [cloudResult.secure_url, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM departments WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // ========== Department Items (العهدة) ==========
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
        const { name, description, qty, employee_id, receipt_date, purpose } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Item name required' });
        const result = await db.execute({
            sql: 'INSERT INTO department_items (department_id, employee_id, name, description, qty, receipt_date, purpose) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [req.params.id, employee_id || null, name.trim(), description || '', Math.max(1, parseInt(qty) || 1), receipt_date || '', purpose || '']
        });
        const item = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(item.rows[0]);
    });

    router.put('/items/:id', async (req, res) => {
        const { name, description, qty, employee_id, receipt_date, purpose } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE department_items SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE department_items SET description = ? WHERE id = ?', args: [description, req.params.id] });
        if (qty !== undefined) await db.execute({ sql: 'UPDATE department_items SET qty = ? WHERE id = ?', args: [Math.max(1, parseInt(qty)), req.params.id] });
        if (employee_id !== undefined) await db.execute({ sql: 'UPDATE department_items SET employee_id = ? WHERE id = ?', args: [employee_id, req.params.id] });
        if (receipt_date !== undefined) await db.execute({ sql: 'UPDATE department_items SET receipt_date = ? WHERE id = ?', args: [receipt_date, req.params.id] });
        if (purpose !== undefined) await db.execute({ sql: 'UPDATE department_items SET purpose = ? WHERE id = ?', args: [purpose, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/items/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM covenant_history WHERE item_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    router.post('/items/:id/image', upload.single('image'), async (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
        const cloudResult = await uploadToCloudinary(req.file.buffer, 'departments/items');
        await db.execute({ sql: 'UPDATE department_items SET image = ? WHERE id = ?', args: [cloudResult.secure_url, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // ========== Covenant History ==========
    router.get('/items/:id/covenant', async (req, res) => {
        const ch = await db.execute({
            sql: `SELECT ch.*, fe.name AS from_employee_name, te.name AS to_employee_name
                  FROM covenant_history ch
                  LEFT JOIN employees fe ON fe.id = ch.from_employee_id
                  LEFT JOIN employees te ON te.id = ch.to_employee_id
                  WHERE ch.item_id = ? ORDER BY ch.transfer_date DESC`,
            args: [req.params.id]
        });
        res.json(ch.rows);
    });

    router.post('/items/:id/covenant', async (req, res) => {
        const { from_employee_id, to_employee_id, transfer_date, status, notes, start_date, end_date, condition, condition_notes } = req.body;
        if (!to_employee_id) return res.status(400).json({ error: 'Target employee required' });
        // Close any existing active custody for this item
        await db.execute({ sql: "UPDATE covenant_history SET status = 'transferred' WHERE item_id = ? AND status = 'active'", args: [req.params.id] });
        const td = transfer_date || start_date || new Date().toISOString().split('T')[0];
        const result = await db.execute({
            sql: 'INSERT INTO covenant_history (item_id, from_employee_id, to_employee_id, transfer_date, status, notes, start_date, end_date, condition, condition_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            args: [req.params.id, from_employee_id || null, to_employee_id, td, status || 'active', notes || '', start_date || td, end_date || '', condition || '', condition_notes || '']
        });
        // Update the item's current employee
        await db.execute({ sql: 'UPDATE department_items SET employee_id = ? WHERE id = ?', args: [to_employee_id, req.params.id] });
        const entry = await db.execute({ sql: 'SELECT * FROM covenant_history WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(entry.rows[0]);
    });

    router.put('/covenant/:id', async (req, res) => {
        const { status, notes, start_date, end_date, condition, condition_notes } = req.body;
        if (status !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET status = ? WHERE id = ?', args: [status, req.params.id] });
        if (notes !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET notes = ? WHERE id = ?', args: [notes, req.params.id] });
        if (start_date !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET start_date = ? WHERE id = ?', args: [start_date, req.params.id] });
        if (end_date !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET end_date = ? WHERE id = ?', args: [end_date, req.params.id] });
        if (condition !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET condition = ? WHERE id = ?', args: [condition, req.params.id] });
        if (condition_notes !== undefined) await db.execute({ sql: 'UPDATE covenant_history SET condition_notes = ? WHERE id = ?', args: [condition_notes, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM covenant_history WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/covenant/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM covenant_history WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // Mark item as returned (early return from custody)
    router.post('/items/:id/return-custody', async (req, res) => {
        const { return_date, notes } = req.body;
        const today = return_date || new Date().toISOString().split('T')[0];
        // Find active covenant for this item
        const active = await db.execute({
            sql: "SELECT id FROM covenant_history WHERE item_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1",
            args: [req.params.id]
        });
        if (active.rows.length > 0) {
            const cid = active.rows[0].id;
            await db.execute({
                sql: "UPDATE covenant_history SET status = 'returned', end_date = ?, notes = COALESCE(NULLIF(notes,''), '') || CASE WHEN ? <> '' THEN (CASE WHEN notes <> '' THEN ' | ' ELSE '' END) || ? ELSE '' END WHERE id = ?",
                args: [today, notes || '', notes || '', cid]
            });
        }
        // Clear employee assignment so it goes back to the department
        await db.execute({ sql: 'UPDATE department_items SET employee_id = NULL WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
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
        const { employee_id, start_date, end_date, status, notes } = req.body;
        if (employee_id !== undefined) await db.execute({ sql: 'UPDATE responsibility_history SET employee_id = ? WHERE id = ?', args: [employee_id, req.params.id] });
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
