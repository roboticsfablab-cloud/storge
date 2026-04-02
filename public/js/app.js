// ============ Translations ============
const i18n = {
    en: {
        appTitle: 'Locker Cabinet Manager',
        addLocker: 'Add Locker',
        searchPlaceholder: 'Search items and lockers...',
        totalLockers: 'Total Lockers',
        totalItems: 'Total Items',
        totalStock: 'Total Stock',
        alerts: 'Alerts',
        loading: 'Loading lockers...',
        noLockers: 'No lockers yet. Click "Add Locker" to get started.',
        items: 'items',
        pcs: 'pcs',
        locker: 'Locker',
        minStockAlert: 'Min Stock Alert:',
        itemName: 'Item Name',
        description: 'Description',
        stock: 'Stock',
        status: 'Status',
        actions: 'Actions',
        noItems: 'No items in this locker yet.',
        addFirstItem: 'Add your first item below.',
        itemNamePlaceholder: 'Item name...',
        qty: 'Qty',
        descriptionPlaceholder: 'Description (optional)',
        imageUrlPlaceholder: 'Image URL (optional)',
        add: 'Add',
        addNewLocker: 'Add New Locker',
        lockerNumber: 'Locker Number',
        lockerNameOptional: 'Locker Name (optional)',
        cancel: 'Cancel',
        lowStockAlerts: 'Low Stock Alerts',
        allHealthy: 'All stock levels are healthy!',
        outOfStock: 'Out of Stock',
        lowStock: 'Low Stock',
        inStock: 'In Stock',
        itemRemoved: 'Item removed',
        imageUploaded: 'Image uploaded',
        lockerNameUpdated: 'Locker name updated',
        added: 'Added',
        toLocker: 'to locker',
        lockerAdded: 'Locker added',
        lockerDeleted: 'Locker deleted',
        deleteLockerConfirm: 'Delete Locker {id}? All items inside will be removed.',
        enterLockerName: 'Enter locker name:',
        left: 'left',
        min: 'min',
        inStockLabel: 'in stock',
        noItemsGrid: 'No items yet. Add items below.',
        searchLockers: 'Lockers',
        searchItems: 'Items',
        noResults: 'No results found',
        failedLoad: 'Failed to load lockers. Is the server running?',
        failedAlerts: 'Failed to load alerts',
        itemsRunningLow: '{count} item(s) across {lockers} locker(s) running low on stock!',
    },
    ar: {
        appTitle: 'مدير خزائن التخزين',
        addLocker: 'إضافة خزانة',
        searchPlaceholder: 'البحث في العناصر والخزائن...',
        totalLockers: 'إجمالي الخزائن',
        totalItems: 'إجمالي العناصر',
        totalStock: 'إجمالي المخزون',
        alerts: 'التنبيهات',
        loading: 'جاري تحميل الخزائن...',
        noLockers: 'لا توجد خزائن بعد. اضغط "إضافة خزانة" للبدء.',
        items: 'عناصر',
        pcs: 'قطعة',
        locker: 'خزانة',
        minStockAlert: 'حد أدنى للتنبيه:',
        itemName: 'اسم العنصر',
        description: 'الوصف',
        stock: 'المخزون',
        status: 'الحالة',
        actions: 'الإجراءات',
        noItems: 'لا توجد عناصر في هذه الخزانة بعد.',
        addFirstItem: 'أضف عنصرك الأول أدناه.',
        itemNamePlaceholder: 'اسم العنصر...',
        qty: 'الكمية',
        descriptionPlaceholder: 'الوصف (اختياري)',
        imageUrlPlaceholder: 'رابط الصورة (اختياري)',
        add: 'إضافة',
        addNewLocker: 'إضافة خزانة جديدة',
        lockerNumber: 'رقم الخزانة',
        lockerNameOptional: 'اسم الخزانة (اختياري)',
        cancel: 'إلغاء',
        lowStockAlerts: 'تنبيهات المخزون المنخفض',
        allHealthy: 'جميع مستويات المخزون جيدة!',
        outOfStock: 'نفد المخزون',
        lowStock: 'مخزون منخفض',
        inStock: 'متوفر',
        itemRemoved: 'تم حذف العنصر',
        imageUploaded: 'تم رفع الصورة',
        lockerNameUpdated: 'تم تحديث اسم الخزانة',
        added: 'تمت إضافة',
        toLocker: 'إلى الخزانة',
        lockerAdded: 'تمت إضافة الخزانة',
        lockerDeleted: 'تم حذف الخزانة',
        deleteLockerConfirm: 'حذف الخزانة {id}؟ سيتم إزالة جميع العناصر بداخلها.',
        enterLockerName: 'أدخل اسم الخزانة:',
        left: 'متبقي',
        min: 'الحد الأدنى',
        inStockLabel: 'في المخزون',
        noItemsGrid: 'لا توجد عناصر. أضف عناصر أدناه.',
        searchLockers: 'الخزائن',
        searchItems: 'العناصر',
        noResults: 'لم يتم العثور على نتائج',
        failedLoad: 'فشل تحميل الخزائن. هل الخادم يعمل؟',
        failedAlerts: 'فشل تحميل التنبيهات',
        itemsRunningLow: '{count} عنصر(عناصر) في {lockers} خزانة(خزائن) بمخزون منخفض!',
    }
};

