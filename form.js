const ALL_LABS = [
    "CSIR - 4PI", "CSIR - AMPRI", "CSIR - CBRI", "CSIR - CCMB", "CSIR - CDRI",
    "CSIR - CECRI", "CSIR - CEERI", "CSIR - CFTRI", "CSIR - CGCRI", "CSIR - CIMAP",
    "CSIR - CIMFR", "CSIR - CLRI", "CSIR - CMC", "CSIR - CMERI", "CSIR - CRRI",
    "CSIR - CSMCRI", "CSIR - CSIO", "CSIR - HQ", "CSIR - IGIB", "CSIR - IHBT",
    "CSIR - IICB", "CSIR - IICT", "CSIR - IIIM", "CSIR - IIP", "CSIR - IITR",
    "CSIR - IMMT", "CSIR - IMTECH", "CSIR - NAL", "CSIR - NBRI", "CSIR - NCL",
    "CSIR - NEERI", "CSIR - NEIST", "CSIR - NGRI", "CSIR - NIIST", "CSIR - NIO",
    "CSIR - NIScPR", "CSIR - NML", "CSIR - NPL", "CSIR - SERC", "CSIR - URDIP"
].sort();

// ── HIERARCHY DATA ──────────────────────────────────────────
const hierarchyData = {
    "Scientific": {
        "Group IV": [
            { desig: "Junior Scientist", level: "L-10" },
            { desig: "Scientist", level: "L-11" },
            { desig: "Senior Scientist", level: "L-12" },
            { desig: "Principle Scientist", level: "L-13" },
            { desig: "Senior Principle Scientist", level: "L-13A" },
            { desig: "Chief Scientist", level: "L-14" }
        ]
    },
    "Technical": {
        "Group III": [
            { desig: "Technical Assistant", level: "L-6" },
            { desig: "Technical Officer", level: "L-7" },
            { desig: "Senior Technical Officer 1", level: "L-10" },
            { desig: "Senior Technical Officer 2", level: "L-11" },
            { desig: "Senior Technical Officer 3", level: "L-12" },
            { desig: "Principle Technical Officer", level: "L-13" }
        ],
        "Group II": [
            { desig: "Technical 1", level: "L-2" },
            { desig: "Technical 2", level: "L-5" },
            { desig: "Senior Technical 1", level: "L-6" },
            { desig: "Senior Technical 2", level: "L-7" },
            { desig: "Senior Technical 3", level: "L-8" }
        ],
        "Group I": [
            { desig: "Lab. Attendant 1", level: "L-1" },
            { desig: "Lab. Attendant 2", level: "L-2" },
            { desig: "Lab. Assistant", level: "L-5" }
        ]
    },
    "Admin": {
        // Placeholder for future admin groups
        "Admin (Placeholder)": [
            { desig: "Admin Role 1", level: "L-10" }
        ]
    },
    "Isolated": {
        // Placeholder for future isolated groups
        "Isolated (Placeholder)": [
            { desig: "Isolated Role 1", level: "L-10" }
        ]
    }
};

let rowsData = [];
let rowIdCounter = 0;

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const labSel = document.getElementById('inLab');
    ALL_LABS.forEach(lab => {
        const o = document.createElement('option');
        o.value = lab; o.textContent = lab;
        labSel.appendChild(o);
    });
});

// ── CASCADING DROPDOWN LOGIC ─────────────────────────────
function onDeptChange() {
    const dept = document.getElementById('inDept') ? document.getElementById('inDept').value : '';
    const groupSel = document.getElementById('inGroup');
    const desigSel = document.getElementById('inDesignation');
    const levelInput = document.getElementById('inLevel');

    // Reset lower levels
    if (groupSel) {
        groupSel.innerHTML = '<option value="">— Select Group —</option>';
        groupSel.disabled = true;
    }
    if (desigSel) {
        desigSel.innerHTML = '<option value="">— Select Designation —</option>';
        desigSel.disabled = true;
    }
    if (levelInput) {
        levelInput.value = '';
    }

    if (dept && hierarchyData[dept] && groupSel) {
        groupSel.disabled = false;
        Object.keys(hierarchyData[dept]).forEach(grp => {
            const opt = document.createElement('option');
            opt.value = grp;
            opt.textContent = grp;
            groupSel.appendChild(opt);
        });
    }
}

