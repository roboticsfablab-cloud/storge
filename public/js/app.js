// ============ State ============
let currentLockerId = null;
let currentLockerData = null;
let currentView = 'list';
let pendingImageFile = null;

// ============ Toast Notifications ============
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============ Escape HTML ============
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============ Render Locker Grid ============
async function renderGrid() {
    const grid = document.getElementById('lockerGrid');
    try {
        const lockers = await API.getLockers();
        grid.innerHTML = '';

        if (lockers.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
                <i class="fas fa-box-open"></i>
                <p>No lockers yet. Click "Add Locker" to get started.</p>
            </div>`;
            updateAlertBadge();
            return;
        }

        lockers.forEach(locker => {
            const hasAlert = locker.low_stock_count > 0;
            const card = document.createElement('div');
            card.className = 'locker-card' + (hasAlert ? ' has-alert' : '');
            card.onclick = () => openLockerModal(locker.id);

            card.innerHTML = `
                <button class="btn-icon locker-delete-btn" onclick="event.stopPropagation(); deleteLocker(${locker.id})" title="Remove locker">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="locker-keypad">
                    ${Array(9).fill('<span></span>').join('')}
                </div>
                <div class="locker-number">${locker.id}</div>
                <div class="locker-name">${escapeHtml(locker.name || 'Locker ' + locker.id)}</div>
                <div class="locker-handle"></div>
                <div class="locker-stock-count">
                    <i class="fas fa-box"></i> ${locker.item_count} items &middot; ${locker.total_qty} pcs
                </div>
            `;
            grid.appendChild(card);
        });

        updateAlertBadge();
    } catch (err) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
            <i class="fas fa-exclamation-circle" style="color:#f87171"></i>
            <p>Failed to load lockers. Is the server running?</p>
        </div>`;
    }
}

// ============ Alert Badge & Banner ============
async function updateAlertBadge() {
    try {
        const summary = await API.getAlertSummary();
        document.getElementById('alertCount').textContent = summary.total_alerts;

        if (summary.total_alerts > 0) {
            document.getElementById('alertBanner').style.display = 'flex';
            document.getElementById('alertText').textContent =
                `${summary.total_alerts} item${summary.total_alerts > 1 ? 's' : ''} across ${summary.lockers_affected} locker${summary.lockers_affected > 1 ? 's' : ''} running low on stock!`;
        } else {
            document.getElementById('alertBanner').style.display = 'none';
        }
    } catch (err) { /* ignore */ }
}

function closeAlertBanner() {
    document.getElementById('alertBanner').style.display = 'none';
}

// ============ Locker Detail Modal ============
async function openLockerModal(id) {
    currentLockerId = id;
    try {
        currentLockerData = await API.getLocker(id);
        document.getElementById('modalLockerName').textContent = currentLockerData.name || 'Locker ' + currentLockerData.id;
        document.getElementById('minStockSlider').value = currentLockerData.min_stock;
        document.getElementById('minStockValue').textContent = currentLockerData.min_stock;

        renderItems();
        document.getElementById('lockerModal').classList.add('active');
    } catch (err) {
        showToast('Failed to load locker', 'error');
    }
}

function closeLockerModal() {
    document.getElementById('lockerModal').classList.remove('active');
    currentLockerId = null;
    currentLockerData = null;
    renderGrid();
}

// ============ View Toggle ============
function switchView(view) {
    currentView = view;
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
    document.getElementById('listView').style.display = view === 'list' ? '' : 'none';
    document.getElementById('gridView').style.display = view === 'grid' ? '' : 'none';
    renderItems();
}

// ============ Status Helper ============
function getStatus(qty, minStock) {
    if (qty === 0) return { cls: 'status-out', qcls: 'out', label: 'Out of Stock', icon: '<i class="fas fa-times-circle"></i>' };
    if (qty <= minStock) return { cls: 'status-low', qcls: 'low', label: 'Low Stock', icon: '<i class="fas fa-exclamation-triangle"></i>' };
    return { cls: 'status-ok', qcls: 'ok', label: 'In Stock', icon: '<i class="fas fa-check-circle"></i>' };
}

// ============ Render Items ============
function renderItems() {
    if (!currentLockerData) return;
    const items = currentLockerData.items || [];
    const minStock = currentLockerData.min_stock;

    // List view
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty-state">
            <i class="fas fa-box-open"></i>
            <p>No items in this locker yet.<br>Add your first item below.</p>
        </td></tr>`;
    } else {
        items.forEach(item => {
            const status = getStatus(item.qty, minStock);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <input type="text" class="stock-input" style="width:140px; text-align:left"
                        value="${escapeHtml(item.name)}"
                        onchange="updateItemName(${item.id}, this.value)">
                </td>
                <td>
                    <input type="number" class="stock-input" min="0" value="${item.qty}"
                        onchange="updateItemQty(${item.id}, parseInt(this.value))">
                </td>
                <td><span class="status-badge ${status.cls}">${status.icon} ${status.label}</span></td>
                <td class="item-actions">
                    <button class="btn-icon" onclick="changeQty(${item.id}, 1)" title="Add 1"><i class="fas fa-plus"></i></button>
                    <button class="btn-icon" onclick="changeQty(${item.id}, -1)" title="Remove 1"><i class="fas fa-minus"></i></button>
                    <label class="btn-icon" title="Upload image" style="cursor:pointer">
                        <i class="fas fa-image"></i>
                        <input type="file" accept="image/*" style="display:none" onchange="uploadItemImage(${item.id}, this.files[0])">
                    </label>
                    <button class="btn-icon delete" onclick="removeItem(${item.id})" title="Delete item"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Grid view
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
            <i class="fas fa-box-open"></i>
            <p>No items yet. Add items below.</p>
        </div>`;
    } else {
        items.forEach(item => {
            const status = getStatus(item.qty, minStock);
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <button class="btn-icon item-card-delete delete" onclick="removeItem(${item.id})" title="Delete">
                    <i class="fas fa-times"></i>
                </button>
                <div class="item-card-img">
                    ${item.image
                        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-box\\'></i>'">`
                        : '<i class="fas fa-box"></i>'}
                </div>
                <div class="item-card-name">${escapeHtml(item.name)}</div>
                <div class="item-card-qty ${status.qcls}">${item.qty}</div>
                <div class="item-card-label">in stock</div>
            `;
            grid.appendChild(card);
        });
    }
}

// ============ Item Operations ============
async function addItem() {
    const nameInput = document.getElementById('newItemName');
    const qtyInput = document.getElementById('newItemQty');
    const imgInput = document.getElementById('newItemImage');
    const fileInput = document.getElementById('newItemFile');

    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }

    try {
        const newItem = await API.addItem(currentLockerId, {
            name,
            qty: Math.max(0, parseInt(qtyInput.value) || 0),
            image: imgInput.value.trim()
        });

        // Upload image file if selected
        if (fileInput.files[0]) {
            await API.uploadImage(newItem.id, fileInput.files[0]);
        }

        // Refresh locker data
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast(`Added "${name}" to locker`);

        nameInput.value = '';
        qtyInput.value = '1';
        imgInput.value = '';
        fileInput.value = '';
        nameInput.focus();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function removeItem(itemId) {
    try {
        await API.deleteItem(itemId);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast('Item removed');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function updateItemName(itemId, value) {
    try {
        await API.updateItem(itemId, { name: value.trim() });
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function updateItemQty(itemId, value) {
    try {
        await API.updateItem(itemId, { qty: Math.max(0, value || 0) });
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function changeQty(itemId, delta) {
    try {
        await API.changeQty(itemId, delta);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function uploadItemImage(itemId, file) {
    if (!file) return;
    try {
        await API.uploadImage(itemId, file);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast('Image uploaded');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ============ Min Stock ============
function updateMinStockPreview(value) {
    document.getElementById('minStockValue').textContent = value;
}

async function saveMinStock(value) {
    try {
        await API.updateLocker(currentLockerId, { min_stock: parseInt(value) });
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ============ Locker Name ============
async function editLockerName() {
    if (!currentLockerData) return;
    const newName = prompt('Enter locker name:', currentLockerData.name || '');
    if (newName === null) return;
    try {
        await API.updateLocker(currentLockerId, { name: newName.trim() });
        currentLockerData = await API.getLocker(currentLockerId);
        document.getElementById('modalLockerName').textContent = currentLockerData.name || 'Locker ' + currentLockerData.id;
        showToast('Locker name updated');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ============ Add / Delete Locker ============
function openAddLockerModal() {
    document.getElementById('newLockerNumber').value = '';
    document.getElementById('newLockerName').value = '';
    document.getElementById('addLockerModal').classList.add('active');
    setTimeout(() => document.getElementById('newLockerNumber').focus(), 100);
}

function closeAddLockerModal() {
    document.getElementById('addLockerModal').classList.remove('active');
}

async function addLocker() {
    const numInput = document.getElementById('newLockerNumber');
    const nameInput = document.getElementById('newLockerName');
    const num = parseInt(numInput.value);

    if (!num || num < 1) { numInput.focus(); return; }

    try {
        await API.createLocker({ id: num, name: nameInput.value.trim() });
        showToast(`Locker ${num} added`);
        closeAddLockerModal();
        renderGrid();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function deleteLocker(id) {
    if (!confirm('Delete Locker ' + id + '? All items inside will be removed.')) return;
    try {
        await API.deleteLocker(id);
        showToast(`Locker ${id} deleted`);
        renderGrid();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// ============ Alerts Panel ============
document.getElementById('alertBadge').onclick = async () => {
    const list = document.getElementById('alertsList');
    list.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>';
    document.getElementById('alertsPanel').classList.add('active');

    try {
        const alerts = await API.getAlerts();
        list.innerHTML = '';

        if (alerts.length === 0) {
            list.innerHTML = `<div class="empty-state"><i class="fas fa-check-circle" style="color:#34d399"></i><p>All stock levels are healthy!</p></div>`;
        } else {
            alerts.forEach(alert => {
                const div = document.createElement('div');
                div.className = 'alert-item';
                div.onclick = () => { closeAlertsPanel(); openLockerModal(alert.locker_id); };
                div.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="alert-item-text">
                        <div class="alert-item-locker">Locker ${alert.locker_id}${alert.locker_name ? ' - ' + escapeHtml(alert.locker_name) : ''}</div>
                        <div class="alert-item-detail">${escapeHtml(alert.item_name)}: ${alert.qty} left (min: ${alert.min_stock})</div>
                    </div>
                `;
                list.appendChild(div);
            });
        }
    } catch (err) {
        list.innerHTML = `<div class="empty-state"><p>Failed to load alerts</p></div>`;
    }
};

function closeAlertsPanel() {
    document.getElementById('alertsPanel').classList.remove('active');
}

// ============ Close modals on overlay click ============
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            if (overlay.id === 'lockerModal') {
                currentLockerId = null;
                currentLockerData = null;
                renderGrid();
            }
        }
    });
});

// ============ Keyboard ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
            m.classList.remove('active');
        });
        if (currentLockerId) {
            currentLockerId = null;
            currentLockerData = null;
            renderGrid();
        }
    }
    if (e.key === 'Enter' && currentLockerId) {
        const active = document.activeElement;
        if (active && (active.id === 'newItemName' || active.id === 'newItemQty' || active.id === 'newItemImage')) {
            addItem();
        }
    }
});

// File input preview
document.getElementById('newItemFile').addEventListener('change', function() {
    if (this.files[0]) {
        showToast('Image selected: ' + this.files[0].name, 'info');
    }
});

// ============ Init ============
renderGrid();
