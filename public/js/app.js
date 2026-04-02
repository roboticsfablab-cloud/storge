// ============ i18n ============
const i18n = {
    en: {
        appTitle:'Locker Cabinet Manager', homeSubtitle:'Manage your storage, warehouse, and departments',
        lockers:'Lockers', lockersDesc:'Manage locker cabinets and inventory items',
        warehouse:'Warehouse', warehouseDesc:'Manage warehouse zones and bulk storage',
        departments:'Departments', departmentsDesc:'Assign lockers and manage team responsibilities',
        addLocker:'Add Locker', addZone:'Add Zone', addDepartment:'Add Department',
        searchPlaceholder:'Search items and lockers...', totalLockers:'Total Lockers',
        totalItems:'Total Items', totalStock:'Total Stock', alerts:'Alerts',
        loading:'Loading...', noLockers:'No lockers yet.', items:'items', pcs:'pcs',
        locker:'Locker', itemName:'Item Name', description:'Description', stock:'Stock',
        minStock:'Min', status:'Status', actions:'Actions',
        noItems:'No items in this locker yet.', addFirstItem:'Add your first item below.',
        itemNamePlaceholder:'Item name...', qty:'Qty', descriptionPlaceholder:'Description (optional)',
        add:'Add', addNewLocker:'Add New Locker', lockerNumber:'Locker Number',
        lockerNameOptional:'Locker Name (optional)', cancel:'Cancel',
        lowStockAlerts:'Low Stock Alerts', allHealthy:'All stock levels are healthy!',
        outOfStock:'Out of Stock', lowStock:'Low Stock', inStock:'In Stock',
        itemRemoved:'Item removed', imageUploaded:'Image uploaded',
        lockerNameUpdated:'Locker name updated', added:'Added', toLocker:'to locker',
        lockerAdded:'Locker added', lockerDeleted:'Locker deleted',
        deleteConfirm:'Delete this? All items inside will be removed.',
        enterLockerName:'Enter locker name:', left:'left', min:'min', inStockLabel:'in stock',
        noResults:'No results found', searchLockers:'Lockers', searchItems:'Items',
        allItems:'All Items', assignedLockers:'Assigned Lockers',
        availableLockers:'Available Lockers', zoneName:'Zone Name', location:'Location',
        deptName:'Department Name', manager:'Manager', assign:'Assign', unassign:'Remove',
        noZones:'No warehouse zones yet.', noDepts:'No departments yet.',
        failedLoad:'Failed to load. Is the server running?',
        itemsRunningLow:'{count} item(s) in {lockers} locker(s) running low!',
    },
    ar: {
        appTitle:'مدير خزائن التخزين', homeSubtitle:'إدارة التخزين والمستودعات والأقسام',
        lockers:'الخزائن', lockersDesc:'إدارة خزائن التخزين وعناصر المخزون',
        warehouse:'المستودع', warehouseDesc:'إدارة مناطق المستودع والتخزين',
        departments:'الأقسام', departmentsDesc:'تعيين الخزائن وإدارة مسؤوليات الفريق',
        addLocker:'إضافة خزانة', addZone:'إضافة منطقة', addDepartment:'إضافة قسم',
        searchPlaceholder:'البحث في العناصر والخزائن...',
        totalLockers:'إجمالي الخزائن', totalItems:'إجمالي العناصر',
        totalStock:'إجمالي المخزون', alerts:'التنبيهات',
        loading:'جاري التحميل...', noLockers:'لا توجد خزائن بعد.',
        items:'عناصر', pcs:'قطعة', locker:'خزانة',
        itemName:'اسم العنصر', description:'الوصف', stock:'المخزون',
        minStock:'الحد الأدنى', status:'الحالة', actions:'الإجراءات',
        noItems:'لا توجد عناصر في هذه الخزانة.', addFirstItem:'أضف عنصرك الأول.',
        itemNamePlaceholder:'اسم العنصر...', qty:'الكمية',
        descriptionPlaceholder:'الوصف (اختياري)',
        add:'إضافة', addNewLocker:'إضافة خزانة جديدة', lockerNumber:'رقم الخزانة',
        lockerNameOptional:'اسم الخزانة (اختياري)', cancel:'إلغاء',
        lowStockAlerts:'تنبيهات المخزون المنخفض', allHealthy:'جميع مستويات المخزون جيدة!',
        outOfStock:'نفد المخزون', lowStock:'مخزون منخفض', inStock:'متوفر',
        itemRemoved:'تم حذف العنصر', imageUploaded:'تم رفع الصورة',
        lockerNameUpdated:'تم تحديث الاسم', added:'تمت إضافة', toLocker:'إلى الخزانة',
        lockerAdded:'تمت إضافة الخزانة', lockerDeleted:'تم حذف الخزانة',
        deleteConfirm:'حذف هذا؟ سيتم إزالة جميع العناصر بداخله.',
        enterLockerName:'أدخل الاسم:', left:'متبقي', min:'الحد الأدنى',
        inStockLabel:'في المخزون', noResults:'لم يتم العثور على نتائج',
        searchLockers:'الخزائن', searchItems:'العناصر',
        allItems:'جميع العناصر', assignedLockers:'الخزائن المعينة',
        availableLockers:'الخزائن المتاحة', zoneName:'اسم المنطقة', location:'الموقع',
        deptName:'اسم القسم', manager:'المدير', assign:'تعيين', unassign:'إزالة',
        noZones:'لا توجد مناطق مستودع بعد.', noDepts:'لا توجد أقسام بعد.',
        failedLoad:'فشل التحميل.',
        itemsRunningLow:'{count} عنصر في {lockers} خزانة بمخزون منخفض!',
    }
};