function onGroupChange() {
    const dept = document.getElementById('inDept') ? document.getElementById('inDept').value : '';
    const groupSel = document.getElementById('inGroup');
    const group = groupSel ? groupSel.value : '';
    const desigSel = document.getElementById('inDesignation');
    const levelInput = document.getElementById('inLevel');

    // Reset lower levels
    if (desigSel) {
        desigSel.innerHTML = '<option value="">— Select Designation —</option>';
        desigSel.disabled = true;
    }
    if (levelInput) {
        levelInput.value = '';
    }

    if (dept && group && hierarchyData[dept] && hierarchyData[dept][group] && desigSel) {
        desigSel.disabled = false;
        hierarchyData[dept][group].forEach(item => {
            const opt = document.createElement('option');
            opt.value = opt.textContent = item.desig;
            // Store level in dataset mapping
            opt.dataset.level = item.level;
            desigSel.appendChild(opt);
        });
    }
}

function onDesignationChange() {
    const desigSel = document.getElementById('inDesignation');
    const levelInput = document.getElementById('inLevel');

    if (!desigSel || !levelInput) return;

    const selectedOpt = desigSel.options[desigSel.selectedIndex];
    if (selectedOpt && selectedOpt.dataset.level) {
        levelInput.value = selectedOpt.dataset.level;
    } else {
        levelInput.value = '';
    }
}

// ── VALIDATE LIMITS ────────────────────────────────────
function validateLimits() {
    let pipTot = 0, rssTot = 0, vcTot = 0;
    let pipLimit = 0, rssLimit = 0, vcLimit = 0;

    rowsData.forEach(r => {
        if (r.level === 'L-11') pipTot += r.mip;
        if (r.level === 'L-12') rssTot += r.mip;
        if (r.level === 'L-13') vcTot += r.mip;

        pipLimit = Math.max(pipLimit, r.pipLimit || 0);
        rssLimit = Math.max(rssLimit, r.rssLimit || 0);
        vcLimit = Math.max(vcLimit, r.vcLimit || 0);
    });

    let msgs = [];
    if (pipLimit > 0 && pipTot > pipLimit) msgs.push(`PIP Limit Exceeded (L-11): ${pipTot} / ${pipLimit}`);
    if (rssLimit > 0 && rssTot > rssLimit) msgs.push(`RSS Limit Exceeded (L-12): ${rssTot} / ${rssLimit}`);
    if (vcLimit > 0 && vcTot > vcLimit) msgs.push(`VC Limit Exceeded (L-13): ${vcTot} / ${vcLimit}`);

    const errorDiv = document.getElementById('errorMessage');
    if (msgs.length > 0) {
        errorDiv.innerHTML = `<strong>Warning - Limits Exceeded!</strong><br/>` + msgs.join("<br/>");
        errorDiv.className = 'alert alert-danger';
        errorDiv.style.display = 'block';
        return false;
    } else {
        errorDiv.style.display = 'none';
        return true;
    }
}

// ── ADD ENTRY ───────────────────────────────────────────
function addRowToTable() {
    const lab = document.getElementById('inLab').value;
    const pipLimit = parseInt(document.getElementById('inPipLimit').value, 10) || 0;
    const rssLimit = parseInt(document.getElementById('inRssLimit').value, 10) || 0;
    const vcLimit = parseInt(document.getElementById('inVcLimit').value, 10) || 0;

    const dept = document.getElementById('inDept').value;
    const group = document.getElementById('inGroup').value;
    const level = document.getElementById('inLevel').value;
    const desig = document.getElementById('inDesignation').value;
    const gender = document.getElementById('inGender').value;
    const cat = document.getElementById('inCategory').value;

    if (!lab || !dept || !group || !desig || !gender || !cat) {
        showError("Please fill all required (*) fields in the side panel.");
        return;
    }

    const row = {
        id: ++rowIdCounter,
        lab, pipLimit, rssLimit, vcLimit, dept, group, level, desig, gender, cat,
        // Initialize numeric columns
        mip: 0, sister: 0, dg: 0, trans: 0, oh: 0, hh: 0, vh: 0, de: 0, exsm: 0, mc: 0
    };

    rowsData.push(row);
    renderTable();

    document.getElementById('errorMessage').style.display = 'none';
}

