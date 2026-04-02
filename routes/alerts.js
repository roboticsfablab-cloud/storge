const express = require('express');
const router = express.Router();

module.exports = function (db) {

    router.get('/', async (req, res) => {
        const result = await db.execute(`
            SELECT i.id AS item_id, i.name AS item_name, i.qty, i.min_stock,
                   l.id AS locker_id, l.name AS locker_name
            FROM items i
            JOIN lockers l ON l.id = i.locker_id
            WHERE i.qty <= i.min_stock
            ORDER BY i.qty ASC, l.id
        `);
        res.json(result.rows);
    });

    router.get('/summary', async (req, res) => {
        const result = await db.execute(`
            SELECT COUNT(*) AS total_alerts,
                   COUNT(DISTINCT i.locker_id) AS lockers_affected
            FROM items i
            JOIN lockers l ON l.id = i.locker_id
            WHERE i.qty <= i.min_stock
        `);
        res.json(result.rows[0]);
    });

    return router;
};