// ============ State ============
let currentPage = 'home';
let currentLockerId = null;
let currentLockerData = null;
let currentView = 'list';
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
let highlightItemId = null;
let currentZoneId = null;
let currentZoneData = null;
let currentDeptId = null;
let searchTimeout = null;

function t(k) { return (i18n[currentLang] && i18n[currentLang][k]) || i18n.en[k] || k; }
function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function showToast(msg, type='success') {
    let c = document.querySelector('.toast-container');
    if (!c) { c = document.createElement('div'); c.className='toast-container'; document.body.appendChild(c); }
    const t = document.createElement('div'); t.className=`toast toast-${type}`; t.textContent=msg;
    c.appendChild(t); setTimeout(()=>t.remove(), 3000);
}

// ============ Theme & Language ============
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById('themeIcon').className = currentTheme==='dark' ? 'fas fa-moon' : 'fas fa-sun';
}
function toggleTheme() { currentTheme = currentTheme==='dark'?'light':'dark'; localStorage.setItem('theme',currentTheme); applyTheme(); }

function applyLanguage() {
    const html = document.documentElement;
    html.lang = currentLang; html.dir = currentLang==='ar'?'rtl':'ltr';
    document.body.style.fontFamily = currentLang==='ar' ? "'Tajawal','Inter',sans-serif" : "'Inter',sans-serif";
    document.getElementById('langLabel').textContent = currentLang==='en'?'AR':'EN';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
}
function toggleLanguage() { currentLang = currentLang==='en'?'ar':'en'; localStorage.setItem('lang',currentLang); applyLanguage(); if(currentPage==='lockers') renderGrid(); }

// ============ Navigation ============
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-'+page).classList.add('active');
    currentPage = page;

    const backBtn = document.getElementById('backBtn');
    const searchBox = document.getElementById('searchBox');
    const alertBadge = document.getElementById('alertBadge');
    const addBtn = document.getElementById('addBtn');

    backBtn.style.display = page==='home'?'none':'';
    searchBox.style.display = page==='lockers'?'':'none';
    alertBadge.style.display = page==='lockers'?'':'none';
    addBtn.style.display = page==='home'?'none':'';

    if (page==='lockers') { document.getElementById('addBtnText').textContent=t('addLocker'); renderGrid(); }
    else if (page==='warehouse') { document.getElementById('addBtnText').textContent=t('addZone'); renderWarehouse(); }
    else if (page==='departments') { document.getElementById('addBtnText').textContent=t('addDepartment'); renderDepartments(); }
    else if (page==='home') { loadHomeCounts(); }
    applyLanguage();
}

function handleAddBtn() {
    if (currentPage==='lockers') openAddLockerModal();
    else if (currentPage==='warehouse') document.getElementById('addZoneModal').classList.add('active');
    else if (currentPage==='departments') document.getElementById('addDeptModal').classList.add('active');
}

async function loadHomeCounts() {
    try {
        const [lockers, zones, depts] = await Promise.all([API.getLockers(), API.getZones(), API.getDepartments()]);
        document.getElementById('homeLockerCount').textContent = lockers.length + ' ' + t('lockers');
        document.getElementById('homeWarehouseCount').textContent = zones.length + ' zones';
        document.getElementById('homeDeptCount').textContent = depts.length + ' ' + t('departments');
    } catch(e) {}
}