// ============ State ============
let currentLockerId = null;
let currentLockerData = null;
let currentView = 'list';
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
let searchTimeout = null;

// ============ i18n ============
function t(key) {
    return i18n[currentLang][key] || i18n.en[key] || key;
}

function applyLanguage() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = currentLang === 'ar'
        ? "'Tajawal', 'Inter', sans-serif"
        : "'Inter', sans-serif";

    document.getElementById('langLabel').textContent = currentLang === 'en' ? 'AR' : 'EN';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage();
    renderGrid();
}

// ============ Theme ============
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    const icon = document.getElementById('themeIcon');
    icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
}

// ============ Toast ============
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

// ============ Search ============
function handleSearch(value) {
    clearTimeout(searchTimeout);
    const results = document.getElementById('searchResults');

    if (!value.trim()) {
        results.style.display = 'none';
        results.innerHTML = '';
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            const data = await API.search(value.trim());
            results.innerHTML = '';

            if (data.lockers.length === 0 && data.items.length === 0) {
                results.innerHTML = `<div class="search-empty">${t('noResults')}</div>`;
                results.style.display = 'block';
                return;
            }

            if (data.lockers.length > 0) {
                results.innerHTML += `<div class="search-section-title">${t('searchLockers')}</div>`;
                data.lockers.forEach(l => {
                    results.innerHTML += `
                        <div class="search-item" onclick="document.getElementById('globalSearch').value=''; document.getElementById('searchResults').style.display='none'; openLockerModal(${l.id})">
                            <i class="fas fa-box-open"></i>
                            <div>
                                <div class="search-item-name">${t('locker')} ${l.id}${l.name ? ' - ' + escapeHtml(l.name) : ''}</div>
                                <div class="search-item-detail">${Number(l.item_count)} ${t('items')} · ${Number(l.total_qty)} ${t('pcs')}</div>
                            </div>
                        </div>`;
                });
            }

            if (data.items.length > 0) {
                results.innerHTML += `<div class="search-section-title">${t('searchItems')}</div>`;
                data.items.forEach(item => {
                    results.innerHTML += `
                        <div class="search-item" onclick="document.getElementById('globalSearch').value=''; document.getElementById('searchResults').style.display='none'; openLockerModal(${item.locker_id})">
                            <i class="fas fa-cube"></i>
                            <div>
                                <div class="search-item-name">${escapeHtml(item.name)}</div>
                                <div class="search-item-detail">${t('locker')} ${item.locker_id}${item.locker_name ? ' - ' + escapeHtml(item.locker_name) : ''} · ${t('qty')}: ${Number(item.qty)}</div>
                            </div>
                        </div>`;
                });
            }

            results.style.display = 'block';
        } catch (err) {
            results.style.display = 'none';
        }
    }, 300);
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

// ============ Dashboard Stats ============
function updateStats(lockers) {
    const totalLockers = lockers.length;
    const totalItems = lockers.reduce((s, l) => s + Number(l.item_count), 0);
    const totalStock = lockers.reduce((s, l) => s + Number(l.total_qty), 0);
    const totalAlerts = lockers.reduce((s, l) => s + Number(l.low_stock_count), 0);

    document.getElementById('statLockers').textContent = totalLockers;
    document.getElementById('statItems').textContent = totalItems;
    document.getElementById('statStock').textContent = totalStock;
    document.getElementById('statAlerts').textContent = totalAlerts;
}

