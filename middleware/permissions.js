// Role-based permissions for FABY Keeper.
//
// Three roles:
//   manager  — super admin, unrestricted
//   admin    — full CRUD on Departments and Employees; read-only on Lockers and Warehouse
//   employee — full CRUD but only inside their assigned department

function isManager(user)  { return !!user && user.role === 'manager'; }
function isAdmin(user)    { return !!user && user.role === 'admin'; }
function isEmployee(user) { return !!user && user.role === 'employee'; }

function managerOnly(req, res, next) {
    if (isManager(req.user)) return next();
    return res.status(403).json({ error: 'Manager access required' });
}

// Manager: all methods. Admin/Employee: read-only (GET only).
// Used for resources Admin cannot write to (lockers, items, warehouse, alerts).
function readOnlyForNonManager(req, res, next) {
    if (isManager(req.user)) return next();
    if (req.method === 'GET') return next();
    return res.status(403).json({ error: 'Your role has read-only access to this resource' });
}

// Resolve which department_id a /api/departments/* request targets.
// Returns the numeric department_id, or null if unresolvable (for 404).
async function resolveDeptFromReq(db, req) {
    const segs = (req.path || '').split('/').filter(Boolean);
    if (segs.length === 0) return null;

    const s0 = segs[0];

    if (/^\d+$/.test(s0)) {
        return Number(s0);
    }

    if (s0 === 'items' || s0 === 'equipment') {
        const subId = segs[1];
        if (!subId || !/^\d+$/.test(subId)) return null;
        const table = s0 === 'items' ? 'department_items' : 'department_equipment';
        const r = await db.execute({ sql: `SELECT department_id FROM ${table} WHERE id = ?`, args: [Number(subId)] });
        return r.rows.length ? Number(r.rows[0].department_id) : null;
    }

    if (s0 === 'covenant') {
        const covId = segs[1];
        if (!covId || !/^\d+$/.test(covId)) return null;
        const r = await db.execute({ sql: 'SELECT item_id, entity_type FROM covenant_history WHERE id = ?', args: [Number(covId)] });
        if (!r.rows.length) return null;
        const itemId = Number(r.rows[0].item_id);
        const table = r.rows[0].entity_type === 'equipment' ? 'department_equipment' : 'department_items';
        const r2 = await db.execute({ sql: `SELECT department_id FROM ${table} WHERE id = ?`, args: [itemId] });
        return r2.rows.length ? Number(r2.rows[0].department_id) : null;
    }

    if (s0 === 'history') {
        const hid = segs[1];
        if (!hid || !/^\d+$/.test(hid)) return null;
        const r = await db.execute({ sql: 'SELECT department_id FROM responsibility_history WHERE id = ?', args: [Number(hid)] });
        return r.rows.length ? Number(r.rows[0].department_id) : null;
    }

    return null;
}

function makeDepartmentsGuard(db) {
    return async function departmentsGuard(req, res, next) {
        const u = req.user;
        if (!u) return res.status(401).json({ error: 'Authentication required' });

        // Manager and Admin both get full access to the Departments section.
        if (isManager(u) || isAdmin(u)) return next();

        if (isEmployee(u)) {
            if (u.department_id == null) {
                return res.status(403).json({ error: 'No department is assigned to your account. Ask a manager to link it.' });
            }

            if (req.method === 'GET' && (req.path === '/' || req.path === '')) {
                return next(); // handler filters to own dept
            }

            try {
                const deptId = await resolveDeptFromReq(db, req);
                if (deptId == null) return res.status(404).json({ error: 'Resource not found' });
                if (deptId !== Number(u.department_id)) {
                    return res.status(403).json({ error: 'You can only access your own department' });
                }
                return next();
            } catch (err) {
                return next(err);
            }
        }

        return res.status(403).json({ error: 'Forbidden' });
    };
}

// Employees route guard:
//   Manager + Admin: full access.
//   Employee: reads filtered by handler; writes require target employee to be in own dept.
function makeEmployeesGuard(db) {
    return async function employeesGuard(req, res, next) {
        const u = req.user;
        if (!u) return res.status(401).json({ error: 'Authentication required' });

        if (isManager(u) || isAdmin(u)) return next();

        if (isEmployee(u)) {
            if (u.department_id == null) {
                return res.status(403).json({ error: 'No department is assigned to your account. Ask a manager to link it.' });
            }

            // List + POST (create) flow through; handler filters GET to own dept,
            // and for POST we check the supplied department_id matches.
            if (req.method === 'GET' && (req.path === '/' || req.path === '')) return next();

            if (req.method === 'POST' && (req.path === '/' || req.path === '')) {
                const bodyDeptId = req.body && req.body.department_id;
                if (bodyDeptId != null && Number(bodyDeptId) !== Number(u.department_id)) {
                    return res.status(403).json({ error: 'You can only create employees in your own department' });
                }
                // Force scope to own dept if not provided.
                if (req.body && bodyDeptId == null) req.body.department_id = Number(u.department_id);
                return next();
            }

            // Per-employee endpoints: first path segment is the numeric id.
            const segs = (req.path || '').split('/').filter(Boolean);
            const id = segs[0];
            if (!id || !/^\d+$/.test(id)) {
                return res.status(400).json({ error: 'Invalid employee id' });
            }
            try {
                const r = await db.execute({ sql: 'SELECT department_id FROM employees WHERE id = ?', args: [Number(id)] });
                if (!r.rows.length) return res.status(404).json({ error: 'Employee not found' });
                if (Number(r.rows[0].department_id) !== Number(u.department_id)) {
                    return res.status(403).json({ error: 'You can only access employees in your own department' });
                }
                return next();
            } catch (err) {
                return next(err);
            }
        }

        return res.status(403).json({ error: 'Forbidden' });
    };
}

module.exports = {
    isManager,
    isAdmin,
    isEmployee,
    managerOnly,
    readOnlyForNonManager,
    makeDepartmentsGuard,
    makeEmployeesGuard,
};
