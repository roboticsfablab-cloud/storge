// ============ i18n ============
const i18n = {
    en: {
        appTitle:'FABY Keeper', home:'Home', lockers:'Lockers', warehouse:'Warehouse',
        departments:'Departments', employees:'Employees',
        homeSubtitle:'Manage your storage, warehouse, and departments',
        lockersDesc:'Manage locker cabinets and inventory items',
        warehouseDesc:'Manage warehouse zones and bulk storage',
        departmentsDesc:'Manage teams, employees and responsibilities',
        searchAll:'Search everything...', searchLockers:'Search lockers and items...',
        searchWarehouse:'Search zones and items...', searchDepartments:'Search departments and employees...',
        addLocker:'Add Locker', addZone:'Add Zone', addArea:'Add Area',
        addDepartment:'Add Department', addEmployee:'Add Employee', addItem:'Add Item',
        totalLockers:'Total Lockers', totalItems:'Total Items', totalStock:'Total Stock', alerts:'Alerts',
        loading:'Loading...', noLockers:'No lockers yet.', noZones:'No zones yet.',
        noDepts:'No departments yet.', noEmployees:'No employees yet.', noItems:'No items yet.',
        items:'items', pcs:'pcs', zones:'zones', areas:'areas',
        locker:'Locker', zone:'Zone', area:'Area',
        itemName:'Item Name', description:'Description', stock:'Stock', minStock:'Min',
        status:'Status', actions:'Actions', add:'Add', cancel:'Cancel', save:'Save', delete:'Delete',
        edit:'Edit', back:'Back', picture:'Picture', count:'Count',
        equipment:'Equipment', equipmentAr:'العهدة', history:'History',
        responsibleEmployee:'Responsible Employee', currentEmployee:'Current Employee',
        receiptDate:'Receipt Date', purpose:'Purpose', duration:'Duration',
        covenantHistory:'Covenant History', transferTo:'Transfer To', transferDate:'Transfer Date',
        noResults:'No results found', failedLoad:'Failed to load.',
        outOfStock:'Out of Stock', lowStock:'Low Stock', inStock:'In Stock',
        itemRemoved:'Item removed', imageUploaded:'Image uploaded', added:'Added',
        lockerAdded:'Locker added', lockerDeleted:'Locker deleted',
        deleteConfirm:'Delete this? All related data will be removed.',
        enterLockerName:'Enter locker name:', left:'left', min:'min',
        allItems:'All Items', lowStockAlerts:'Low Stock Alerts', allHealthy:'All stock levels are healthy!',
        lockerNumber:'Locker Number', lockerNameOptional:'Locker Name (optional)',
        zoneName:'Zone Name', location:'Location', areaName:'Area Name',
        deptName:'Department Name', manager:'Manager', employeeName:'Employee Name',
        jobTitle:'Job Title', department:'Department', generalItems:'General Items',
        assignedTo:'Assigned To', active:'Active', paused:'Paused', ended:'Ended',
        returned:'Returned', transferred:'Transferred',
        startDate:'Start Date', endDate:'End Date', notes:'Notes',
        itemsRunningLow:'{count} item(s) in {lockers} locker(s) running low!',
        addNewLocker:'Add New Locker', lockerNameUpdated:'Locker name updated',
        qty:'Qty', descriptionPlaceholder:'Description (optional)',
        itemNamePlaceholder:'Item name...',
    },
    ar: {
        appTitle:'FABY Keeper', home:'الرئيسية', lockers:'الخزائن', warehouse:'المستودع',
        departments:'الأقسام', employees:'الموظفون',
        homeSubtitle:'إدارة التخزين والمستودعات والأقسام',
        lockersDesc:'إدارة خزائن التخزين وعناصر المخزون',
        warehouseDesc:'إدارة مناطق المستودع والتخزين',
        departmentsDesc:'إدارة الفرق والموظفين والمسؤوليات',
        searchAll:'البحث في كل شيء...', searchLockers:'البحث في الخزائن والعناصر...',
        searchWarehouse:'البحث في المناطق والعناصر...', searchDepartments:'البحث في الأقسام والموظفين...',
        addLocker:'إضافة خزانة', addZone:'إضافة منطقة', addArea:'إضافة مساحة',
        addDepartment:'إضافة قسم', addEmployee:'إضافة موظف', addItem:'إضافة عنصر',
        totalLockers:'إجمالي الخزائن', totalItems:'إجمالي العناصر', totalStock:'إجمالي المخزون', alerts:'التنبيهات',
        loading:'جاري التحميل...', noLockers:'لا توجد خزائن بعد.', noZones:'لا توجد مناطق بعد.',
        noDepts:'لا توجد أقسام بعد.', noEmployees:'لا يوجد موظفون بعد.', noItems:'لا توجد عناصر بعد.',
        items:'عناصر', pcs:'قطعة', zones:'مناطق', areas:'مساحات',
        locker:'خزانة', zone:'منطقة', area:'مساحة',
        itemName:'اسم العنصر', description:'الوصف', stock:'المخزون', minStock:'الحد الأدنى',
        status:'الحالة', actions:'الإجراءات', add:'إضافة', cancel:'إلغاء', save:'حفظ', delete:'حذف',
        edit:'تعديل', back:'رجوع', picture:'صورة', count:'العدد',
        equipment:'المعدات', equipmentAr:'العهدة', history:'السجل',
        responsibleEmployee:'الموظف المسؤول', currentEmployee:'الموظف الحالي',
        receiptDate:'تاريخ الاستلام', purpose:'الغرض', duration:'المدة',
        covenantHistory:'سجل العهدة', transferTo:'نقل إلى', transferDate:'تاريخ النقل',
        noResults:'لم يتم العثور على نتائج', failedLoad:'فشل التحميل.',
        outOfStock:'نفد المخزون', lowStock:'مخزون منخفض', inStock:'متوفر',
        itemRemoved:'تم حذف العنصر', imageUploaded:'تم رفع الصورة', added:'تمت الإضافة',
        lockerAdded:'تمت إضافة الخزانة', lockerDeleted:'تم حذف الخزانة',
        deleteConfirm:'حذف هذا؟ سيتم إزالة جميع البيانات المرتبطة.',
        enterLockerName:'أدخل اسم الخزانة:', left:'متبقي', min:'الحد الأدنى',
        allItems:'جميع العناصر', lowStockAlerts:'تنبيهات المخزون المنخفض', allHealthy:'جميع مستويات المخزون جيدة!',
        lockerNumber:'رقم الخزانة', lockerNameOptional:'اسم الخزانة (اختياري)',
        zoneName:'اسم المنطقة', location:'الموقع', areaName:'اسم المساحة',
        deptName:'اسم القسم', manager:'المدير', employeeName:'اسم الموظف',
        jobTitle:'المسمى الوظيفي', department:'القسم', generalItems:'عناصر عامة',
        assignedTo:'مسند إلى', active:'نشط', paused:'متوقف', ended:'منتهي',
        returned:'مُرجع', transferred:'منقول',
        startDate:'تاريخ البداية', endDate:'تاريخ النهاية', notes:'ملاحظات',
        itemsRunningLow:'{count} عنصر في {lockers} خزانة بمخزون منخفض!',
        addNewLocker:'إضافة خزانة جديدة', lockerNameUpdated:'تم تحديث اسم الخزانة',
        qty:'الكمية', descriptionPlaceholder:'الوصف (اختياري)',
        itemNamePlaceholder:'اسم العنصر...',
    }
};

// ============ State ============
let currentPage = 'home';
let currentLockerId = null, currentLockerData = null, currentView = 'list';
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
let highlightItemId = null;
let currentZoneId = null, currentZoneData = null;
let currentAreaId = null;
let currentDeptId = null, currentDeptData = null;
let currentEmpId = null, currentEmpData = null;
let currentDeptTab = 'depts';
let searchTimeout = null;
let currentCovenantItemId = null;

// ============ Helpers ============
function t(k) { return (i18n[currentLang] && i18n[currentLang][k]) || i18n.en[k] || k; }
function escapeHtml(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function showToast(msg, type) {
    type = type || 'success';
    var c = document.querySelector('.toast-container');
    if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
    var icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + ' toast-icon"></i>' +
        '<span class="toast-message">' + escapeHtml(msg) + '</span>' +
        '<button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>';
    c.appendChild(el);
    setTimeout(function() {
        if (el.parentElement) { el.classList.add('removing'); setTimeout(function() { el.remove(); }, 300); }
    }, 3500);
}

function getStatus(qty, minStock) {
    if (qty === 0) return { cls: 'status-out', qcls: 'out', label: t('outOfStock'), icon: '<i class="fas fa-times-circle"></i>' };
    if (qty <= minStock) return { cls: 'status-low', qcls: 'low', label: t('lowStock'), icon: '<i class="fas fa-exclamation-triangle"></i>' };
    return { cls: 'status-ok', qcls: 'ok', label: t('inStock'), icon: '<i class="fas fa-check-circle"></i>' };
}

function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('active');
    if (id === 'lockerModal') { currentLockerId = null; currentLockerData = null; highlightItemId = null; renderGrid(); }
    if (id === 'areaItemsModal') { currentAreaId = null; }
    if (id === 'covenantModal') { currentCovenantItemId = null; }
}

// ============ Theme & Language ============
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    var icon = document.getElementById('themeIcon');
    if (icon) icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
}

function applyLanguage() {
    var html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = currentLang === 'ar' ? "'Tajawal','Inter',sans-serif" : "'Inter',sans-serif";
    var langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'AR' : 'EN';
    document.querySelectorAll('[data-i18n]').forEach(function(el) { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) { el.placeholder = t(el.dataset.i18nPlaceholder); });
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage();
    if (currentPage === 'lockers') renderGrid();
    else if (currentPage === 'warehouse') renderWarehouse();
    else if (currentPage === 'departments') { renderDepartments(); renderEmployees(); }
    else if (currentPage === 'dept-detail') renderDeptDetail();
    else if (currentPage === 'emp-detail') renderEmpDetail();
}

