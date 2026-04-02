const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'public', 'uploads');
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `item-${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
        if (allowed.test(path.extname(file.originalname))) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

module.exports = function (db) {

    // ─── GET items for a locker ───
    router.get('/locker/:lockerId', (req, res) => {
        const items = db.prepare('SELECT * FROM items WHERE locker_id = ? ORDER BY created_at').all(req.params.lockerId);
        res.json(items);
    });

    // ─── POST add item to locker ───
    router.post('/locker/:lockerId', (req, res) => {
        const locker = db.prepare('SELECT id FROM lockers WHERE id = ?').get(req.params.lockerId);
        if (!locker) return res.status(404).json({ error: 'Locker not found' });

        const { name, qty, image } = req.body;
        if (!name || !name.trim()) return res.status(400).json({ error: 'Item name required' });

        const result = db.prepare('INSERT INTO items (locker_id, name, qty, image) VALUES (?, ?, ?, ?)').run(
            req.params.lockerId,
            name.trim(),
            Math.max(0, parseInt(qty) || 0),
            image || ''
        );

        const item = db.prepare('SELECT * FROM items WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(item);
    });

    // ─── PUT update item ───
    router.put('/:id', (req, res) => {
        const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        const { name, qty, image } = req.body;
        if (name !== undefined) {
            db.prepare('UPDATE items SET name = ? WHERE id = ?').run(name.trim(), req.params.id);
        }
        if (qty !== undefined) {
            db.prepare('UPDATE items SET qty = ? WHERE id = ?').run(Math.max(0, parseInt(qty)), req.params.id);
        }
        if (image !== undefined) {
            db.prepare('UPDATE items SET image = ? WHERE id = ?').run(image, req.params.id);
        }

        const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        res.json(updated);
    });

    // ─── PATCH increment/decrement qty ───
    router.patch('/:id/qty', (req, res) => {
        const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        const delta = parseInt(req.body.delta) || 0;
        const newQty = Math.max(0, item.qty + delta);
        db.prepare('UPDATE items SET qty = ? WHERE id = ?').run(newQty, req.params.id);

        const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        res.json(updated);
    });

    // ─── DELETE item ───
    router.delete('/:id', (req, res) => {
        const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        // Remove image file if it's a local upload
        if (item.image && item.image.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', 'public', item.image);
            fs.unlink(filePath, () => {}); // ignore errors
        }

        db.prepare('DELETE FROM items WHERE id = ?').run(req.params.id);
        res.json({ success: true });
    });

    // ─── POST upload image for item ───
    router.post('/:id/image', upload.single('image'), (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

        const item = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        // Remove old image if local
        if (item.image && item.image.startsWith('/uploads/')) {
            const oldPath = path.join(__dirname, '..', 'public', item.image);
            fs.unlink(oldPath, () => {});
        }

        const imagePath = '/uploads/' + req.file.filename;
        db.prepare('UPDATE items SET image = ? WHERE id = ?').run(imagePath, req.params.id);

        const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
        res.json(updated);
    });

    return router;
};