// ============ Image Viewer ============
function openImageViewer(src) {
    document.getElementById('imageViewerImg').src = src;
    document.getElementById('imageViewer').classList.add('active');
}
function closeImageViewer() { document.getElementById('imageViewer').classList.remove('active'); }

// ============ Search ============
function handleSearch(value) {
    clearTimeout(searchTimeout);
    const results = document.getElementById('searchResults');
    if (!value.trim()) { results.style.display='none'; return; }
    searchTimeout = setTimeout(async () => {
        try {
            const data = await API.search(value.trim());
            results.innerHTML = '';
            if (data.lockers.length===0 && data.items.length===0) {
                results.innerHTML = `<div class="search-empty">${t('noResults')}</div>`;
                results.style.display='block'; return;
            }
            if (data.lockers.length>0) {
                results.innerHTML += `<div class="search-section-title">${t('searchLockers')}</div>`;
                data.lockers.forEach(l => {
                    results.innerHTML += `<div class="search-item" onclick="document.getElementById('globalSearch').value='';document.getElementById('searchResults').style.display='none';openLockerModal(${l.id})"><i class="fas fa-box-open"></i><div><div class="search-item-name">${t('locker')} ${l.id}${l.name?' - '+escapeHtml(l.name):''}</div><div class="search-item-detail">${Number(l.item_count)} ${t('items')}</div></div></div>`;
                });
            }
            if (data.items.length>0) {
                results.innerHTML += `<div class="search-section-title">${t('searchItems')}</div>`;
                data.items.forEach(item => {
                    results.innerHTML += `<div class="search-item" onclick="document.getElementById('globalSearch').value='';document.getElementById('searchResults').style.display='none';highlightItemId=${item.id};openLockerModal(${item.locker_id})"><i class="fas fa-cube"></i><div><div class="search-item-name">${escapeHtml(item.name)}</div><div class="search-item-detail">${t('locker')} ${item.locker_id} · ${t('qty')}: ${Number(item.qty)}</div></div></div>`;
                });
            }
            results.style.display='block';
        } catch(e) { results.style.display='none'; }
    }, 300);
}
document.addEventListener('click', e => { if(!e.target.closest('.search-box')) document.getElementById('searchResults').style.display='none'; });

// ============ Status Helper ============
function getStatus(qty, minStock) {
    if (qty===0) return {cls:'status-out',qcls:'out',label:t('outOfStock'),icon:'<i class="fas fa-times-circle"></i>'};
    if (qty<=minStock) return {cls:'status-low',qcls:'low',label:t('lowStock'),icon:'<i class="fas fa-exclamation-triangle"></i>'};
    return {cls:'status-ok',qcls:'ok',label:t('inStock'),icon:'<i class="fas fa-check-circle"></i>'};
}

// ============ Lockers ============
function updateStats(lockers) {
    document.getElementById('statLockers').textContent = lockers.length;
    document.getElementById('statItems').textContent = lockers.reduce((s,l)=>s+Number(l.item_count),0);
    document.getElementById('statStock').textContent = lockers.reduce((s,l)=>s+Number(l.total_qty),0);
    document.getElementById('statAlerts').textContent = lockers.reduce((s,l)=>s+Number(l.low_stock_count),0);
}

async function renderGrid() {
    const grid = document.getElementById('lockerGrid');
    try {
        const lockers = await API.getLockers();
        grid.innerHTML=''; updateStats(lockers);
        if (lockers.length===0) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>${t('noLockers')}</p></div>`; updateAlertBadge(); return; }
        lockers.forEach(locker => {
            const hasAlert=Number(locker.low_stock_count)>0, ic=Number(locker.item_count), tq=Number(locker.total_qty);
            const card=document.createElement('div'); card.className='locker-card'+(hasAlert?' has-alert':'');
            card.onclick=()=>openLockerModal(locker.id);
            card.innerHTML=`<button class="btn-icon locker-delete-btn" onclick="event.stopPropagation();deleteLocker(${locker.id})"><i class="fas fa-trash-alt"></i></button>
                <div class="locker-visual"><div class="locker-door"><div class="locker-number">${locker.id}</div><div class="locker-handle"></div></div></div>
                <div class="locker-info"><div class="locker-name">${escapeHtml(locker.name||t('locker')+' '+locker.id)}</div>
                <div class="locker-stock-count"><i class="fas fa-box"></i> ${ic} ${t('items')} · ${tq} ${t('pcs')}</div>
                <div class="locker-progress"><div class="locker-progress-bar ${hasAlert?'bar-alert':'bar-ok'}" style="width:${ic>0?Math.min(100,Math.round(tq/(ic*5)*100)):100}%"></div></div></div>`;
            grid.appendChild(card);
        });
        updateAlertBadge();
    } catch(e) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><p>${t('failedLoad')}</p></div>`; }
}

