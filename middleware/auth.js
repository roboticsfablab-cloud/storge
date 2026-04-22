const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me-in-production';
if (!process.env.JWT_SECRET && (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production')) {
    console.warn('WARNING: JWT_SECRET env var is not set in production. Set it in Vercel project settings.');
}

const TOKEN_COOKIE = 'auth_token';
const TOKEN_TTL = '7d';

function getTokenFromReq(req) {
    if (req.cookies && req.cookies[TOKEN_COOKIE]) return req.cookies[TOKEN_COOKIE];
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
    return null;
}

function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

function requireAuth(req, res, next) {
    const token = getTokenFromReq(req);
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid or expired session' });
    }
}

function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Authentication required' });
        if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
        next();
    };
}

// Gates HTML page requests. Allows static assets, the login page, and the /api surface
// (which has its own JSON-based auth). Any other path without a valid cookie gets 302'd to /login.
const ASSET_RE = /\.(css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|woff2?|ttf|eot|ico|txt|xml|json)$/i;

function htmlAuthGate(req, res, next) {
    const p = req.path;

    if (p.startsWith('/api/')) return next();
    if (p === '/login' || p === '/login.html') return next();
    if (ASSET_RE.test(p)) return next();

    const token = req.cookies && req.cookies[TOKEN_COOKIE];
    if (!token) return res.redirect(302, '/login');
    try {
        jwt.verify(token, JWT_SECRET);
        return next();
    } catch (e) {
        res.clearCookie(TOKEN_COOKIE, { path: '/' });
        return res.redirect(302, '/login');
    }
}

module.exports = { requireAuth, requireRole, htmlAuthGate, signToken, TOKEN_COOKIE, JWT_SECRET };