// ============ Render Locker Grid ============
async function renderGrid() {
    const grid = document.getElementById('lockerGrid');
    try {
        const lockers = await API.getLockers();
        grid.innerHTML = '';
        updateStats(lockers);

        if (lockers.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
                <i class="fas fa-box-open"></i>
                <p>${t('noLockers')}</p>
            </div>`;
            updateAlertBadge();
            return;
        }

        lockers.forEach(locker => {
            const hasAlert = Number(locker.low_stock_count) > 0;
            const itemCount = Number(locker.item_count);
            const totalQty = Number(locker.total_qty);
            const minStock = Number(locker.min_stock);
            const stockPercent = itemCount > 0 ? Math.min(100, Math.round((totalQty / (itemCount * minStock)) * 100)) : 100;
            const card = document.createElement('div');
            card.className = 'locker-card' + (hasAlert ? ' has-alert' : '');
            card.onclick = () => openLockerModal(locker.id);

            card.innerHTML = `
                <button class="btn-icon locker-delete-btn" onclick="event.stopPropagation(); deleteLocker(${locker.id})" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="locker-visual">
                    <div class="locker-door">
                        <div class="locker-number">${locker.id}</div>
                        <div class="locker-handle"></div>
                    </div>
                </div>
                <div class="locker-info">
                    <div class="locker-name">${escapeHtml(locker.name || t('locker') + ' ' + locker.id)}</div>
                    <div class="locker-stock-count">
                        <i class="fas fa-box"></i> ${itemCount} ${t('items')} · ${totalQty} ${t('pcs')}
                    </div>
                    <div class="locker-progress">
                        <div class="locker-progress-bar ${hasAlert ? 'bar-alert' : 'bar-ok'}" style="width:${stockPercent}%"></div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        updateAlertBadge();
    } catch (err) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
            <i class="fas fa-exclamation-circle" style="color:var(--danger)"></i>
            <p>${t('failedLoad')}</p>
        </div>`;
    }
}

// ============ Alert Badge & Banner ============
async function updateAlertBadge() {
    try {
        const summary = await API.getAlertSummary();
        const total = Number(summary.total_alerts);
        const lockers = Number(summary.lockers_affected);
        document.getElementById('alertCount').textContent = total;

        if (total > 0) {
            document.getElementById('alertBanner').style.display = 'flex';
            document.getElementById('alertText').textContent =
                t('itemsRunningLow').replace('{count}', total).replace('{lockers}', lockers);
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
        document.getElementById('modalLockerName').textContent = currentLockerData.name || t('locker') + ' ' + currentLockerData.id;
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
    if (qty === 0) return { cls: 'status-out', qcls: 'out', label: t('outOfStock'), icon: '<i class="fas fa-times-circle"></i>' };
    if (qty <= minStock) return { cls: 'status-low', qcls: 'low', label: t('lowStock'), icon: '<i class="fas fa-exclamation-triangle"></i>' };
    return { cls: 'status-ok', qcls: 'ok', label: t('inStock'), icon: '<i class="fas fa-check-circle"></i>' };
}

// ============ Render Items ============
function renderItems() {
    if (!currentLockerData) return;
    const items = currentLockerData.items || [];
    const minStock = Number(currentLockerData.min_stock);

    // List view
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state">
            <i class="fas fa-box-open"></i>
            <p>${t('noItems')}<br>${t('addFirstItem')}</p>
        </td></tr>`;
    } else {
        items.forEach(item => {
            const status = getStatus(Number(item.qty), minStock);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="item-name-cell">
                        ${item.image ? `<img src="${escapeHtml(item.image)}" class="item-thumb" onerror="this.style.display='none'">` : ''}
                        <input type="text" class="stock-input" style="width:140px; text-align:${currentLang === 'ar' ? 'right' : 'left'}"
                            value="${escapeHtml(item.name)}"
                            onchange="updateItemName(${item.id}, this.value)">
                    </div>
                </td>
                <td>
                    <input type="text" class="stock-input desc-input" style="text-align:${currentLang === 'ar' ? 'right' : 'left'}"
                        value="${escapeHtml(item.description || '')}"
                        placeholder="${t('descriptionPlaceholder')}"
                        onchange="updateItemDesc(${item.id}, this.value)">
                </td>
                <td>
                    <input type="number" class="stock-input" min="0" value="${Number(item.qty)}"
                        onchange="updateItemQty(${item.id}, parseInt(this.value))">
                </td>
                <td><span class="status-badge ${status.cls}">${status.icon} ${status.label}</span></td>
                <td class="item-actions">
                    <button class="btn-icon" onclick="changeQty(${item.id}, 1)" title="+1"><i class="fas fa-plus"></i></button>
                    <button class="btn-icon" onclick="changeQty(${item.id}, -1)" title="-1"><i class="fas fa-minus"></i></button>
                    <label class="btn-icon" title="Upload" style="cursor:pointer">
                        <i class="fas fa-image"></i>
                        <input type="file" accept="image/*" style="display:none" onchange="uploadItemImage(${item.id}, this.files[0])">
                    </label>
                    <button class="btn-icon delete" onclick="removeItem(${item.id})" title="Delete"><i class="fas fa-trash-alt"></i></button>
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
            <p>${t('noItemsGrid')}</p>
        </div>`;
    } else {
        items.forEach(item => {
            const status = getStatus(Number(item.qty), minStock);
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
                ${item.description ? `<div class="item-card-desc">${escapeHtml(item.description)}</div>` : ''}
                <div class="item-card-qty ${status.qcls}">${Number(item.qty)}</div>
                <div class="item-card-label">${t('inStockLabel')}</div>
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
    const descInput = document.getElementById('newItemDesc');
    const fileInput = document.getElementById('newItemFile');

    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }

    try {
        const newItem = await API.addItem(currentLockerId, {
            name,
            qty: Math.max(0, parseInt(qtyInput.value) || 0),
            image: imgInput.value.trim(),
            description: descInput.value.trim()
        });

        if (fileInput.files[0]) {
            await API.uploadImage(newItem.id, fileInput.files[0]);
        }

        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast(`${t('added')} "${name}" ${t('toLocker')}`);

        nameInput.value = '';
        qtyInput.value = '1';
        imgInput.value = '';
        descInput.value = '';
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
        showToast(t('itemRemoved'));
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

async function updateItemDesc(itemId, value) {
    try {
        await API.updateItem(itemId, { description: value.trim() });
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
        showToast(t('imageUploaded'));
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
    const newName = prompt(t('enterLockerName'), currentLockerData.name || '');
    if (newName === null) return;
    try {
        await API.updateLocker(currentLockerId, { name: newName.trim() });
        currentLockerData = await API.getLocker(currentLockerId);
        document.getElementById('modalLockerName').textContent = currentLockerData.name || t('locker') + ' ' + currentLockerData.id;
        showToast(t('lockerNameUpdated'));
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
        showToast(`${t('lockerAdded')} ${num}`);
        closeAddLockerModal();
        renderGrid();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function deleteLocker(id) {
    if (!confirm(t('deleteLockerConfirm').replace('{id}', id))) return;
    try {
        await API.deleteLocker(id);
        showToast(`${t('lockerDeleted')} ${id}`);
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
            list.innerHTML = `<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>${t('allHealthy')}</p></div>`;
        } else {
            alerts.forEach(alert => {
                const div = document.createElement('div');
                div.className = 'alert-item';
                div.onclick = () => { closeAlertsPanel(); openLockerModal(alert.locker_id); };
                div.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="alert-item-text">
                        <div class="alert-item-locker">${t('locker')} ${alert.locker_id}${alert.locker_name ? ' - ' + escapeHtml(alert.locker_name) : ''}</div>
                        <div class="alert-item-detail">${escapeHtml(alert.item_name)}: ${Number(alert.qty)} ${t('left')} (${t('min')}: ${Number(alert.min_stock)})</div>
                    </div>
                `;
                list.appendChild(div);
            });
        }
    } catch (err) {
        list.innerHTML = `<div class="empty-state"><p>${t('failedAlerts')}</p></div>`;
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
        document.getElementById('searchResults').style.display = 'none';
    }
    if (e.key === 'Enter' && currentLockerId) {
        const active = document.activeElement;
        if (active && (active.id === 'newItemName' || active.id === 'newItemQty' || active.id === 'newItemImage' || active.id === 'newItemDesc')) {
            addItem();
        }
    }
});

document.getElementById('newItemFile').addEventListener('change', function() {
    if (this.files[0]) {
        showToast('Image selected: ' + this.files[0].name, 'info');
    }
});

// ============ Init ============
applyTheme();
applyLanguage();
renderGrid();