async function updateAlertBadge() {
    try {
        const s = await API.getAlertSummary();
        const total=Number(s.total_alerts), lk=Number(s.lockers_affected);
        document.getElementById('alertCount').textContent=total;
        if (total>0) { document.getElementById('alertBanner').style.display='flex'; document.getElementById('alertText').textContent=t('itemsRunningLow').replace('{count}',total).replace('{lockers}',lk); }
        else document.getElementById('alertBanner').style.display='none';
    } catch(e) {}
}
function closeAlertBanner() { document.getElementById('alertBanner').style.display='none'; }

async function openLockerModal(id) {
    currentLockerId=id;
    try {
        currentLockerData = await API.getLocker(id);
        document.getElementById('modalLockerName').textContent = currentLockerData.name||t('locker')+' '+currentLockerData.id;
        renderItems();
        document.getElementById('lockerModal').classList.add('active');
    } catch(e) { showToast('Failed to load locker','error'); }
}
function closeLockerModal() { document.getElementById('lockerModal').classList.remove('active'); currentLockerId=null; currentLockerData=null; highlightItemId=null; renderGrid(); }

function switchView(v) {
    currentView=v;
    document.getElementById('listViewBtn').classList.toggle('active',v==='list');
    document.getElementById('gridViewBtn').classList.toggle('active',v==='grid');
    document.getElementById('listView').style.display=v==='list'?'':'none';
    document.getElementById('gridView').style.display=v==='grid'?'':'none';
    renderItems();
}

