const API = {
    async request(method, url, body) {
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch('/api' + url, opts);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
    },
    async upload(url, file) {
        const form = new FormData();
        form.append('image', file);
        const res = await fetch('/api' + url, { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        return data;
    },

    // Lockers
    getLockers()           { return this.request('GET', '/lockers'); },
    getLocker(id)          { return this.request('GET', '/lockers/' + id); },
    createLocker(data)     { return this.request('POST', '/lockers', data); },
    updateLocker(id, data) { return this.request('PUT', '/lockers/' + id, data); },
    deleteLocker(id)       { return this.request('DELETE', '/lockers/' + id); },

    // Items
    getAllItems()           { return this.request('GET', '/items'); },
    addItem(lid, data)     { return this.request('POST', '/items/locker/' + lid, data); },
    updateItem(id, data)   { return this.request('PUT', '/items/' + id, data); },
    changeQty(id, delta)   { return this.request('PATCH', '/items/' + id + '/qty', { delta }); },
    deleteItem(id)         { return this.request('DELETE', '/items/' + id); },
    uploadImage(id, file)  { return this.upload('/items/' + id + '/image', file); },

    // Alerts
    getAlerts()            { return this.request('GET', '/alerts'); },
    getAlertSummary()      { return this.request('GET', '/alerts/summary'); },

    // Search
    search(q)              { return this.request('GET', '/search?q=' + encodeURIComponent(q)); },

    // Warehouse
    getZones()             { return this.request('GET', '/warehouse'); },
    getZone(id)            { return this.request('GET', '/warehouse/' + id); },
    createZone(data)       { return this.request('POST', '/warehouse', data); },
    updateZone(id, data)   { return this.request('PUT', '/warehouse/' + id, data); },
    deleteZone(id)         { return this.request('DELETE', '/warehouse/' + id); },
    addZoneItem(zid, data) { return this.request('POST', '/warehouse/' + zid + '/items', data); },
    updateZoneItem(id, d)  { return this.request('PUT', '/warehouse/items/' + id, d); },
    deleteZoneItem(id)     { return this.request('DELETE', '/warehouse/items/' + id); },
    uploadZoneItemImage(id, file) { return this.upload('/warehouse/items/' + id + '/image', file); },

    // Warehouse Areas
    getAreas(zoneId)         { return this.request('GET', '/warehouse/' + zoneId + '/areas'); },
    createArea(zoneId, data) { return this.request('POST', '/warehouse/' + zoneId + '/areas', data); },
    updateArea(id, data)     { return this.request('PUT', '/warehouse/areas/' + id, data); },
    deleteArea(id)           { return this.request('DELETE', '/warehouse/areas/' + id); },

    // Departments
    getDepartments()         { return this.request('GET', '/departments'); },
    getDepartment(id)        { return this.request('GET', '/departments/' + id); },
    createDepartment(data)   { return this.request('POST', '/departments', data); },
    updateDepartment(id, d)  { return this.request('PUT', '/departments/' + id, d); },
    deleteDepartment(id)     { return this.request('DELETE', '/departments/' + id); },
    assignLocker(did, lid)   { return this.request('POST', '/departments/' + did + '/lockers', { locker_id: lid }); },
    unassignLocker(did, lid) { return this.request('DELETE', '/departments/' + did + '/lockers/' + lid); },

    // Department Items
    getDeptItems(did)             { return this.request('GET', '/departments/' + did + '/items'); },
    addDeptItem(did, data)        { return this.request('POST', '/departments/' + did + '/items', data); },
    updateDeptItem(id, data)      { return this.request('PUT', '/departments/items/' + id, data); },
    deleteDeptItem(id)            { return this.request('DELETE', '/departments/items/' + id); },
    uploadDeptItemImage(id, file) { return this.upload('/departments/items/' + id + '/image', file); },

    // Responsibility History
    getDeptHistory(did)           { return this.request('GET', '/departments/' + did + '/history'); },
    addDeptHistory(did, data)     { return this.request('POST', '/departments/' + did + '/history', data); },
    updateDeptHistory(id, data)   { return this.request('PUT', '/departments/history/' + id, data); },
    deleteDeptHistory(id)         { return this.request('DELETE', '/departments/history/' + id); },

    // Employees
    getEmployees()              { return this.request('GET', '/employees'); },
    getEmployee(id)             { return this.request('GET', '/employees/' + id); },
    createEmployee(data)        { return this.request('POST', '/employees', data); },
    updateEmployee(id, data)    { return this.request('PUT', '/employees/' + id, data); },
    deleteEmployee(id)          { return this.request('DELETE', '/employees/' + id); },
    uploadEmployeePhoto(id, f)  { return this.upload('/employees/' + id + '/photo', f); },
    getEmployeeItems(id)        { return this.request('GET', '/employees/' + id + '/items'); },
    addEmployeeItem(id, data)   { return this.request('POST', '/employees/' + id + '/items', data); },
};
