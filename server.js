const express = require('express');
const path = require('path');
const { client, ensureTables } = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure database tables exist before handling requests
app.use(async (req, res, next) => {
    try {
        await ensureTables();
        next();
    } catch (err) {
        next(err);
    }
});

// API Routes
app.use('/api/lockers', require('./routes/lockers')(client));
app.use('/api/items', require('./routes/items')(client));
app.use('/api/alerts', require('./routes/alerts')(client));

// SPA fallback
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Only listen when not running on Vercel
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`\n  Locker Manager running at http://localhost:${PORT}\n`);
    });
}

module.exports = app;