function renderItems() {
    if (!currentLockerData) return;
    const items=currentLockerData.items||[];
    const dir=currentLang==='ar'?'right':'left';

    // List view
    const tbody=document.getElementById('itemsTableBody'); tbody.innerHTML='';
    if (items.length===0) { tbody.innerHTML=`<tr><td colspan="6" class="empty-state"><i class="fas fa-box-open"></i><p>${t('noItems')}</p></td></tr>`; }
    else items.forEach(item => {
        const q=Number(item.qty), ms=Number(item.min_stock), status=getStatus(q,ms);
        const hl = highlightItemId==item.id ? ' highlighted':'';
        const tr=document.createElement('tr'); tr.className=hl;
        tr.innerHTML=`<td><div class="item-name-cell">
                ${item.image?`<img src="${escapeHtml(item.image)}" class="item-thumb" onclick="event.stopPropagation();openImageViewer('${escapeHtml(item.image)}')" onerror="this.style.display='none'">`:''}
                <input type="text" class="stock-input" style="width:130px;text-align:${dir}" value="${escapeHtml(item.name)}" onchange="updateItem(${item.id},{name:this.value})">
            </div></td>
            <td><input type="text" class="stock-input desc-input" style="text-align:${dir}" value="${escapeHtml(item.description||'')}" placeholder="${t('descriptionPlaceholder')}" onchange="updateItem(${item.id},{description:this.value})"></td>
            <td><input type="number" class="stock-input" min="0" value="${q}" onchange="updateItem(${item.id},{qty:parseInt(this.value)})"></td>
            <td><input type="number" class="stock-input" min="0" value="${ms}" style="width:60px" onchange="updateItem(${item.id},{min_stock:parseInt(this.value)})"></td>
            <td><span class="status-badge ${status.cls}">${status.icon} ${status.label}</span></td>
            <td class="item-actions">
                <button class="btn-icon" onclick="changeQty(${item.id},1)"><i class="fas fa-plus"></i></button>
                <button class="btn-icon" onclick="changeQty(${item.id},-1)"><i class="fas fa-minus"></i></button>
                <label class="btn-icon" style="cursor:pointer"><i class="fas fa-image"></i><input type="file" accept="image/*" style="display:none" onchange="uploadItemImage(${item.id},this.files[0])"></label>
                <button class="btn-icon delete" onclick="removeItem(${item.id})"><i class="fas fa-trash-alt"></i></button>
            </td>`;
        tbody.appendChild(tr);
    });

    // Grid view
    const grid=document.getElementById('itemsGrid'); grid.innerHTML='';
    if (items.length===0) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>${t('noItems')}</p></div>`; }
    else items.forEach(item => {
        const q=Number(item.qty), ms=Number(item.min_stock), status=getStatus(q,ms);
        const hl = highlightItemId==item.id ? ' highlighted':'';
        const card=document.createElement('div'); card.className='item-card'+hl;
        card.innerHTML=`<button class="btn-icon item-card-delete delete" onclick="removeItem(${item.id})"><i class="fas fa-times"></i></button>
            <div class="item-card-img" ${item.image?`onclick="openImageViewer('${escapeHtml(item.image)}')" style="cursor:pointer"`:''}>
                ${item.image?`<img src="${escapeHtml(item.image)}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-box\\'></i>'">`:'<i class="fas fa-box"></i>'}
            </div>
            <input type="text" class="item-card-edit" value="${escapeHtml(item.name)}" onchange="updateItem(${item.id},{name:this.value})">
            ${item.description?`<div class="item-card-desc">${escapeHtml(item.description)}</div>`:''}
            <div class="item-card-qty-row">
                <button class="btn-icon" onclick="changeQty(${item.id},-1)"><i class="fas fa-minus"></i></button>
                <span class="item-card-qty ${status.qcls}">${q}</span>
                <button class="btn-icon" onclick="changeQty(${item.id},1)"><i class="fas fa-plus"></i></button>
            </div>
            <div class="item-card-min">Min: <input type="number" value="${ms}" min="0" style="width:50px" class="stock-input" onchange="updateItem(${item.id},{min_stock:parseInt(this.value)})"></div>
            <div class="item-card-label">${status.label}</div>`;
        grid.appendChild(card);
    });

    if (highlightItemId) setTimeout(()=>{ highlightItemId=null; },3000);
}

// ============ Item CRUD ============
async function updateItem(id, data) {
    try {
        await API.updateItem(id, data);
        currentLockerData = await API.getLocker(currentLockerId);
        renderItems();
    } catch(e) { showToast(e.message,'error'); }
}

async function addItem() {
    const name=document.getElementById('newItemName').value.trim();
    if (!name) { document.getElementById('newItemName').focus(); return; }
    try {
        const newItem = await API.addItem(currentLockerId, {
            name, qty: Math.max(0,parseInt(document.getElementById('newItemQty').value)||0),
            min_stock: parseInt(document.getElementById('newItemMin').value)||5,
            description: document.getElementById('newItemDesc').value.trim()
        });
        const fileInput = document.getElementById('newItemFile');
        if (fileInput.files[0]) await API.uploadImage(newItem.id, fileInput.files[0]);
        currentLockerData = await API.getLocker(currentLockerId); renderItems();
        showToast(`${t('added')} "${name}"`);
        document.getElementById('newItemName').value=''; document.getElementById('newItemQty').value='1';
        document.getElementById('newItemMin').value='5'; document.getElementById('newItemDesc').value=''; fileInput.value='';
    } catch(e) { showToast(e.message,'error'); }
}

async function removeItem(id) {
    try { await API.deleteItem(id); currentLockerData=await API.getLocker(currentLockerId); renderItems(); showToast(t('itemRemoved')); }
    catch(e) { showToast(e.message,'error'); }
}
async function changeQty(id,delta) {
    try { await API.changeQty(id,delta); currentLockerData=await API.getLocker(currentLockerId); renderItems(); }
    catch(e) { showToast(e.message,'error'); }
}
async function uploadItemImage(id,file) {
    if (!file) return;
    try { await API.uploadImage(id,file); currentLockerData=await API.getLocker(currentLockerId); renderItems(); showToast(t('imageUploaded')); }
    catch(e) { showToast(e.message,'error'); }
}

async function editLockerName() {
    if (!currentLockerData) return;
    const n=prompt(t('enterLockerName'),currentLockerData.name||''); if(n===null)return;
    try { await API.updateLocker(currentLockerId,{name:n.trim()}); currentLockerData=await API.getLocker(currentLockerId); document.getElementById('modalLockerName').textContent=currentLockerData.name||t('locker')+' '+currentLockerData.id; showToast(t('lockerNameUpdated')); }
    catch(e) { showToast(e.message,'error'); }
}

function openAddLockerModal() { document.getElementById('newLockerNumber').value=''; document.getElementById('newLockerName').value=''; document.getElementById('addLockerModal').classList.add('active'); }
function closeAddLockerModal() { document.getElementById('addLockerModal').classList.remove('active'); }
async function addLocker() {
    const num=parseInt(document.getElementById('newLockerNumber').value); if(!num||num<1){document.getElementById('newLockerNumber').focus();return;}
    try { await API.createLocker({id:num,name:document.getElementById('newLockerName').value.trim()}); showToast(`${t('lockerAdded')} ${num}`); closeAddLockerModal(); renderGrid(); }
    catch(e) { showToast(e.message,'error'); }
}
async function deleteLocker(id) {
    if(!confirm(t('deleteConfirm')))return;
    try { await API.deleteLocker(id); showToast(`${t('lockerDeleted')} ${id}`); renderGrid(); }
    catch(e) { showToast(e.message,'error'); }
}

// ============ All Items Panel ============
async function showAllItems() {
    const body=document.getElementById('allItemsBody'); body.innerHTML='<tr><td colspan="5" class="loading"><i class="fas fa-spinner fa-spin"></i></td></tr>';
    document.getElementById('allItemsPanel').classList.add('active');
    try {
        const items = await API.getAllItems(); body.innerHTML='';
        items.forEach(item => {
            const q=Number(item.qty), ms=Number(item.min_stock), status=getStatus(q,ms);
            body.innerHTML+=`<tr onclick="document.getElementById('allItemsPanel').classList.remove('active');openLockerModal(${item.locker_id})" style="cursor:pointer">
                <td>${t('locker')} ${item.locker_id}${item.locker_name?' - '+escapeHtml(item.locker_name):''}</td>
                <td>${escapeHtml(item.name)}</td><td>${q}</td><td>${ms}</td>
                <td><span class="status-badge ${status.cls}">${status.icon} ${status.label}</span></td></tr>`;
        });
        if(items.length===0) body.innerHTML=`<tr><td colspan="5" class="empty-state">${t('noItems')}</td></tr>`;
    } catch(e) { body.innerHTML=`<tr><td colspan="5">${t('failedLoad')}</td></tr>`; }
}

// ============ Alerts Panel ============
function openAlertsPanel() { document.getElementById('alertBadge').click(); }
document.getElementById('alertBadge').onclick = async () => {
    const list=document.getElementById('alertsList');
    list.innerHTML='<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>';
    document.getElementById('alertsPanel').classList.add('active');
    try {
        const alerts=await API.getAlerts(); list.innerHTML='';
        if(alerts.length===0) { list.innerHTML=`<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>${t('allHealthy')}</p></div>`; return; }
        alerts.forEach(a => {
            const div=document.createElement('div'); div.className='alert-item';
            div.onclick=()=>{closeAlertsPanel();openLockerModal(a.locker_id);};
            div.innerHTML=`<i class="fas fa-exclamation-triangle"></i><div class="alert-item-text"><div class="alert-item-locker">${t('locker')} ${a.locker_id}${a.locker_name?' - '+escapeHtml(a.locker_name):''}</div><div class="alert-item-detail">${escapeHtml(a.item_name)}: ${Number(a.qty)} ${t('left')} (${t('min')}: ${Number(a.min_stock)})</div></div>`;
            list.appendChild(div);
        });
    } catch(e) { list.innerHTML=`<div class="empty-state">${t('failedLoad')}</div>`; }
};
function closeAlertsPanel() { document.getElementById('alertsPanel').classList.remove('active'); }

// ============ Warehouse ============
async function renderWarehouse() {
    const grid=document.getElementById('warehouseGrid');
    try {
        const zones=await API.getZones(); grid.innerHTML='';
        if(zones.length===0) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-warehouse"></i><p>${t('noZones')}</p></div>`; return; }
        zones.forEach(z => {
            const hasAlert=Number(z.low_stock_count)>0;
            const card=document.createElement('div'); card.className='locker-card'+(hasAlert?' has-alert':'');
            card.onclick=()=>openZoneModal(z.id);
            card.innerHTML=`<button class="btn-icon locker-delete-btn" onclick="event.stopPropagation();deleteZone(${z.id})"><i class="fas fa-trash-alt"></i></button>
                <div class="locker-visual"><div class="locker-door"><div class="locker-number" style="font-size:18px"><i class="fas fa-warehouse"></i></div><div class="locker-handle"></div></div></div>
                <div class="locker-info"><div class="locker-name">${escapeHtml(z.name)}</div>
                <div class="locker-stock-count"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(z.location||'')}</div>
                <div class="locker-stock-count"><i class="fas fa-box"></i> ${Number(z.item_count)} ${t('items')} · ${Number(z.total_qty)} ${t('pcs')}</div></div>`;
            grid.appendChild(card);
        });
    } catch(e) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1">${t('failedLoad')}</div>`; }
}