// ============ Sidebar ============
function toggleSidebar() {
    var sb = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    var isMobile = window.innerWidth <= 1024;

    if (isMobile) {
        sb.classList.toggle('open');
        overlay.classList.toggle('open');
    } else {
        sb.classList.toggle('hidden');
    }
}

document.addEventListener('click', function(e) {
    var sb = document.getElementById('sidebar');
    if (sb.classList.contains('open') && !e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle') && !e.target.closest('.topbar-hamburger')) {
        sb.classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('open');
    }
});

// ============ Navigation ============
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    var pageEl = document.getElementById('page-' + page);
    if (pageEl) pageEl.classList.add('active');
    currentPage = page;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
    var link = document.querySelector('.sidebar-link[data-page="' + page + '"]');
    if (link) link.classList.add('active');
    // For sub-pages, highlight parent
    if (page === 'dept-detail' || page === 'emp-detail') {
        var deptLink = document.querySelector('.sidebar-link[data-page="departments"]');
        if (deptLink) deptLink.classList.add('active');
    }

    var alertBadge = document.getElementById('alertBadge');
    var addBtn = document.getElementById('addBtn');

    if (alertBadge) alertBadge.style.display = page === 'lockers' ? '' : 'none';
    if (addBtn) addBtn.style.display = (page === 'home' || page === 'dept-detail' || page === 'emp-detail') ? 'none' : '';

    if (page === 'lockers') {
        document.getElementById('addBtnText').textContent = t('addLocker');
        renderGrid();
    } else if (page === 'warehouse') {
        document.getElementById('addBtnText').textContent = t('addZone');
        renderWarehouse();
    } else if (page === 'departments') {
        document.getElementById('addBtnText').textContent = currentDeptTab === 'employees' ? t('addEmployee') : t('addDepartment');
        renderDepartments();
        renderEmployees();
    } else if (page === 'home') {
        loadHomeCounts();
    } else if (page === 'dept-detail') {
        renderDeptDetail();
    } else if (page === 'emp-detail') {
        renderEmpDetail();
    }

    // Update page title
    var titles = {
        home: 'FABY Keeper',
        lockers: t('lockers'),
        warehouse: t('warehouse'),
        departments: t('departments'),
        'dept-detail': t('departments'),
        'emp-detail': t('employees')
    };
    var pageTitleEl = document.getElementById('pageTitle');
    if (pageTitleEl) pageTitleEl.textContent = titles[page] || 'FABY Keeper';

    applyLanguage();

    // Close mobile drawer on navigate
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
}

function handleAddBtn() {
    if (currentPage === 'lockers') openAddLockerModal();
    else if (currentPage === 'warehouse') document.getElementById('addZoneModal').classList.add('active');
    else if (currentPage === 'departments') {
        if (currentDeptTab === 'employees') openAddEmpModal();
        else document.getElementById('addDeptModal').classList.add('active');
    }
}

async function loadHomeCounts() {
    try {
        var results = await Promise.all([API.getLockers(), API.getZones(), API.getDepartments()]);
        var lockers = results[0], zones = results[1], depts = results[2];
        document.getElementById('homeLockerCount').textContent = lockers.length + ' ' + t('lockers');
        document.getElementById('homeWarehouseCount').textContent = zones.length + ' ' + t('zones');
        document.getElementById('homeDeptCount').textContent = depts.length + ' ' + t('departments');
    } catch (e) { /* ignore */ }
}

// ============ Image Viewer ============
function openImageViewer(src) {
    document.getElementById('imageViewerImg').src = src;
    document.getElementById('imageViewer').classList.add('active');
}
function closeImageViewer() { document.getElementById('imageViewer').classList.remove('active'); }

// ============ Global Search (Sidebar) ============
function handleGlobalSearch(value) {
    clearTimeout(searchTimeout);
    var results = document.getElementById('sidebarSearchResults');
    if (!value.trim()) { results.style.display = 'none'; return; }
    searchTimeout = setTimeout(async function() {
        try {
            var data = await API.search(value.trim());
            renderSearchResults(results, data, true);
        } catch (e) { results.style.display = 'none'; }
    }, 300);
}

// ============ Page-specific searches ============
function handleLockerSearch(value) {
    clearTimeout(searchTimeout);
    var results = document.getElementById('lockerSearchResults');
    if (!value.trim()) { results.style.display = 'none'; return; }
    searchTimeout = setTimeout(async function() {
        try {
            var data = await API.search(value.trim());
            renderSearchResults(results, { lockers: data.lockers, items: data.items }, false);
        } catch (e) { results.style.display = 'none'; }
    }, 300);
}

function handleWarehouseSearch(value) {
    clearTimeout(searchTimeout);
    var results = document.getElementById('warehouseSearchResults');
    if (!value.trim()) { results.style.display = 'none'; return; }
    searchTimeout = setTimeout(async function() {
        try {
            var data = await API.search(value.trim());
            renderSearchResults(results, { zones: data.zones }, false);
        } catch (e) { results.style.display = 'none'; }
    }, 300);
}

function handleDeptSearch(value) {
    clearTimeout(searchTimeout);
    var results = document.getElementById('deptSearchResults');
    if (!value.trim()) { results.style.display = 'none'; return; }
    searchTimeout = setTimeout(async function() {
        try {
            var data = await API.search(value.trim());
            renderSearchResults(results, { employees: data.employees, departments: data.departments }, false);
        } catch (e) { results.style.display = 'none'; }
    }, 300);
}

function renderSearchResults(container, data, isGlobal) {
    container.innerHTML = '';
    var hasResults = false;

    if (data.lockers && data.lockers.length > 0) {
        hasResults = true;
        container.innerHTML += '<div class="search-section-title">' + t('lockers') + '</div>';
        data.lockers.forEach(function(l) {
            container.innerHTML += '<div class="search-item" onclick="pickSearchResult(this);navigateTo(\'lockers\');setTimeout(function(){openLockerModal(' + l.id + ')},200)"><i class="fas fa-box-open"></i><div><div class="search-item-name">' + t('locker') + ' ' + l.id + (l.name ? ' - ' + escapeHtml(l.name) : '') + '</div><div class="search-item-detail">' + Number(l.item_count || 0) + ' ' + t('items') + '</div></div></div>';
        });
    }
    if (data.items && data.items.length > 0) {
        hasResults = true;
        container.innerHTML += '<div class="search-section-title">' + t('allItems') + '</div>';
        data.items.forEach(function(item) {
            container.innerHTML += '<div class="search-item" onclick="pickSearchResult(this);highlightItemId=' + item.id + ';navigateTo(\'lockers\');setTimeout(function(){openLockerModal(' + item.locker_id + ')},200)"><i class="fas fa-cube"></i><div><div class="search-item-name">' + escapeHtml(item.name) + '</div><div class="search-item-detail">' + t('locker') + ' ' + item.locker_id + ' &middot; ' + t('qty') + ': ' + Number(item.qty) + '</div></div></div>';
        });
    }
    if (data.zones && data.zones.length > 0) {
        hasResults = true;
        container.innerHTML += '<div class="search-section-title">' + t('zones') + '</div>';
        data.zones.forEach(function(z) {
            container.innerHTML += '<div class="search-item" onclick="pickSearchResult(this);currentZoneId=' + z.id + ';navigateTo(\'warehouse\')"><i class="fas fa-warehouse"></i><div><div class="search-item-name">' + escapeHtml(z.name) + '</div><div class="search-item-detail">' + escapeHtml(z.location || '') + '</div></div></div>';
        });
    }
    if (data.employees && data.employees.length > 0) {
        hasResults = true;
        container.innerHTML += '<div class="search-section-title">' + t('employees') + '</div>';
        data.employees.forEach(function(emp) {
            container.innerHTML += '<div class="search-item" onclick="pickSearchResult(this);currentEmpId=' + emp.id + ';navigateTo(\'emp-detail\')"><i class="fas fa-user-tie"></i><div><div class="search-item-name">' + escapeHtml(emp.name) + '</div><div class="search-item-detail">' + escapeHtml(emp.job_title || '') + (emp.department_name ? ' &middot; ' + escapeHtml(emp.department_name) : '') + '</div></div></div>';
        });
    }
    if (data.departments && data.departments.length > 0) {
        hasResults = true;
        container.innerHTML += '<div class="search-section-title">' + t('departments') + '</div>';
        data.departments.forEach(function(d) {
            container.innerHTML += '<div class="search-item" onclick="pickSearchResult(this);currentDeptId=' + d.id + ';navigateTo(\'dept-detail\')"><i class="fas fa-building"></i><div><div class="search-item-name">' + escapeHtml(d.name) + '</div><div class="search-item-detail">' + (d.manager ? escapeHtml(d.manager) : '') + '</div></div></div>';
        });
    }

    if (!hasResults) {
        container.innerHTML = '<div class="search-empty">' + t('noResults') + '</div>';
    }
    container.style.display = 'block';
}

function pickSearchResult(el) {
    document.querySelectorAll('.search-item.search-active').forEach(function(s) { s.classList.remove('search-active'); });
    el.classList.add('search-active');
    setTimeout(function() {
        var parent = el.closest('.sidebar-search-results,.page-search-results');
        if (parent) parent.style.display = 'none';
        document.querySelectorAll('.search-item.search-active').forEach(function(s) { s.classList.remove('search-active'); });
    }, 600);
}

// Close search results on outside click
document.addEventListener('click', function(e) {
    if (!e.target.closest('.sidebar-search')) {
        var sr = document.getElementById('sidebarSearchResults');
        if (sr) sr.style.display = 'none';
    }
    if (!e.target.closest('.page-search-box')) {
        document.querySelectorAll('.page-search-results').forEach(function(r) { r.style.display = 'none'; });
    }
});

