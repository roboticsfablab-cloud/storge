const express = require('express');
const path = require('path');
const { initDB } = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
const db = initDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/lockers', require('./routes/lockers')(db));
app.use('/api/items', require('./routes/items')(db));
app.use('/api/alerts', require('./routes/alerts')(db));

// SPA fallback
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`\n  Locker Manager running at http://localhost:${PORT}\n`);
});