async function openZoneModal(id) {
    currentZoneId=id;
    try {
        currentZoneData=await API.getZone(id);
        document.getElementById('modalZoneName').textContent=currentZoneData.name;
        renderZoneItems();
        document.getElementById('zoneModal').classList.add('active');
    } catch(e) { showToast('Error','error'); }
}
function closeZoneModal() { document.getElementById('zoneModal').classList.remove('active'); currentZoneId=null; currentZoneData=null; renderWarehouse(); }

function renderZoneItems() {
    const tbody=document.getElementById('zoneItemsBody'); tbody.innerHTML='';
    const items=currentZoneData.items||[];
    if(items.length===0) { tbody.innerHTML=`<tr><td colspan="6" class="empty-state">${t('noItems')}</td></tr>`; return; }
    items.forEach(item => {
        const q=Number(item.qty),ms=Number(item.min_stock),status=getStatus(q,ms);
        tbody.innerHTML+=`<tr>
            <td><div class="item-name-cell">${item.image?`<img src="${escapeHtml(item.image)}" class="item-thumb" onclick="openImageViewer('${escapeHtml(item.image)}')" onerror="this.style.display='none'">`:''}
                <input type="text" class="stock-input" style="width:120px" value="${escapeHtml(item.name)}" onchange="updateZoneItem(${item.id},{name:this.value})"></div></td>
            <td><input type="text" class="stock-input desc-input" value="${escapeHtml(item.description||'')}" onchange="updateZoneItem(${item.id},{description:this.value})"></td>
            <td><input type="number" class="stock-input" min="0" value="${q}" onchange="updateZoneItem(${item.id},{qty:parseInt(this.value)})"></td>
            <td><input type="number" class="stock-input" min="0" value="${ms}" style="width:60px" onchange="updateZoneItem(${item.id},{min_stock:parseInt(this.value)})"></td>
            <td><span class="status-badge ${status.cls}">${status.icon} ${status.label}</span></td>
            <td class="item-actions"><button class="btn-icon delete" onclick="deleteZoneItem(${item.id})"><i class="fas fa-trash-alt"></i></button></td></tr>`;
    });
}

