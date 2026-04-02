// ============ API Client ============
const API = {
    async request(method, url, body) {
        const opts = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch('/api' + url, opts);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
    },

    // Lockers
    getLockers()          { return this.request('GET', '/lockers'); },
    getLocker(id)         { return this.request('GET', '/lockers/' + id); },
    createLocker(data)    { return this.request('POST', '/lockers', data); },
    updateLocker(id, data){ return this.request('PUT', '/lockers/' + id, data); },
    deleteLocker(id)      { return this.request('DELETE', '/lockers/' + id); },

    // Items
    getItems(lockerId)    { return this.request('GET', '/items/locker/' + lockerId); },
    addItem(lockerId, data){ return this.request('POST', '/items/locker/' + lockerId, data); },
    updateItem(id, data)  { return this.request('PUT', '/items/' + id, data); },
    changeQty(id, delta)  { return this.request('PATCH', '/items/' + id + '/qty', { delta }); },
    deleteItem(id)        { return this.request('DELETE', '/items/' + id); },

    async uploadImage(itemId, file) {
        const form = new FormData();
        form.append('image', file);
        const res = await fetch('/api/items/' + itemId + '/image', { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        return data;
    },

    // Alerts
    getAlerts()           { return this.request('GET', '/alerts'); },
    getAlertSummary()     { return this.request('GET', '/alerts/summary'); },
};