// ── RENDER COMPACT DYNAMIC TABLE ────────────────────────
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const tfoot = document.getElementById('tableFoot');
    tbody.innerHTML = '';

    if (rowsData.length === 0) {
        tbody.innerHTML = '<tr id="emptyPlaceholder"><td colspan="22" style="text-align:center; padding:2rem; color:#6b7280; font-style:italic;">No rows added yet. Use the panel above to add rows.</td></tr>';
        tfoot.style.display = 'none';
        validateLimits();
        return;
    }

    tfoot.style.display = 'table-row-group';

    // Totals
    let tmip = 0, tsis = 0, tdg = 0, ttr = 0, toh = 0, thh = 0, tvh = 0, tde = 0, tex = 0, tmc = 0;

    rowsData.forEach((r, idx) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td class="td-text">${r.lab}</td>
            <td class="td-text">${r.dept}</td>
            <td>${r.group}</td>
            <td>${r.level}</td>
            <td class="td-text">${r.desig}</td>
            <td>${r.gender}</td>
            <td>${r.cat}</td>
            
            <td>${r.pipLimit || '-'}</td>
            <td>${r.rssLimit || '-'}</td>
            <td>${r.vcLimit || '-'}</td>
            
            <!-- Number inputs mapped to state -->
            <td><input type="number" class="ni-input" min="0" value="${r.mip}" oninput="updateVal(${r.id}, 'mip', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.sister}" oninput="updateVal(${r.id}, 'sister', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.dg}" oninput="updateVal(${r.id}, 'dg', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.trans}" oninput="updateVal(${r.id}, 'trans', this.value)"></td>
            
            <td><input type="number" class="ni-input" min="0" value="${r.oh}" oninput="updateVal(${r.id}, 'oh', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.hh}" oninput="updateVal(${r.id}, 'hh', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.vh}" oninput="updateVal(${r.id}, 'vh', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.de}" oninput="updateVal(${r.id}, 'de', this.value)"></td>
            
            <td><input type="number" class="ni-input" min="0" value="${r.exsm}" oninput="updateVal(${r.id}, 'exsm', this.value)"></td>
            <td><input type="number" class="ni-input" min="0" value="${r.mc}" oninput="updateVal(${r.id}, 'mc', this.value)"></td>
        `;

        tmip += r.mip; tsis += r.sister; tdg += r.dg; ttr += r.trans;
        toh += r.oh; thh += r.hh; tvh += r.vh; tde += r.de;
        tex += r.exsm; tmc += r.mc;

        tbody.appendChild(tr);
    });

    document.getElementById('tot_mip').textContent = tmip;
    document.getElementById('tot_sis').textContent = tsis;
    document.getElementById('tot_dg').textContent = tdg;
    document.getElementById('tot_trans').textContent = ttr;
    document.getElementById('tot_oh').textContent = toh;
    document.getElementById('tot_hh').textContent = thh;
    document.getElementById('tot_vh').textContent = tvh;
    document.getElementById('tot_de').textContent = tde;
    document.getElementById('tot_exsm').textContent = tex;
    document.getElementById('tot_mc').textContent = tmc;

    validateLimits();
}

// ── UPDATE VAL ──────────────────────────────────────────
function updateVal(id, field, val) {
    const row = rowsData.find(r => r.id === id);
    if (row) {
        row[field] = parseInt(val, 10) || 0;

        // Re-calc totals immediately without re-rendering everything
        let tmip = 0, tsis = 0, tdg = 0, ttr = 0, toh = 0, thh = 0, tvh = 0, tde = 0, tex = 0, tmc = 0;
        rowsData.forEach(r => {
            tmip += r.mip; tsis += r.sister; tdg += r.dg; ttr += r.trans;
            toh += r.oh; thh += r.hh; tvh += r.vh; tde += r.de;
            tex += r.exsm; tmc += r.mc;
        });

        document.getElementById('tot_mip').textContent = tmip;
        document.getElementById('tot_sis').textContent = tsis;
        document.getElementById('tot_dg').textContent = tdg;
        document.getElementById('tot_trans').textContent = ttr;
        document.getElementById('tot_oh').textContent = toh;
        document.getElementById('tot_hh').textContent = thh;
        document.getElementById('tot_vh').textContent = tvh;
        document.getElementById('tot_de').textContent = tde;
        document.getElementById('tot_exsm').textContent = tex;
        document.getElementById('tot_mc').textContent = tmc;

        if (field === 'mip') validateLimits();
    }
}

// ── DELETE ROW ──────────────────────────────────────────
function deleteRow(id) {
    rowsData = rowsData.filter(r => r.id !== id);
    renderTable();
}

function removeLastRow() {
    if (rowsData.length > 0) {
        rowsData.pop();
        renderTable();
    } else {
        showError("No rows to remove.");
    }
}

// ── PREVENT NEGATIVES ──────────────────────────────────
document.addEventListener('input', function (e) {
    if (e.target.type === 'number' && parseFloat(e.target.value) < 0) {
        e.target.value = 0;
    }
});

// ── SUBMIT / MESSAGES ───────────────────────────────────
function showError(msg) {
    const e = document.getElementById('errorMessage');
    e.innerHTML = `<strong>Error:</strong> ${msg}`;
    e.style.display = 'block';
    setTimeout(() => { e.style.display = 'none'; }, 6000);
}

function submitForm() {
    if (rowsData.length === 0) {
        showError("You must add at least one row to submit.");
        return;
    }
    if (!validateLimits()) {
        showError("Sanctioned post limits are exceeded. Please check the warnings above before submitting.");
        return;
    }
    document.getElementById('confirmationModal').classList.add('active');
}

function closeModal() {
    document.getElementById('confirmationModal').classList.remove('active');
}