async function addZone() {
    const name=document.getElementById('newZoneName').value.trim(); if(!name)return;
    try { await API.createZone({name,location:document.getElementById('newZoneLocation').value.trim()}); document.getElementById('addZoneModal').classList.remove('active'); renderWarehouse(); showToast('Zone added'); }
    catch(e) { showToast(e.message,'error'); }
}
async function deleteZone(id) { if(!confirm(t('deleteConfirm')))return; try{await API.deleteZone(id);renderWarehouse();}catch(e){showToast(e.message,'error');} }

async function addZoneItem() {
    const name=document.getElementById('newZoneItemName').value.trim(); if(!name)return;
    try {
        await API.addZoneItem(currentZoneId,{name, qty:parseInt(document.getElementById('newZoneItemQty').value)||0, min_stock:parseInt(document.getElementById('newZoneItemMin').value)||5, description:document.getElementById('newZoneItemDesc').value.trim()});
        currentZoneData=await API.getZone(currentZoneId); renderZoneItems();
        document.getElementById('newZoneItemName').value=''; document.getElementById('newZoneItemQty').value='1'; document.getElementById('newZoneItemMin').value='5'; document.getElementById('newZoneItemDesc').value='';
    } catch(e) { showToast(e.message,'error'); }
}
async function updateZoneItem(id,data) { try{await API.updateZoneItem(id,data);currentZoneData=await API.getZone(currentZoneId);renderZoneItems();}catch(e){showToast(e.message,'error');} }
async function deleteZoneItem(id) { try{await API.deleteZoneItem(id);currentZoneData=await API.getZone(currentZoneId);renderZoneItems();}catch(e){showToast(e.message,'error');} }

