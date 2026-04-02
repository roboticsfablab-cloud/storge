const express = require('express');
const router = express.Router();

module.exports = function (db) {

    // ─── GET all low-stock alerts ───
    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT i.id AS item_id, i.name AS item_name, i.qty,
                   l.id AS locker_id, l.name AS locker_name, l.min_stock
            FROM items i
            JOIN lockers l ON l.id = i.locker_id
            WHERE i.qty <= l.min_stock
            ORDER BY i.qty ASC, l.id
        `);
        res.json(result.rows);
    });

    // ─── GET alert summary (counts) ───
    router.get('/summary', async (req, res) => {
        const result = await db.execute(`
            SELECT COUNT(*) AS total_alerts,
                   COUNT(DISTINCT i.locker_id) AS lockers_affected
            FROM items i
            JOIN lockers l ON l.id = i.locker_id
            WHERE i.qty <= l.min_stock
        `);
        res.json(result.rows[0]);
    });

    return router;
};