// ============ Lockers ============
function updateStats(lockers) {
    document.getElementById('statLockers').textContent = lockers.length;
    document.getElementById('statItems').textContent = lockers.reduce(function(s, l) { return s + Number(l.item_count); }, 0);
    document.getElementById('statStock').textContent = lockers.reduce(function(s, l) { return s + Number(l.total_qty); }, 0);
    document.getElementById('statAlerts').textContent = lockers.reduce(function(s, l) { return s + Number(l.low_stock_count); }, 0);
}

async function renderGrid() {
    var grid = document.getElementById('lockerGrid');
    try {
        var lockers = await API.getLockers();
        grid.innerHTML = '';
        updateStats(lockers);
        if (lockers.length === 0) {
            grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>' + t('noLockers') + '</p></div>';
            updateAlertBadge();
            return;
        }
        lockers.forEach(function(locker) {
            var hasAlert = Number(locker.low_stock_count) > 0;
            var ic = Number(locker.item_count), tq = Number(locker.total_qty);
            var card = document.createElement('div');
            card.className = 'locker-card' + (hasAlert ? ' has-alert' : '');
            card.onclick = function() { openLockerModal(locker.id); };
            card.innerHTML = '<button class="btn-icon locker-delete-btn" onclick="event.stopPropagation();deleteLocker(' + locker.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '<div class="locker-visual"><div class="locker-door"><div class="locker-number">' + locker.id + '</div><div class="locker-handle"></div></div></div>' +
                '<div class="locker-info"><div class="locker-name">' + escapeHtml(locker.name || t('locker') + ' ' + locker.id) + '</div>' +
                '<div class="locker-stock-count"><i class="fas fa-box"></i> ' + ic + ' ' + t('items') + ' &middot; ' + tq + ' ' + t('pcs') + '</div>' +
                '<div class="locker-progress"><div class="locker-progress-bar ' + (hasAlert ? 'bar-alert' : 'bar-ok') + '" style="width:' + (ic > 0 ? Math.min(100, Math.round(tq / (ic * 5) * 100)) : 100) + '%"></div></div></div>';
            grid.appendChild(card);
        });
        updateAlertBadge();
    } catch (e) {
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>' + t('failedLoad') + '</p></div>';
    }
}

async function updateAlertBadge() {
    try {
        var s = await API.getAlertSummary();
        var total = Number(s.total_alerts), lk = Number(s.lockers_affected);
        document.getElementById('alertCount').textContent = total;
        var banner = document.getElementById('alertBanner');
        if (total > 0 && currentPage === 'lockers') {
            banner.style.display = 'flex';
            document.getElementById('alertText').textContent = t('itemsRunningLow').replace('{count}', total).replace('{lockers}', lk);
        } else {
            banner.style.display = 'none';
        }
    } catch (e) { /* ignore */ }
}

function dismissAlertBanner() { document.getElementById('alertBanner').style.display = 'none'; }

async function openLockerModal(id) {
    currentLockerId = id;
    try {
        currentLockerData = await API.getLocker(id);
        document.getElementById('modalLockerName').textContent = currentLockerData.name || t('locker') + ' ' + currentLockerData.id;
        renderItems();
        document.getElementById('lockerModal').classList.add('active');
    } catch (e) { showToast('Failed to load locker', 'error'); }
}

function closeLockerModal() {
    document.getElementById('lockerModal').classList.remove('active');
    currentLockerId = null;
    currentLockerData = null;
    highlightItemId = null;
    renderGrid();
}

function switchLockerView(v) {
    currentView = v;
    document.getElementById('listViewBtn').classList.toggle('active', v === 'list');
    document.getElementById('gridViewBtn').classList.toggle('active', v === 'grid');
    document.getElementById('listView').classList.toggle('active', v === 'list');
    document.getElementById('gridView').classList.toggle('active', v === 'grid');
    renderItems();
}
// alias
function switchView(v) { switchLockerView(v); }

function renderItems() {
    if (!currentLockerData) return;
    var items = currentLockerData.items || [];
    var dir = currentLang === 'ar' ? 'right' : 'left';

    // List view
    var tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';
    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><i class="fas fa-box-open"></i><p>' + t('noItems') + '</p></td></tr>';
    } else {
        items.forEach(function(item) {
            var q = Number(item.qty), ms = Number(item.min_stock), status = getStatus(q, ms);
            var hl = highlightItemId == item.id ? ' highlighted' : '';
            var tr = document.createElement('tr');
            tr.className = hl;
            tr.innerHTML = '<td><div class="item-name-cell">' +
                (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-thumb" onclick="event.stopPropagation();openImageViewer(\'' + escapeHtml(item.image) + '\')" onerror="this.style.display=\'none\'">' : '') +
                '<input type="text" class="stock-input" style="width:130px;text-align:' + dir + '" value="' + escapeHtml(item.name) + '" onchange="updateItem(' + item.id + ',{name:this.value})">' +
                '</div></td>' +
                '<td><input type="text" class="stock-input desc-input" style="text-align:' + dir + '" value="' + escapeHtml(item.description || '') + '" placeholder="' + t('descriptionPlaceholder') + '" onchange="updateItem(' + item.id + ',{description:this.value})"></td>' +
                '<td><input type="number" class="stock-input" min="0" value="' + q + '" onchange="updateItem(' + item.id + ',{qty:parseInt(this.value)})"></td>' +
                '<td><input type="number" class="stock-input" min="0" value="' + ms + '" style="width:60px" onchange="updateItem(' + item.id + ',{min_stock:parseInt(this.value)})"></td>' +
                '<td><span class="status-badge ' + status.cls + '">' + status.icon + ' ' + status.label + '</span></td>' +
                '<td class="item-actions">' +
                '<button class="btn-icon" onclick="changeQty(' + item.id + ',1)"><i class="fas fa-plus"></i></button>' +
                '<button class="btn-icon" onclick="changeQty(' + item.id + ',-1)"><i class="fas fa-minus"></i></button>' +
                '<label class="btn-icon" style="cursor:pointer"><i class="fas fa-image"></i><input type="file" accept="image/*" style="display:none" onchange="uploadItemImage(' + item.id + ',this.files[0])"></label>' +
                '<button class="btn-icon delete" onclick="removeItem(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '</td>';
            tbody.appendChild(tr);
        });
    }

    // Grid view
    var gridEl = document.getElementById('itemsGrid');
    gridEl.innerHTML = '';
    if (items.length === 0) {
        gridEl.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>' + t('noItems') + '</p></div>';
    } else {
        items.forEach(function(item) {
            var q = Number(item.qty), ms = Number(item.min_stock), status = getStatus(q, ms);
            var hl = highlightItemId == item.id ? ' highlighted' : '';
            var card = document.createElement('div');
            card.className = 'item-card' + hl;
            card.innerHTML = '<button class="btn-icon item-card-delete delete" onclick="removeItem(' + item.id + ')"><i class="fas fa-times"></i></button>' +
                '<div class="item-card-img"' + (item.image ? ' onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" style="cursor:pointer"' : '') + '>' +
                (item.image ? '<img src="' + escapeHtml(item.image) + '" onerror="this.parentElement.innerHTML=\'<i class=\\\'fas fa-box\\\'></i>\'">' : '<i class="fas fa-box"></i>') +
                '</div>' +
                '<input type="text" class="item-card-edit" value="' + escapeHtml(item.name) + '" onchange="updateItem(' + item.id + ',{name:this.value})">' +
                (item.description ? '<div class="item-card-desc">' + escapeHtml(item.description) + '</div>' : '') +
                '<div class="item-card-qty-row">' +
                '<button class="btn-icon" onclick="changeQty(' + item.id + ',-1)"><i class="fas fa-minus"></i></button>' +
                '<span class="item-card-qty ' + status.qcls + '">' + q + '</span>' +
                '<button class="btn-icon" onclick="changeQty(' + item.id + ',1)"><i class="fas fa-plus"></i></button>' +
                '</div>' +
                '<div class="item-card-min">Min: <input type="number" value="' + ms + '" min="0" style="width:50px" class="stock-input" onchange="updateItem(' + item.id + ',{min_stock:parseInt(this.value)})"></div>' +
                '<div class="item-card-label">' + status.label + '</div>';
            gridEl.appendChild(card);
        });
    }

    if (highlightItemId) setTimeout(function() { highlightItemId = null; }, 4000);
}