// ============ Departments ============
async function renderDepartments() {
    const grid=document.getElementById('deptGrid');
    try {
        const depts=await API.getDepartments(); grid.innerHTML='';
        if(depts.length===0) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-users-cog"></i><p>${t('noDepts')}</p></div>`; return; }
        depts.forEach(d => {
            const card=document.createElement('div'); card.className='dept-card';
            card.onclick=()=>openDeptModal(d.id);
            card.innerHTML=`<button class="btn-icon locker-delete-btn" onclick="event.stopPropagation();deleteDept(${d.id})"><i class="fas fa-trash-alt"></i></button>
                <div class="dept-card-icon"><i class="fas fa-users"></i></div>
                <div class="dept-card-name">${escapeHtml(d.name)}</div>
                <div class="dept-card-manager">${d.manager?escapeHtml(d.manager):''}</div>
                <div class="dept-card-count">${Number(d.locker_count)} ${t('lockers')}</div>`;
            grid.appendChild(card);
        });
    } catch(e) { grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1">${t('failedLoad')}</div>`; }
}

async function openDeptModal(id) {
    currentDeptId=id;
    try {
        const dept=await API.getDepartment(id);
        document.getElementById('modalDeptName').textContent=dept.name;
        document.getElementById('deptManager').textContent=dept.manager?`${t('manager')}: ${dept.manager}`:'';
        const assigned=document.getElementById('assignedLockers'); assigned.innerHTML='';
        (dept.lockers||[]).forEach(l => {
            assigned.innerHTML+=`<div class="dept-locker-chip assigned"><span>${t('locker')} ${l.id}${l.name?' - '+escapeHtml(l.name):''}</span><button class="btn-icon" onclick="unassignLocker(${id},${l.id})"><i class="fas fa-times"></i></button></div>`;
        });
        if(dept.lockers.length===0) assigned.innerHTML=`<div class="empty-state" style="padding:10px">${t('noItems')}</div>`;
        const available=document.getElementById('availableLockers'); available.innerHTML='';
        (dept.available_lockers||[]).forEach(l => {
            available.innerHTML+=`<div class="dept-locker-chip available" onclick="assignLocker(${id},${l.id})"><span>${t('locker')} ${l.id}${l.name?' - '+escapeHtml(l.name):''}</span><i class="fas fa-plus"></i></div>`;
        });
        if(dept.available_lockers.length===0) available.innerHTML=`<div class="empty-state" style="padding:10px">—</div>`;
        document.getElementById('deptModal').classList.add('active');
    } catch(e) { showToast('Error','error'); }
}
function closeDeptModal() { document.getElementById('deptModal').classList.remove('active'); currentDeptId=null; renderDepartments(); }

async function addDepartment() {
    const name=document.getElementById('newDeptName').value.trim(); if(!name)return;
    try { await API.createDepartment({name,manager:document.getElementById('newDeptManager').value.trim()}); document.getElementById('addDeptModal').classList.remove('active'); renderDepartments(); showToast('Department added'); }
    catch(e) { showToast(e.message,'error'); }
}
async function deleteDept(id) { if(!confirm(t('deleteConfirm')))return; try{await API.deleteDepartment(id);renderDepartments();}catch(e){showToast(e.message,'error');} }
async function assignLocker(did,lid) { try{await API.assignLocker(did,lid);openDeptModal(did);}catch(e){showToast(e.message,'error');} }
async function unassignLocker(did,lid) { try{await API.unassignLocker(did,lid);openDeptModal(did);}catch(e){showToast(e.message,'error');} }

// ============ Modal Overlay Clicks ============
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target===overlay) {
            overlay.classList.remove('active');
            if(overlay.id==='lockerModal'){currentLockerId=null;currentLockerData=null;highlightItemId=null;renderGrid();}
            if(overlay.id==='zoneModal'){currentZoneId=null;currentZoneData=null;renderWarehouse();}
            if(overlay.id==='deptModal'){currentDeptId=null;renderDepartments();}
        }
    });
});

document.addEventListener('keydown', e => {
    if(e.key==='Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m=>m.classList.remove('active'));
        closeImageViewer();
        if(currentLockerId){currentLockerId=null;currentLockerData=null;highlightItemId=null;renderGrid();}
        if(currentZoneId){currentZoneId=null;currentZoneData=null;renderWarehouse();}
    }
});

document.getElementById('newItemFile').addEventListener('change', function() { if(this.files[0]) showToast('Image selected: '+this.files[0].name,'info'); });

// ============ Init ============
applyTheme(); applyLanguage(); loadHomeCounts();
