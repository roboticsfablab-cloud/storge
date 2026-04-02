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

    // Departments
    getDepartments()         { return this.request('GET', '/departments'); },
    getDepartment(id)        { return this.request('GET', '/departments/' + id); },
    createDepartment(data)   { return this.request('POST', '/departments', data); },
    updateDepartment(id, d)  { return this.request('PUT', '/departments/' + id, d); },
    deleteDepartment(id)     { return this.request('DELETE', '/departments/' + id); },
    assignLocker(did, lid)   { return this.request('POST', '/departments/' + did + '/lockers', { locker_id: lid }); },
    unassignLocker(did, lid) { return this.request('DELETE', '/departments/' + did + '/lockers/' + lid); },
};
