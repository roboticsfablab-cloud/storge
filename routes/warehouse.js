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
            { folder: 'locker-manager/warehouse' },
            (error, result) => { if (error) reject(error); else resolve(result); }
        );
        Readable.from(buffer).pipe(stream);
    });
}

module.exports = function (db) {

    // ========== Zones ==========
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT z.*, COUNT(wi.id) AS item_count, COALESCE(SUM(wi.qty), 0) AS total_qty,
                   COALESCE(SUM(CASE WHEN wi.qty <= wi.min_stock THEN 1 ELSE 0 END), 0) AS low_stock_count,
                   (SELECT COUNT(*) FROM warehouse_areas wa WHERE wa.zone_id = z.id) AS area_count
            FROM warehouse_zones z
            LEFT JOIN warehouse_items wi ON wi.zone_id = z.id
            GROUP BY z.id ORDER BY z.id
        `);
        res.json(result.rows);
    });

    router.get('/:id', async (req, res) => {
        const zone = await db.execute({ sql: 'SELECT * FROM warehouse_zones WHERE id = ?', args: [req.params.id] });
        if (zone.rows.length === 0) return res.status(404).json({ error: 'Zone not found' });
        const items = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE zone_id = ? ORDER BY created_at', args: [req.params.id] });
        const areas = await db.execute({ sql: 'SELECT * FROM warehouse_areas WHERE zone_id = ? ORDER BY created_at', args: [req.params.id] });
        // Get items per area
        const areasWithItems = [];
        for (const area of areas.rows) {
            const areaItems = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE area_id = ? ORDER BY created_at', args: [area.id] });
            areasWithItems.push({ ...area, items: areaItems.rows });
        }
        // Unassigned items (no area)
        const unassigned = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE zone_id = ? AND (area_id IS NULL OR area_id = 0) ORDER BY created_at', args: [req.params.id] });
        res.json({ ...zone.rows[0], items: items.rows, areas: areasWithItems, unassigned_items: unassigned.rows });
    });

    router.post('/', async (req, res) => {
        const { name, location, description, color } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Zone name required' });
        const result = await db.execute({ sql: 'INSERT INTO warehouse_zones (name, location, description, color) VALUES (?, ?, ?, ?)', args: [name.trim(), location || '', description || '', color || '#7b2ff7'] });
        const zone = await db.execute({ sql: 'SELECT * FROM warehouse_zones WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(zone.rows[0]);
    });

    router.put('/:id', async (req, res) => {
        const { name, location, description, color } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE warehouse_zones SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (location !== undefined) await db.execute({ sql: 'UPDATE warehouse_zones SET location = ? WHERE id = ?', args: [location, req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE warehouse_zones SET description = ? WHERE id = ?', args: [description, req.params.id] });
        if (color !== undefined) await db.execute({ sql: 'UPDATE warehouse_zones SET color = ? WHERE id = ?', args: [color, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM warehouse_zones WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM warehouse_items WHERE zone_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM warehouse_areas WHERE zone_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM warehouse_zones WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // ========== Areas ==========
    router.get('/:zoneId/areas', async (req, res) => {
        const areas = await db.execute({ sql: 'SELECT * FROM warehouse_areas WHERE zone_id = ? ORDER BY created_at', args: [req.params.zoneId] });
        const result = [];
        for (const area of areas.rows) {
            const items = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE area_id = ? ORDER BY created_at', args: [area.id] });
            result.push({ ...area, items: items.rows, item_count: items.rows.length, total_qty: items.rows.reduce((s, i) => s + Number(i.qty), 0) });
        }
        res.json(result);
    });

    router.post('/:zoneId/areas', async (req, res) => {
        const { name, description } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Area name required' });
        const result = await db.execute({ sql: 'INSERT INTO warehouse_areas (zone_id, name, description) VALUES (?, ?, ?)', args: [req.params.zoneId, name.trim(), description || ''] });
        const area = await db.execute({ sql: 'SELECT * FROM warehouse_areas WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(area.rows[0]);
    });

    router.put('/areas/:id', async (req, res) => {
        const { name, description } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE warehouse_areas SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE warehouse_areas SET description = ? WHERE id = ?', args: [description, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM warehouse_areas WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/areas/:id', async (req, res) => {
        await db.execute({ sql: 'UPDATE warehouse_items SET area_id = NULL WHERE area_id = ?', args: [req.params.id] });
        await db.execute({ sql: 'DELETE FROM warehouse_areas WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    // ========== Zone items ==========
    router.post('/:id/items', async (req, res) => {
        const { name, qty, description, min_stock, image, area_id } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Item name required' });
        const result = await db.execute({
            sql: 'INSERT INTO warehouse_items (zone_id, area_id, name, qty, min_stock, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [req.params.id, area_id || null, name.trim(), Math.max(0, parseInt(qty) || 0), parseInt(min_stock) || 5, image || '', description || '']
        });
        const item = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE id = ?', args: [Number(result.lastInsertRowid)] });
        res.status(201).json(item.rows[0]);
    });

    router.put('/items/:id', async (req, res) => {
        const { name, qty, description, min_stock, image, area_id } = req.body;
        if (name !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET name = ? WHERE id = ?', args: [name.trim(), req.params.id] });
        if (qty !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET qty = ? WHERE id = ?', args: [Math.max(0, parseInt(qty)), req.params.id] });
        if (description !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET description = ? WHERE id = ?', args: [description, req.params.id] });
        if (min_stock !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET min_stock = ? WHERE id = ?', args: [Math.max(0, parseInt(min_stock)), req.params.id] });
        if (image !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET image = ? WHERE id = ?', args: [image, req.params.id] });
        if (area_id !== undefined) await db.execute({ sql: 'UPDATE warehouse_items SET area_id = ? WHERE id = ?', args: [area_id, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    router.delete('/items/:id', async (req, res) => {
        await db.execute({ sql: 'DELETE FROM warehouse_items WHERE id = ?', args: [req.params.id] });
        res.json({ success: true });
    });

    router.post('/items/:id/image', upload.single('image'), async (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
        const cloudResult = await uploadToCloudinary(req.file.buffer);
        await db.execute({ sql: 'UPDATE warehouse_items SET image = ? WHERE id = ?', args: [cloudResult.secure_url, req.params.id] });
        const updated = await db.execute({ sql: 'SELECT * FROM warehouse_items WHERE id = ?', args: [req.params.id] });
        res.json(updated.rows[0]);
    });

    return router;
};
