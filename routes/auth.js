const express = require('express');
const bcrypt = require('bcryptjs');
const { signToken, requireAuth, TOKEN_COOKIE } = require('../middleware/auth');

module.exports = (client) => {
    const router = express.Router();

    router.post('/login', async (req, res) => {
        const { username, password, remember_me } = req.body || {};
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const result = await client.execute({
            sql: `SELECT u.id, u.username, u.password_hash, u.role, u.active, u.employee_id, u.department_id AS user_dept_id, e.department_id AS emp_dept_id
                  FROM users u
                  LEFT JOIN employees e ON e.id = u.employee_id
                  WHERE u.username = ?`,
            args: [username]
        });
        const user = result.rows[0];
        if (!user || !Number(user.active)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ error: 'Invalid username or password' });

        const departmentId = user.emp_dept_id != null ? Number(user.emp_dept_id)
                           : user.user_dept_id != null ? Number(user.user_dept_id)
                           : null;

        const payload = {
            id: Number(user.id),
            username: user.username,
            role: user.role,
            employee_id: user.employee_id != null ? Number(user.employee_id) : null,
            department_id: departmentId,
        };

        const token = signToken(payload);
        const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
        const cookieOpts = {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
        };
        // Remember me: persistent 30-day cookie. Otherwise: session cookie (expires when browser closes).
        if (remember_me) cookieOpts.maxAge = 30 * 24 * 60 * 60 * 1000;
        res.cookie(TOKEN_COOKIE, token, cookieOpts);

        res.json({ user: payload });
    });

    router.post('/logout', (req, res) => {
        res.clearCookie(TOKEN_COOKIE, { path: '/' });
        res.json({ ok: true });
    });

    router.get('/me', requireAuth, (req, res) => {
        res.json({ user: req.user });
    });

    router.put('/password', requireAuth, async (req, res) => {
        const { current_password, new_password } = req.body || {};
        if (!current_password || !new_password) {
            return res.status(400).json({ error: 'Current and new password are required' });
        }
        if (new_password.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const result = await client.execute({
            sql: 'SELECT password_hash FROM users WHERE id = ?',
            args: [req.user.id]
        });
        if (!result.rows.length) return res.status(404).json({ error: 'User not found' });

        const ok = await bcrypt.compare(current_password, result.rows[0].password_hash);
        if (!ok) return res.status(401).json({ error: 'Current password is incorrect' });

        const hash = await bcrypt.hash(new_password, 10);
        await client.execute({ sql: 'UPDATE users SET password_hash = ? WHERE id = ?', args: [hash, req.user.id] });
        res.json({ success: true });
    });

    return router;
};