// ============ Item CRUD ============
async function updateItem(id, data) {
    try {
        await API.updateItem(id, data);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch (e) { showToast(e.message, 'error'); }
}

async function addItem() {
    var name = document.getElementById('newItemName').value.trim();
    if (!name) { document.getElementById('newItemName').focus(); return; }
    try {
        var newItem = await API.addItem(currentLockerId, {
            name: name,
            qty: Math.max(0, parseInt(document.getElementById('newItemQty').value) || 0),
            min_stock: parseInt(document.getElementById('newItemMin').value) || 5,
            description: document.getElementById('newItemDesc').value.trim()
        });
        var fileInput = document.getElementById('newItemFile');
        if (fileInput.files[0]) await API.uploadImage(newItem.id, fileInput.files[0]);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast(t('added') + ' "' + name + '"');
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemQty').value = '1';
        document.getElementById('newItemMin').value = '5';
        document.getElementById('newItemDesc').value = '';
        fileInput.value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function removeItem(id) {
    try {
        await API.deleteItem(id);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function changeQty(id, delta) {
    try {
        await API.changeQty(id, delta);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch (e) { showToast(e.message, 'error'); }
}

async function uploadItemImage(id, file) {
    if (!file) return;
    try {
        await API.uploadImage(id, file);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
        showToast(t('imageUploaded'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function editLockerName() {
    if (!currentLockerData) return;
    var n = prompt(t('enterLockerName'), currentLockerData.name || '');
    if (n === null) return;
    try {
        await API.updateLocker(currentLockerId, { name: n.trim() });
        currentLockerData = await API.getLocker(currentLockerId);
        document.getElementById('modalLockerName').textContent = currentLockerData.name || t('locker') + ' ' + currentLockerData.id;
        showToast(t('lockerNameUpdated'));
    } catch (e) { showToast(e.message, 'error'); }
}

function openAddLockerModal() {
    document.getElementById('newLockerNumber').value = '';
    document.getElementById('newLockerName').value = '';
    document.getElementById('addLockerModal').classList.add('active');
}

function closeAddLockerModal() { document.getElementById('addLockerModal').classList.remove('active'); }

async function saveNewLocker() {
    var num = parseInt(document.getElementById('newLockerNumber').value);
    if (!num || num < 1) { document.getElementById('newLockerNumber').focus(); return; }
    try {
        await API.createLocker({ id: num, name: document.getElementById('newLockerName').value.trim() });
        showToast(t('lockerAdded') + ' ' + num);
        closeAddLockerModal();
        renderGrid();
    } catch (e) { showToast(e.message, 'error'); }
}
// alias for compatibility
function addLocker() { saveNewLocker(); }

async function deleteLocker(id) {
    if (!confirm(t('deleteConfirm'))) return;
    try {
        await API.deleteLocker(id);
        showToast(t('lockerDeleted') + ' ' + id);
        renderGrid();
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ All Items Panel ============
async function showAllItems() {
    var body = document.getElementById('allItemsBody');
    body.innerHTML = '<tr><td colspan="6" class="loading"><i class="fas fa-spinner fa-spin"></i></td></tr>';
    document.getElementById('allItemsPanel').classList.add('active');
    try {
        var items = await API.getAllItems();
        body.innerHTML = '';
        items.forEach(function(item) {
            var q = Number(item.qty), ms = Number(item.min_stock), status = getStatus(q, ms);
            body.innerHTML += '<tr onclick="closeModal(\'allItemsPanel\');openLockerModal(' + item.locker_id + ')" style="cursor:pointer">' +
                '<td>' + escapeHtml(item.name) + '</td>' +
                '<td>' + escapeHtml(item.description || '') + '</td>' +
                '<td>' + q + '</td><td>' + ms + '</td>' +
                '<td>' + t('locker') + ' ' + item.locker_id + (item.locker_name ? ' - ' + escapeHtml(item.locker_name) : '') + '</td>' +
                '<td><span class="status-badge ' + status.cls + '">' + status.icon + ' ' + status.label + '</span></td></tr>';
        });
        if (items.length === 0) body.innerHTML = '<tr><td colspan="6" class="empty-state">' + t('noItems') + '</td></tr>';
    } catch (e) { body.innerHTML = '<tr><td colspan="6">' + t('failedLoad') + '</td></tr>'; }
}

// ============ Alerts Panel ============
function openAlertsPanel() {
    var list = document.getElementById('alertsList');
    list.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>';
    document.getElementById('alertsPanel').classList.add('active');
    API.getAlerts().then(function(alerts) {
        list.innerHTML = '';
        if (alerts.length === 0) {
            list.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>' + t('allHealthy') + '</p></div>';
            return;
        }
        alerts.forEach(function(a) {
            var div = document.createElement('div');
            div.className = 'alert-item';
            div.onclick = function() { closeModal('alertsPanel'); openLockerModal(a.locker_id); };
            div.innerHTML = '<i class="fas fa-exclamation-triangle"></i><div class="alert-item-text"><div class="alert-item-locker">' + t('locker') + ' ' + a.locker_id + (a.locker_name ? ' - ' + escapeHtml(a.locker_name) : '') + '</div><div class="alert-item-detail">' + escapeHtml(a.item_name) + ': ' + Number(a.qty) + ' ' + t('left') + ' (' + t('min') + ': ' + Number(a.min_stock) + ')</div></div>';
            list.appendChild(div);
        });
    }).catch(function() { list.innerHTML = '<div class="empty-state">' + t('failedLoad') + '</div>'; });
}

function closeAlertsPanel() { document.getElementById('alertsPanel').classList.remove('active'); }

// ============ Warehouse ============
async function renderWarehouse() {
    var zoneBar = document.getElementById('whZoneBar');
    var content = document.getElementById('warehouseContent');

    try {
        var zones = await API.getZones();

        // Render zone bar icons
        zoneBar.innerHTML = '';
        // "All Zones" button
        var allBtn = document.createElement('div');
        allBtn.className = 'zone-icon-btn' + (currentZoneId === null ? ' active' : '');
        allBtn.onclick = function() { selectZone(null); };
        allBtn.innerHTML = '<i class="fas fa-th-large"></i><span>' + t('allItems') + '</span>';
        zoneBar.appendChild(allBtn);

        zones.forEach(function(z) {
            var btn = document.createElement('div');
            btn.className = 'zone-icon-btn' + (currentZoneId === z.id ? ' active' : '');
            btn.onclick = function() { selectZone(z.id); };
            btn.innerHTML = '<i class="fas fa-warehouse"></i><span>' + escapeHtml(z.name) + '</span>';
            zoneBar.appendChild(btn);
        });

        if (currentZoneId === null) {
            // Render zone cards grid
            renderZoneGrid(zones);
        } else {
            // Render zone detail
            await renderZoneDetail();
        }
    } catch (e) {
        content.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><p>' + t('failedLoad') + '</p></div>';
    }
}

function selectZone(id) {
    currentZoneId = id;
    currentZoneData = null;
    renderWarehouse();
}

function renderZoneGrid(zones) {
    var content = document.getElementById('warehouseContent');
    content.innerHTML = '';

    if (zones.length === 0) {
        content.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-warehouse"></i><p>' + t('noZones') + '</p></div>';
        return;
    }

    var grid = document.createElement('div');
    grid.className = 'zone-grid';

    zones.forEach(function(z, idx) {
        var color = z.color || '#7b2ff7';
        var hasAlert = Number(z.low_stock_count) > 0;
        var card = document.createElement('div');
        card.className = 'zone-card';
        card.style.animationDelay = (idx * 0.08) + 's';
        card.onclick = function() { selectZone(z.id); };
        card.innerHTML = '<button class="btn-icon zone-card-delete" onclick="event.stopPropagation();deleteZone(' + z.id + ')"><i class="fas fa-trash-alt" style="color:var(--danger)"></i></button>' +
            '<div class="zone-card-color" style="background:' + color + '"></div>' +
            '<div class="zone-card-header">' +
            '<div class="zone-card-icon" style="background:' + color + '">' + (hasAlert ? '<i class="fas fa-exclamation-triangle"></i>' : '<i class="fas fa-warehouse"></i>') + '</div>' +
            '<div class="zone-card-title">' + escapeHtml(z.name) + '</div>' +
            (z.location ? '<div class="zone-card-location"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(z.location) + '</div>' : '') +
            '</div>' +
            '<div class="zone-card-body">' +
            '<div class="zone-card-stats">' +
            '<div class="zone-card-stat"><div class="zone-card-stat-value">' + Number(z.area_count || 0) + '</div><div class="zone-card-stat-label">' + t('areas') + '</div></div>' +
            '<div class="zone-card-stat"><div class="zone-card-stat-value">' + Number(z.item_count) + '</div><div class="zone-card-stat-label">' + t('items') + '</div></div>' +
            '<div class="zone-card-stat"><div class="zone-card-stat-value">' + Number(z.total_qty) + '</div><div class="zone-card-stat-label">' + t('stock') + '</div></div>' +
            '</div></div>';
        grid.appendChild(card);
    });

    content.appendChild(grid);
}

async function renderZoneDetail() {
    var content = document.getElementById('warehouseContent');
    content.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> ' + t('loading') + '</div>';

    try {
        currentZoneData = await API.getZone(currentZoneId);
        var zone = currentZoneData;
        var areas = zone.areas || [];
        var unassigned = zone.unassigned_items || [];

        var html = '<div class="zone-detail">';
        // Zone header
        html += '<div class="zone-detail-header">';
        html += '<h2>' + escapeHtml(zone.name) + '</h2>';
        if (zone.location) html += '<div class="zone-detail-location"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(zone.location) + '</div>';
        if (zone.description) html += '<div class="zone-detail-desc">' + escapeHtml(zone.description) + '</div>';
        html += '</div>';

        // Areas section
        html += '<div class="zone-areas-section">';
        html += '<div class="zone-areas-header"><h3><i class="fas fa-th-large"></i> ' + t('areas') + '</h3>';
        html += '<button class="btn-add btn-sm" onclick="openAddAreaModal()"><i class="fas fa-plus"></i> ' + t('addArea') + '</button></div>';
        html += '<div class="zone-areas-grid">';

        areas.forEach(function(area) {
            var areaItemCount = (area.items || []).length;
            html += '<div class="zone-area-card" onclick="openAreaItems(' + area.id + ',\'' + escapeHtml(area.name).replace(/'/g, "\\'") + '\')">';
            html += '<button class="btn-icon zone-area-delete" onclick="event.stopPropagation();deleteArea(' + area.id + ')"><i class="fas fa-trash-alt" style="color:var(--danger);font-size:11px"></i></button>';
            html += '<div class="zone-area-card-icon"><i class="fas fa-th-large"></i></div>';
            html += '<div class="zone-area-card-name">' + escapeHtml(area.name) + '</div>';
            html += '<div class="zone-area-card-count">' + areaItemCount + ' ' + t('items') + '</div>';
            html += '</div>';
        });

        html += '</div></div>';

        // General items section (unassigned)
        html += '<div class="zone-general-section">';
        html += '<h3><i class="fas fa-cubes"></i> ' + t('generalItems') + '</h3>';
        html += '<div class="table-responsive"><table class="items-table"><thead><tr>';
        html += '<th>' + t('itemName') + '</th><th>' + t('description') + '</th><th>' + t('stock') + '</th><th>' + t('minStock') + '</th><th>' + t('status') + '</th><th>' + t('actions') + '</th>';
        html += '</tr></thead><tbody>';

        if (unassigned.length === 0) {
            html += '<tr><td colspan="6" class="empty-state" style="padding:12px">' + t('noItems') + '</td></tr>';
        } else {
            unassigned.forEach(function(item) {
                var q = Number(item.qty), ms = Number(item.min_stock), status = getStatus(q, ms);
                html += '<tr>' +
                    '<td><div class="item-name-cell">' +
                    (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-thumb" onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" onerror="this.style.display=\'none\'">' : '') +
                    '<input type="text" class="stock-input" style="width:120px" value="' + escapeHtml(item.name) + '" onchange="updateZoneItem(' + item.id + ',{name:this.value})">' +
                    '</div></td>' +
                    '<td><input type="text" class="stock-input desc-input" value="' + escapeHtml(item.description || '') + '" onchange="updateZoneItem(' + item.id + ',{description:this.value})"></td>' +
                    '<td><input type="number" class="stock-input" min="0" value="' + q + '" onchange="updateZoneItem(' + item.id + ',{qty:parseInt(this.value)})"></td>' +
                    '<td><input type="number" class="stock-input" min="0" value="' + ms + '" style="width:60px" onchange="updateZoneItem(' + item.id + ',{min_stock:parseInt(this.value)})"></td>' +
                    '<td><span class="status-badge ' + status.cls + '">' + status.icon + ' ' + status.label + '</span></td>' +
                    '<td class="item-actions">' +
                    '<label class="btn-icon" style="cursor:pointer"><i class="fas fa-image"></i><input type="file" accept="image/*" style="display:none" onchange="uploadZoneItemImg(' + item.id + ',this.files[0])"></label>' +
                    '<button class="btn-icon delete" onclick="deleteZoneItem(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                    '</td></tr>';
            });
        }

        html += '</tbody></table></div>';

        // Add item bar for zone
        html += '<div class="add-item-bar">';
        html += '<input type="text" id="newZoneItemName" placeholder="' + t('itemNamePlaceholder') + '">';
        html += '<input type="number" id="newZoneItemQty" placeholder="1" min="0" value="1">';
        html += '<input type="number" id="newZoneItemMin" placeholder="5" min="0" value="5">';
        html += '<input type="text" id="newZoneItemDesc" placeholder="' + t('descriptionPlaceholder') + '">';
        html += '<button class="btn-add" onclick="addZoneItem()"><i class="fas fa-plus"></i> ' + t('add') + '</button>';
        html += '</div></div>';

        html += '</div>';
        content.innerHTML = html;
    } catch (e) {
        content.innerHTML = '<div class="empty-state"><p>' + t('failedLoad') + '</p></div>';
    }
}

function openAreaItems(areaId, areaName) {
    currentAreaId = areaId;
    document.getElementById('areaModalName').textContent = areaName;

    // Find items for this area from currentZoneData
    var areaItems = [];
    if (currentZoneData && currentZoneData.areas) {
        var area = currentZoneData.areas.find(function(a) { return a.id === areaId; });
        if (area) areaItems = area.items || [];
    }

    var tbody = document.getElementById('areaItemsBody');
    tbody.innerHTML = '';
    if (areaItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state" style="padding:12px">' + t('noItems') + '</td></tr>';
    } else {
        areaItems.forEach(function(item) {
            var q = Number(item.qty), ms = Number(item.min_stock), status = getStatus(q, ms);
            tbody.innerHTML += '<tr>' +
                '<td><div class="item-name-cell">' +
                (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-thumb" onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" onerror="this.style.display=\'none\'">' : '') +
                '<input type="text" class="stock-input" style="width:120px" value="' + escapeHtml(item.name) + '" onchange="updateZoneItem(' + item.id + ',{name:this.value})">' +
                '</div></td>' +
                '<td><input type="text" class="stock-input desc-input" value="' + escapeHtml(item.description || '') + '" onchange="updateZoneItem(' + item.id + ',{description:this.value})"></td>' +
                '<td><input type="number" class="stock-input" min="0" value="' + q + '" onchange="updateZoneItem(' + item.id + ',{qty:parseInt(this.value)})"></td>' +
                '<td><input type="number" class="stock-input" min="0" value="' + ms + '" style="width:60px" onchange="updateZoneItem(' + item.id + ',{min_stock:parseInt(this.value)})"></td>' +
                '<td><span class="status-badge ' + status.cls + '">' + status.icon + ' ' + status.label + '</span></td>' +
                '<td class="item-actions">' +
                '<label class="btn-icon" style="cursor:pointer"><i class="fas fa-image"></i><input type="file" accept="image/*" style="display:none" onchange="uploadZoneItemImg(' + item.id + ',this.files[0])"></label>' +
                '<button class="btn-icon delete" onclick="deleteZoneItem(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '</td></tr>';
        });
    }

    document.getElementById('areaItemsModal').classList.add('active');
}

async function addZone() {
    var name = document.getElementById('newZoneName').value.trim();
    if (!name) return;
    try {
        await API.createZone({
            name: name,
            location: document.getElementById('newZoneLocation').value.trim(),
            description: document.getElementById('newZoneDesc').value.trim(),
            color: document.getElementById('newZoneColor').value
        });
        document.getElementById('addZoneModal').classList.remove('active');
        renderWarehouse();
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}
function saveNewZone() { addZone(); }

async function deleteZone(id) {
    if (!confirm(t('deleteConfirm'))) return;
    try {
        await API.deleteZone(id);
        if (currentZoneId === id) currentZoneId = null;
        renderWarehouse();
    } catch (e) { showToast(e.message, 'error'); }
}

function openAddAreaModal() {
    document.getElementById('newAreaName').value = '';
    document.getElementById('newAreaDesc').value = '';
    document.getElementById('addAreaModal').classList.add('active');
}

async function addArea() {
    var name = document.getElementById('newAreaName').value.trim();
    if (!name) return;
    try {
        await API.createArea(currentZoneId, { name: name, description: document.getElementById('newAreaDesc').value.trim() });
        document.getElementById('addAreaModal').classList.remove('active');
        currentZoneData = await API.getZone(currentZoneId);
        await renderZoneDetail();
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}
function saveNewArea() { addArea(); }

async function deleteArea(id) {
    if (!confirm(t('deleteConfirm'))) return;
    try {
        await API.deleteArea(id);
        currentZoneData = await API.getZone(currentZoneId);
        await renderZoneDetail();
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function addZoneItem() {
    var nameEl = document.getElementById('newZoneItemName');
    var name = nameEl.value.trim();
    if (!name) return;
    try {
        await API.addZoneItem(currentZoneId, {
            name: name,
            qty: parseInt(document.getElementById('newZoneItemQty').value) || 0,
            min_stock: parseInt(document.getElementById('newZoneItemMin').value) || 5,
            description: document.getElementById('newZoneItemDesc').value.trim(),
            area_id: null
        });
        currentZoneData = await API.getZone(currentZoneId);
        await renderZoneDetail();
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function addAreaItem() {
    var name = document.getElementById('newAreaItemName').value.trim();
    if (!name) return;
    try {
        var newItem = await API.addZoneItem(currentZoneId, {
            name: name,
            qty: parseInt(document.getElementById('newAreaItemQty').value) || 0,
            min_stock: parseInt(document.getElementById('newAreaItemMin').value) || 5,
            description: document.getElementById('newAreaItemDesc').value.trim(),
            area_id: currentAreaId
        });
        // Upload image if selected
        var fileInput = document.getElementById('newAreaItemFile');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            await API.uploadZoneItemImage(newItem.id, fileInput.files[0]);
        }
        currentZoneData = await API.getZone(currentZoneId);
        // Re-open area items modal with refreshed data
        var area = currentZoneData.areas.find(function(a) { return a.id === currentAreaId; });
        if (area) openAreaItems(currentAreaId, area.name);
        // Also refresh zone detail behind modal
        showToast(t('added'));
        document.getElementById('newAreaItemName').value = '';
        document.getElementById('newAreaItemQty').value = '1';
        document.getElementById('newAreaItemMin').value = '0';
        document.getElementById('newAreaItemDesc').value = '';
        if (fileInput) fileInput.value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function updateZoneItem(id, data) {
    try {
        await API.updateZoneItem(id, data);
        currentZoneData = await API.getZone(currentZoneId);
        // Refresh area modal if open
        if (currentAreaId) {
            var area = currentZoneData.areas.find(function(a) { return a.id === currentAreaId; });
            if (area) openAreaItems(currentAreaId, area.name);
        }
        await renderZoneDetail();
    } catch (e) { showToast(e.message, 'error'); }
}

async function deleteZoneItem(id) {
    try {
        await API.deleteZoneItem(id);
        currentZoneData = await API.getZone(currentZoneId);
        if (currentAreaId) {
            var area = currentZoneData.areas.find(function(a) { return a.id === currentAreaId; });
            if (area) openAreaItems(currentAreaId, area.name);
        }
        await renderZoneDetail();
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function uploadZoneItemImg(id, file) {
    if (!file) return;
    try {
        await API.uploadZoneItemImage(id, file);
        currentZoneData = await API.getZone(currentZoneId);
        if (currentAreaId) {
            var area = currentZoneData.areas.find(function(a) { return a.id === currentAreaId; });
            if (area) openAreaItems(currentAreaId, area.name);
        }
        await renderZoneDetail();
        showToast(t('imageUploaded'));
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ Departments Page (Tabs) ============
function switchDeptTab(tab) {
    currentDeptTab = tab;
    document.getElementById('tabEmployees').classList.toggle('active', tab === 'employees');
    document.getElementById('tabDepts').classList.toggle('active', tab === 'depts');
    document.getElementById('deptTabEmployees').classList.toggle('active', tab === 'employees');
    document.getElementById('deptTabDepts').classList.toggle('active', tab === 'depts');
    document.getElementById('addBtnText').textContent = tab === 'employees' ? t('addEmployee') : t('addDepartment');
}

// ============ Departments ============
async function renderDepartments() {
    var grid = document.getElementById('deptGrid');
    try {
        var depts = await API.getDepartments();
        grid.innerHTML = '';
        if (depts.length === 0) {
            grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-building"></i><p>' + t('noDepts') + '</p></div>';
            return;
        }
        depts.forEach(function(d) {
            var card = document.createElement('div');
            card.className = 'dept-card';
            card.onclick = function() { currentDeptId = d.id; navigateTo('dept-detail'); };
            card.innerHTML = '<button class="btn-icon locker-delete-btn" onclick="event.stopPropagation();deleteDept(' + d.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '<div class="dept-card-icon"><i class="fas fa-building"></i></div>' +
                '<div class="dept-card-name">' + escapeHtml(d.name) + '</div>' +
                '<div class="dept-card-manager">' + (d.manager ? escapeHtml(d.manager) : '') + '</div>' +
                '<div class="dept-card-counts">' +
                '<div class="dept-card-count"><i class="fas fa-user-tie"></i> ' + Number(d.employee_count || 0) + ' ' + t('employees') + '</div>' +
                '<div class="dept-card-count"><i class="fas fa-tools"></i> ' + Number(d.item_count || 0) + ' ' + t('items') + '</div>' +
                '</div>';
            grid.appendChild(card);
        });
    } catch (e) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' + t('failedLoad') + '</div>'; }
}

async function addDepartment() {
    var name = document.getElementById('newDeptName').value.trim();
    if (!name) return;
    try {
        await API.createDepartment({
            name: name,
            manager: document.getElementById('newDeptManager').value.trim(),
            description: document.getElementById('newDeptDesc').value.trim()
        });
        document.getElementById('addDeptModal').classList.remove('active');
        renderDepartments();
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}
function saveNewDept() { addDepartment(); }

async function deleteDept(id) {
    if (!confirm(t('deleteConfirm'))) return;
    try {
        await API.deleteDepartment(id);
        renderDepartments();
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ Employees ============
async function renderEmployees() {
    var grid = document.getElementById('empGrid');
    try {
        var employees = await API.getEmployees();
        grid.innerHTML = '';
        if (employees.length === 0) {
            grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-user-tie"></i><p>' + t('noEmployees') + '</p></div>';
            return;
        }
        employees.forEach(function(emp) {
            var card = document.createElement('div');
            card.className = 'emp-card';
            card.onclick = function() { currentEmpId = emp.id; navigateTo('emp-detail'); };
            card.innerHTML = '<button class="btn-icon emp-card-delete" onclick="event.stopPropagation();deleteEmployee(' + emp.id + ')"><i class="fas fa-trash-alt" style="color:var(--danger)"></i></button>' +
                '<div class="emp-card-top">' +
                '<div class="emp-avatar">' + (emp.photo ? '<img src="' + escapeHtml(emp.photo) + '" onerror="this.parentElement.innerHTML=\'<i class=\\\'fas fa-user\\\'></i>\'">' : '<i class="fas fa-user"></i>') + '</div>' +
                '<div>' +
                '<div class="emp-card-name">' + escapeHtml(emp.name) + '</div>' +
                '<div class="emp-card-title">' + escapeHtml(emp.job_title || '') + '</div>' +
                (emp.department_name ? '<div class="emp-card-dept" onclick="event.stopPropagation();currentDeptId=' + (emp.department_id || 0) + ';navigateTo(\'dept-detail\')"><i class="fas fa-building"></i> ' + escapeHtml(emp.department_name) + '</div>' : '') +
                '</div></div>' +
                '<div class="emp-card-footer">' +
                '<div class="emp-card-stat"><i class="fas fa-tools"></i> ' + Number(emp.item_count || 0) + ' ' + t('items') + '</div>' +
                '<label class="btn-icon" style="cursor:pointer" onclick="event.stopPropagation()"><i class="fas fa-camera" style="font-size:12px"></i><input type="file" accept="image/*" style="display:none" onchange="uploadEmpPhoto(' + emp.id + ',this.files[0])"></label>' +
                '</div>';
            grid.appendChild(card);
        });
    } catch (e) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' + t('failedLoad') + '</div>'; }
}

async function openAddEmpModal() {
    document.getElementById('newEmpName').value = '';
    document.getElementById('newEmpTitle').value = '';
    var select = document.getElementById('newEmpDept');
    select.innerHTML = '<option value="">--</option>';
    try {
        var depts = await API.getDepartments();
        depts.forEach(function(d) {
            select.innerHTML += '<option value="' + d.id + '">' + escapeHtml(d.name) + '</option>';
        });
    } catch (e) { /* ignore */ }
    document.getElementById('addEmpModal').classList.add('active');
}

async function addEmployee() {
    var name = document.getElementById('newEmpName').value.trim();
    if (!name) return;
    try {
        await API.createEmployee({
            name: name,
            job_title: document.getElementById('newEmpTitle').value.trim(),
            department_id: document.getElementById('newEmpDept').value || null
        });
        document.getElementById('addEmpModal').classList.remove('active');
        renderEmployees();
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}
function saveNewEmployee() { addEmployee(); }

async function deleteEmployee(id) {
    if (!confirm(t('deleteConfirm'))) return;
    try {
        await API.deleteEmployee(id);
        renderEmployees();
    } catch (e) { showToast(e.message, 'error'); }
}

async function uploadEmpPhoto(id, file) {
    if (!file) return;
    try {
        await API.uploadEmployeePhoto(id, file);
        renderEmployees();
        showToast(t('imageUploaded'));
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ Department Detail Page ============
async function renderDeptDetail() {
    var header = document.getElementById('deptDetailHeader');
    if (!currentDeptId) return;

    try {
        currentDeptData = await API.getDepartment(currentDeptId);
        var dept = currentDeptData;

        // Render header
        var nameEl = header.querySelector('.dept-detail-name');
        if (nameEl) nameEl.textContent = dept.name;
        var imgEl = header.querySelector('.dept-detail-image');
        if (imgEl) {
            imgEl.innerHTML = dept.image
                ? '<img src="' + escapeHtml(dept.image) + '" onclick="openImageViewer(\'' + escapeHtml(dept.image) + '\')" style="cursor:pointer">'
                : '<i class="fas fa-building" style="font-size:32px;color:var(--text-muted)"></i>';
        }

        // Reset to equipment tab
        document.querySelectorAll('.dept-dtab').forEach(function(b, i) { b.classList.toggle('active', i === 0); });
        document.querySelectorAll('.dept-dtab-content').forEach(function(c, i) { c.classList.toggle('active', i === 0); });

        await renderEquipmentTab();
        await renderHistoryTab();
        await renderItemsTab();

    } catch (e) {
        showToast(t('failedLoad'), 'error');
    }
}

function switchDeptDetailTab(tabName) {
    document.querySelectorAll('.dept-dtab').forEach(function(b) { b.classList.remove('active'); });
    document.getElementById('deptEquipmentTab').classList.toggle('active', tabName === 'equipment');
    document.getElementById('deptHistoryTab').classList.toggle('active', tabName === 'history');
    document.getElementById('deptItemsTab').classList.toggle('active', tabName === 'items');

    if (tabName === 'equipment') document.getElementById('tabEquipment').classList.add('active');
    else if (tabName === 'history') document.getElementById('tabHistory').classList.add('active');
    else if (tabName === 'items') document.getElementById('tabItems').classList.add('active');
}

async function renderEquipmentTab() {
    var dept = currentDeptData;
    var items = dept.items || [];
    var tbody = document.querySelector('#equipmentTable tbody');
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state" style="padding:14px">' + t('noItems') + '</td></tr>';
    } else {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var statusLabel = item.covenant_status || t('active');
            var statusCls = 'active';
            if (statusLabel === 'returned' || statusLabel === t('returned')) statusCls = 'returned';
            else if (statusLabel === 'transferred' || statusLabel === t('transferred')) statusCls = 'transferred';
            else if (statusLabel === 'ended' || statusLabel === t('ended')) statusCls = 'ended';

            tbody.innerHTML += '<tr>' +
                '<td><span class="history-status-badge ' + statusCls + '">' + escapeHtml(statusLabel) + '</span></td>' +
                '<td><input type="number" class="stock-input" min="1" value="' + Number(item.qty) + '" style="width:60px" onchange="updateDeptItemInline(' + item.id + ',{qty:parseInt(this.value)})"></td>' +
                '<td><div class="item-name-cell">' +
                (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-thumb" onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" style="cursor:pointer" onerror="this.style.display=\'none\'">' : '<i class="fas fa-image" style="color:var(--text-muted)"></i>') +
                '<label class="btn-icon" style="cursor:pointer"><i class="fas fa-upload" style="font-size:10px"></i><input type="file" accept="image/*" style="display:none" onchange="uploadDeptItemImg(' + item.id + ',this.files[0])"></label>' +
                '</div></td>' +
                '<td><input type="text" class="stock-input" value="' + escapeHtml(item.name || '') + '" onchange="updateDeptItemInline(' + item.id + ',{name:this.value})">' +
                (item.description ? '<div style="font-size:11px;color:var(--text-muted)">' + escapeHtml(item.description) + '</div>' : '') + '</td>' +
                '<td><input type="date" class="stock-input" value="' + escapeHtml(item.receipt_date || '') + '" onchange="updateDeptItemInline(' + item.id + ',{receipt_date:this.value})"></td>' +
                '<td><input type="text" class="stock-input" value="' + escapeHtml(item.purpose || '') + '" onchange="updateDeptItemInline(' + item.id + ',{purpose:this.value})"></td>' +
                '<td class="item-actions">' +
                '<button class="btn-icon" onclick="openCovenantModal({id:' + item.id + ',name:\'' + escapeHtml(item.name || '').replace(/'/g, "\\'") + '\'})" title="' + t('covenantHistory') + '"><i class="fas fa-exchange-alt"></i></button>' +
                '<button class="btn-icon delete" onclick="deleteDeptItem(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '</td></tr>';
        }
    }

    // Populate employee dropdown in equipment add bar
    // (we leave it as-is since the HTML already has the inputs)
}

async function renderHistoryTab() {
    var dept = currentDeptData;
    var timeline = document.getElementById('deptHistoryTimeline');
    var history = dept.history || [];

    // Populate employee dropdown
    var empSelect = document.getElementById('historyEmpSelect');
    empSelect.innerHTML = '<option value="">' + t('responsibleEmployee') + '</option>';
    try {
        var allEmps = await API.getEmployees();
        allEmps.forEach(function(e) {
            empSelect.innerHTML += '<option value="' + e.id + '">' + escapeHtml(e.name) + '</option>';
        });
    } catch (e) { /* ignore */ }

    timeline.innerHTML = '';
    if (history.length === 0) {
        timeline.innerHTML = '<div class="empty-state" style="padding:14px"><p>' + t('noItems') + '</p></div>';
    } else {
        history.forEach(function(h) {
            var entry = document.createElement('div');
            entry.className = 'history-entry status-' + h.status;
            entry.innerHTML = '<div class="history-entry-actions">' +
                '<button class="btn-icon" onclick="toggleHistoryStatus(' + h.id + ',\'' + h.status + '\')" title="Toggle status"><i class="fas fa-sync-alt" style="font-size:11px"></i></button>' +
                '<button class="btn-icon" onclick="deleteHistory(' + h.id + ')" title="' + t('delete') + '"><i class="fas fa-trash-alt" style="font-size:11px;color:var(--danger)"></i></button>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:10px">' +
                (h.employee_photo ? '<img src="' + escapeHtml(h.employee_photo) + '" style="width:32px;height:32px;border-radius:8px;object-fit:cover">' : '') +
                '<div>' +
                '<div class="history-entry-name" onclick="currentEmpId=' + (h.employee_id || 0) + ';navigateTo(\'emp-detail\')" style="cursor:pointer">' + escapeHtml(h.employee_name || 'Unknown') + '</div>' +
                '<div class="history-entry-title">' + escapeHtml(h.job_title || '') + '</div>' +
                '</div></div>' +
                '<div class="history-entry-dates">' +
                '<i class="fas fa-calendar" style="font-size:11px"></i> ' + (h.start_date || '') + (h.end_date ? ' &rarr; ' + h.end_date : ' &rarr; present') +
                ' <span class="history-status-badge ' + h.status + '">' + h.status + '</span>' +
                '</div>';
            timeline.appendChild(entry);
        });
    }
}

async function renderItemsTab() {
    var dept = currentDeptData;
    var items = dept.items || [];
    var container = document.getElementById('deptItemsContainer');
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-tools"></i><p>' + t('noItems') + '</p></div>';
        return;
    }

    items.forEach(function(item) {
        var card = document.createElement('div');
        card.className = 'dept-item-card';
        card.innerHTML = '<button class="btn-icon dept-item-card-delete" onclick="deleteDeptItem(' + item.id + ')"><i class="fas fa-times" style="color:var(--danger);font-size:12px"></i></button>' +
            '<div class="dept-item-card-img"' + (item.image ? ' onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" style="cursor:pointer"' : '') + '>' +
            (item.image ? '<img src="' + escapeHtml(item.image) + '">' : '<i class="fas fa-tools"></i>') +
            '</div>' +
            '<div class="dept-item-card-body">' +
            '<div class="dept-item-card-name">' + escapeHtml(item.name) + '</div>' +
            (item.description ? '<div class="dept-item-card-desc">' + escapeHtml(item.description) + '</div>' : '') +
            '<div class="dept-item-card-footer">' +
            '<div class="dept-item-card-qty">x' + Number(item.qty) + '</div>' +
            (item.employee_name ? '<div class="dept-item-card-assignee" onclick="if(' + (item.employee_id || 0) + '){currentEmpId=' + (item.employee_id || 0) + ';navigateTo(\'emp-detail\')}" style="cursor:pointer"><i class="fas fa-user"></i> ' + escapeHtml(item.employee_name) + '</div>' : '') +
            '</div>' +
            (item.receipt_date ? '<div style="font-size:11px;color:var(--text-muted);margin-top:4px"><i class="fas fa-calendar"></i> ' + escapeHtml(item.receipt_date) + '</div>' : '') +
            (item.purpose ? '<div style="font-size:11px;color:var(--text-muted)"><i class="fas fa-tag"></i> ' + escapeHtml(item.purpose) + '</div>' : '') +
            '<button class="btn-icon" onclick="event.stopPropagation();openCovenantModal({id:' + item.id + ',name:\'' + escapeHtml(item.name || '').replace(/'/g, "\\'") + '\'})" title="' + t('covenantHistory') + '" style="margin-top:4px"><i class="fas fa-exchange-alt" style="font-size:11px"></i> <span style="font-size:11px">' + t('covenantHistory') + '</span></button>' +
            '</div>';
        container.appendChild(card);
    });
}

async function addEquipment() {
    var name = document.getElementById('newEquipName').value.trim();
    if (!name) return;
    try {
        var newItem = await API.addDeptItem(currentDeptId, {
            name: name,
            qty: parseInt(document.getElementById('newEquipQty').value) || 1,
            description: document.getElementById('newEquipDesc').value.trim(),
            purpose: document.getElementById('newEquipPurpose').value.trim()
        });
        var fileInput = document.getElementById('newEquipFile');
        if (fileInput.files[0]) await API.uploadDeptItemImage(newItem.id, fileInput.files[0]);
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderEquipmentTab();
        await renderItemsTab();
        showToast(t('added'));
        document.getElementById('newEquipName').value = '';
        document.getElementById('newEquipQty').value = '1';
        document.getElementById('newEquipDesc').value = '';
        document.getElementById('newEquipPurpose').value = '';
        fileInput.value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function updateDeptItemInline(id, data) {
    try {
        await API.updateDeptItem(id, data);
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderEquipmentTab();
    } catch (e) { showToast(e.message, 'error'); }
}

async function addDeptItem() {
    var name = document.getElementById('newDeptItemName').value.trim();
    if (!name) return;
    try {
        var newItem = await API.addDeptItem(currentDeptId, {
            name: name,
            description: document.getElementById('newDeptItemDesc').value.trim(),
            qty: parseInt(document.getElementById('newDeptItemQty').value) || 1
        });
        var fileInput = document.getElementById('newDeptItemFile');
        if (fileInput.files[0]) await API.uploadDeptItemImage(newItem.id, fileInput.files[0]);
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderEquipmentTab();
        await renderItemsTab();
        showToast(t('added'));
        document.getElementById('newDeptItemName').value = '';
        document.getElementById('newDeptItemDesc').value = '';
        document.getElementById('newDeptItemQty').value = '1';
        fileInput.value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function deleteDeptItem(id) {
    try {
        await API.deleteDeptItem(id);
        if (currentDeptId && currentPage === 'dept-detail') {
            currentDeptData = await API.getDepartment(currentDeptId);
            await renderEquipmentTab();
            await renderItemsTab();
        }
        if (currentEmpId && currentPage === 'emp-detail') {
            await renderEmpDetail();
        }
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function uploadDeptItemImg(id, file) {
    if (!file) return;
    try {
        await API.uploadDeptItemImage(id, file);
        if (currentDeptId) {
            currentDeptData = await API.getDepartment(currentDeptId);
            await renderEquipmentTab();
            await renderItemsTab();
        }
        showToast(t('imageUploaded'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function addHistory() {
    var empId = document.getElementById('historyEmpSelect').value;
    var start = document.getElementById('historyStartDate').value;
    if (!empId || !start) { showToast('Select employee and start date', 'error'); return; }
    try {
        await API.addDeptHistory(currentDeptId, {
            employee_id: parseInt(empId),
            start_date: start,
            end_date: document.getElementById('historyEndDate').value || '',
            status: document.getElementById('historyStatus').value,
            notes: document.getElementById('historyNotes').value.trim()
        });
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderHistoryTab();
        showToast(t('added'));
        document.getElementById('historyStartDate').value = '';
        document.getElementById('historyEndDate').value = '';
        document.getElementById('historyNotes').value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function toggleHistoryStatus(id, current) {
    var next = current === 'active' ? 'paused' : current === 'paused' ? 'ended' : 'active';
    try {
        await API.updateDeptHistory(id, { status: next });
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderHistoryTab();
    } catch (e) { showToast(e.message, 'error'); }
}

async function deleteHistory(id) {
    try {
        await API.deleteDeptHistory(id);
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderHistoryTab();
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function updateDeptHistory(id, data) {
    try {
        await API.updateDeptHistory(id, data);
        currentDeptData = await API.getDepartment(currentDeptId);
        await renderHistoryTab();
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ Covenant History Modal ============
async function openCovenantModal(item) {
    currentCovenantItemId = item.id;
    document.getElementById('covenantItemName').textContent = ' - ' + (item.name || '');

    var timeline = document.getElementById('covenantTimeline');
    timeline.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>';
    document.getElementById('covenantModal').classList.add('active');

    // Populate employee dropdown
    var transferSelect = document.getElementById('covenantTransferTo');
    transferSelect.innerHTML = '<option value="">' + t('responsibleEmployee') + '</option>';
    try {
        var allEmps = await API.getEmployees();
        allEmps.forEach(function(e) {
            transferSelect.innerHTML += '<option value="' + e.id + '">' + escapeHtml(e.name) + '</option>';
        });
    } catch (e) { /* ignore */ }

    // Load covenant history
    try {
        var history = await API.getCovenantHistory(item.id);
        timeline.innerHTML = '';
        if (!history || history.length === 0) {
            timeline.innerHTML = '<div class="empty-state" style="padding:14px"><p>' + t('noItems') + '</p></div>';
        } else {
            history.forEach(function(h) {
                var entry = document.createElement('div');
                entry.className = 'history-entry status-' + (h.status || 'active');
                entry.innerHTML = '<div class="history-entry-actions">' +
                    '<button class="btn-icon" onclick="deleteCovenantEntry(' + h.id + ')"><i class="fas fa-trash-alt" style="font-size:11px;color:var(--danger)"></i></button>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:10px">' +
                    (h.employee_photo ? '<img src="' + escapeHtml(h.employee_photo) + '" style="width:32px;height:32px;border-radius:8px;object-fit:cover">' : '') +
                    '<div>' +
                    '<div class="history-entry-name">' + escapeHtml(h.employee_name || 'Unknown') + '</div>' +
                    '<div class="history-entry-title">' + escapeHtml(h.job_title || '') + '</div>' +
                    '</div></div>' +
                    '<div class="history-entry-dates">' +
                    '<i class="fas fa-calendar" style="font-size:11px"></i> ' + (h.start_date || h.transfer_date || '') + (h.end_date ? ' &rarr; ' + h.end_date : '') +
                    ' <span class="history-status-badge ' + (h.status || 'active') + '">' + (h.status || 'active') + '</span>' +
                    '</div>' +
                    (h.notes ? '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">' + escapeHtml(h.notes) + '</div>' : '');
                timeline.appendChild(entry);
            });
        }
    } catch (e) {
        timeline.innerHTML = '<div class="empty-state"><p>' + t('failedLoad') + '</p></div>';
    }

    // Set default transfer date
    document.getElementById('covenantTransferDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('covenantTransferNotes').value = '';
}

async function transferCovenant() {
    var empId = document.getElementById('covenantTransferTo').value;
    var date = document.getElementById('covenantTransferDate').value;
    if (!empId) { showToast(t('responsibleEmployee'), 'error'); return; }
    try {
        await API.addCovenantHistory(currentCovenantItemId, {
            employee_id: parseInt(empId),
            transfer_date: date,
            status: 'transferred',
            notes: document.getElementById('covenantTransferNotes').value.trim()
        });
        // Refresh modal
        var itemName = document.getElementById('covenantItemName').textContent.replace(' - ', '');
        await openCovenantModal({ id: currentCovenantItemId, name: itemName });
        showToast(t('added'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function addCovenant(itemId) {
    // alias
    await transferCovenant();
}

async function deleteCovenantEntry(id) {
    try {
        await API.deleteCovenantHistory(id);
        var itemName = document.getElementById('covenantItemName').textContent.replace(' - ', '');
        await openCovenantModal({ id: currentCovenantItemId, name: itemName });
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

// ============ Employee Detail Page ============
async function renderEmpDetail() {
    if (!currentEmpId) return;

    try {
        currentEmpData = await API.getEmployee(currentEmpId);
        var emp = currentEmpData;

        // Header
        var header = document.getElementById('empDetailHeader');
        var avatarEl = header.querySelector('.emp-detail-avatar');
        if (avatarEl) {
            avatarEl.innerHTML = (emp.photo ? '<img src="' + escapeHtml(emp.photo) + '" onclick="openImageViewer(\'' + escapeHtml(emp.photo) + '\')" style="cursor:pointer">' : '<i class="fas fa-user" style="font-size:40px;color:var(--text-muted)"></i>') +
                '<label class="btn-icon emp-avatar-upload" style="cursor:pointer;position:absolute;bottom:0;right:0"><i class="fas fa-camera" style="font-size:12px"></i><input type="file" accept="image/*" style="display:none" onchange="uploadEmployeePhoto(' + emp.id + ',this.files[0])"></label>';
        }
        var nameEl = header.querySelector('.emp-detail-name');
        if (nameEl) nameEl.textContent = emp.name;
        var titleEl = header.querySelector('.emp-detail-title');
        if (titleEl) titleEl.textContent = emp.job_title || '';
        var deptLink = header.querySelector('.emp-detail-dept-link');
        if (deptLink) {
            if (emp.department_name) {
                deptLink.innerHTML = '<i class="fas fa-building"></i> ' + escapeHtml(emp.department_name);
                deptLink.onclick = function() { currentDeptId = emp.department_id; navigateTo('dept-detail'); };
                deptLink.style.cursor = 'pointer';
            } else {
                deptLink.innerHTML = '<i class="fas fa-building"></i> --';
                deptLink.onclick = null;
                deptLink.style.cursor = 'default';
            }
        }

        // Items table
        await renderEmpItems();

    } catch (e) { showToast(t('failedLoad'), 'error'); }
}

async function renderEmpItems() {
    var emp = currentEmpData;
    var empItems = emp.items || [];
    var tbody = document.querySelector('#empItemsTable tbody');
    tbody.innerHTML = '';

    if (empItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="empty-state" style="padding:14px">' + t('noItems') + '</td></tr>';
    } else {
        empItems.forEach(function(item) {
            var statusLabel = item.covenant_status || item.status || t('active');
            var statusCls = 'active';
            if (statusLabel === 'returned') statusCls = 'returned';
            else if (statusLabel === 'transferred') statusCls = 'transferred';
            else if (statusLabel === 'ended') statusCls = 'ended';
            else if (statusLabel === 'paused') statusCls = 'paused';

            // Calculate duration
            var duration = '';
            if (item.receipt_date || item.start_date) {
                var start = new Date(item.receipt_date || item.start_date);
                var now = new Date();
                var days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
                duration = days + ' days';
            }

            tbody.innerHTML += '<tr>' +
                '<td><input type="text" class="stock-input" value="' + escapeHtml(item.name || '') + '" onchange="updateEmpItemInline(' + item.id + ',{name:this.value})"></td>' +
                '<td><div class="item-name-cell">' +
                (item.image ? '<img src="' + escapeHtml(item.image) + '" class="item-thumb" onclick="openImageViewer(\'' + escapeHtml(item.image) + '\')" style="cursor:pointer" onerror="this.style.display=\'none\'">' : '<i class="fas fa-image" style="color:var(--text-muted)"></i>') +
                '<label class="btn-icon" style="cursor:pointer"><i class="fas fa-upload" style="font-size:10px"></i><input type="file" accept="image/*" style="display:none" onchange="uploadDeptItemImg(' + item.id + ',this.files[0])"></label>' +
                '</div></td>' +
                '<td><input type="number" class="stock-input" min="1" value="' + Number(item.qty) + '" style="width:60px" onchange="updateEmpItemInline(' + item.id + ',{qty:parseInt(this.value)})"></td>' +
                '<td>' + escapeHtml(item.department_name || '') + '</td>' +
                '<td><input type="date" class="stock-input" value="' + escapeHtml(item.receipt_date || '') + '" onchange="updateEmpItemInline(' + item.id + ',{receipt_date:this.value})"></td>' +
                '<td><input type="text" class="stock-input" value="' + escapeHtml(item.purpose || '') + '" onchange="updateEmpItemInline(' + item.id + ',{purpose:this.value})"></td>' +
                '<td>' + duration + '</td>' +
                '<td><span class="history-status-badge ' + statusCls + '">' + escapeHtml(statusLabel) + '</span></td>' +
                '<td><button class="btn-icon" onclick="openCovenantModal({id:' + item.id + ',name:\'' + escapeHtml(item.name || '').replace(/'/g, "\\'") + '\'})" title="' + t('covenantHistory') + '"><i class="fas fa-exchange-alt" style="font-size:11px"></i></button></td>' +
                '<td class="item-actions">' +
                '<button class="btn-icon delete" onclick="deleteEmpItem(' + item.id + ')"><i class="fas fa-trash-alt"></i></button>' +
                '</td></tr>';
        });
    }
}

async function updateEmpItemInline(id, data) {
    try {
        await API.updateDeptItem(id, data);
        currentEmpData = await API.getEmployee(currentEmpId);
        await renderEmpItems();
    } catch (e) { showToast(e.message, 'error'); }
}

async function addEmpItem() {
    var name = document.getElementById('newEmpItemName').value.trim();
    if (!name) return;
    try {
        var newItem = await API.addEmployeeItem(currentEmpId, {
            name: name,
            description: document.getElementById('newEmpItemDesc').value.trim(),
            qty: parseInt(document.getElementById('newEmpItemQty').value) || 1,
            purpose: document.getElementById('newEmpItemPurpose').value.trim()
        });
        var fileInput = document.getElementById('newEmpItemFile');
        if (fileInput && fileInput.files[0] && newItem && newItem.id) {
            await API.uploadDeptItemImage(newItem.id, fileInput.files[0]);
        }
        currentEmpData = await API.getEmployee(currentEmpId);
        await renderEmpItems();
        showToast(t('added'));
        document.getElementById('newEmpItemName').value = '';
        document.getElementById('newEmpItemQty').value = '1';
        document.getElementById('newEmpItemDesc').value = '';
        document.getElementById('newEmpItemPurpose').value = '';
        if (fileInput) fileInput.value = '';
    } catch (e) { showToast(e.message, 'error'); }
}

async function deleteEmpItem(id) {
    try {
        await API.deleteDeptItem(id);
        currentEmpData = await API.getEmployee(currentEmpId);
        await renderEmpItems();
        showToast(t('itemRemoved'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function uploadEmployeePhoto(id, file) {
    if (!file) return;
    try {
        await API.uploadEmployeePhoto(id, file);
        currentEmpData = await API.getEmployee(currentEmpId);
        await renderEmpDetail();
        showToast(t('imageUploaded'));
    } catch (e) { showToast(e.message, 'error'); }
}

async function renderEmpHistory() {
    // Employee history is rendered as part of renderEmpDetail
    // This can be extended if needed
}

// ============ Modal Overlay Clicks ============
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            if (overlay.id === 'lockerModal') { currentLockerId = null; currentLockerData = null; highlightItemId = null; renderGrid(); }
            if (overlay.id === 'areaItemsModal') { currentAreaId = null; }
            if (overlay.id === 'covenantModal') { currentCovenantItemId = null; }
        }
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function(m) { m.classList.remove('active'); });
        closeImageViewer();
        if (currentLockerId) { currentLockerId = null; currentLockerData = null; highlightItemId = null; renderGrid(); }
        currentAreaId = null;
        currentCovenantItemId = null;
    }
});

// File input feedback
var newItemFile = document.getElementById('newItemFile');
if (newItemFile) {
    newItemFile.addEventListener('change', function() {
        if (this.files[0]) showToast('Image selected: ' + this.files[0].name, 'info');
    });
}

// ============ Init ============
applyTheme();
applyLanguage();
loadHomeCounts();
