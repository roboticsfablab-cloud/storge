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
            { folder: 'locker-manager/' + folder },
            (error, result) => { if (error) reject(error); else resolve(result); }
        );
        Readable.from(buffer).pipe(stream);
    });
}

module.exports = function (db) {

    // List all employees
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT e.*, d.name AS department_name,
                   (SELECT COUNT(*) FROM department_items di WHERE di.employee_id = e.id) AS item_count
            FROM employees e
            LEFT JOIN departments d ON d.id = e.department_id
            ORDER BY e.name
        `);
        res.json(result.rows);
    });

    // Get single employee with items + covenant details
    router.get('/:id', async (req, res) => {
        const emp = await db.execute({ sql: 'SELECT e.*, d.name AS department_name FROM employees e LEFT JOIN departments d ON d.id = e.department_id WHERE e.id = ?', args: [req.params.id] });
        if (emp.rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
        const items = await db.execute({
            sql: `SELECT di.*, d.name AS department_name FROM department_items di
                  LEFT JOIN departments d ON d.id = di.department_id
                  WHERE di.employee_id = ? ORDER BY di.created_at`,
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
        const history = await db.execute({
            sql: `SELECT rh.*, d.name AS department_name FROM responsibility_history rh
                  LEFT JOIN departments d ON d.id = rh.department_id
                  WHERE rh.employee_id = ? ORDER BY rh.start_date DESC`,
            args: [req.params.id]
        });
        res.json({ ...emp.rows[0], items: itemsWithCovenant, history: history.rows });
    });

    // Create employee
    router.post('/', async (req, res) => {
        const { name, job_title, department_id } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Employee name required' });
        const result = await db.execute({
            sql: 'INSERT INTO employees (name, job_title, department_id) VALUES (?, ?, ?)',
            args: [name.trim(), job_title || '', department_id || null]
        });
        const emp = await db.execute({ sql: 'SELECT e.*, d.name AS department_name FROM employees e LEFT JOIN departments d ON d.id = e.department_id WHERE e.id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(emp.rows[0]);
    });

    // Update employee
    router.put('/:id', async (req, res) => {
        const { name, job_title, department_id } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE employees SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (job_title !== undefined) await db.execute({ sql: 'UPDATE employees SET job_title = ? WHERE id = ?', args: [job_title, req.params.id] });
        if (department_id !== undefined) await db.execute({ sql: 'UPDATE employees SET department_id = ? WHERE id = ?', args: [department_id, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT e.*, d.name AS department_name FROM employees e LEFT JOIN departments d ON d.id = e.department_id WHERE e.id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // Delete employee
    router.delete('/:id', async (req, res) => {
        await db.execute({ sql: 'UPDATE department_items SET employee_id = NULL WHERE employee_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM responsibility_history WHERE employee_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM covenant_history WHERE to_employee_id = ? OR from_employee_id = ?', args: [req.params.id, req.params.id] });
        await db.execute({ sql: 'DELETE FROM employees WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // Upload employee photo
    router.post('/:id/photo', upload.single('image'), async (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
        const cloudResult = await uploadToCloudinary(req.file.buffer, 'employees');
        await db.execute({ sql: 'UPDATE employees SET photo = ? WHERE id = ?', args: [cloudResult.secure_url, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM employees WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    // Add item to employee
    router.post('/:id/items', async (req, res) => {
        const { name, description, qty, department_id, receipt_date, purpose } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Item name required' });
        const emp = await db.execute({ sql: 'SELECT department_id FROM employees WHERE id = ?', args: [req.params.id] });
        const deptId = department_id || (emp.rows[0] ? emp.rows[0].department_id : null);
        if (!deptId) return res.status(400).json({ error: 'Employee must belong to a department' });
        const result = await db.execute({
            sql: 'INSERT INTO department_items (department_id, employee_id, name, description, qty, receipt_date, purpose) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [deptId, req.params.id, name.trim(), description || '', Math.max(1, parseInt(qty) || 1), receipt_date || '', purpose || '']
        });
        const item = await db.execute({ sql: 'SELECT * FROM department_items WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(item.rows[0]);
    });

    return router;
};
