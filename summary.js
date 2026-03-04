/**
 * Lab Manpower Information
 * Summary Page Logic
 */

let summaryData = {
  entries: [],
  totals: {
    pip: 0,
    inPosition: 0,
    dept: {
      Scientific: 0,
      Technical: 0,
      Administration: 0,
      Isolated: 0
    },
    group: {}, // New: map for group-wise totals
    category: {
      gen: { m: 0, f: 0, o: 0 },
      sc: { m: 0, f: 0, o: 0 },
      st: { m: 0, f: 0, o: 0 },
      obc: { m: 0, f: 0, o: 0 },
      ews: { m: 0, f: 0, o: 0 }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSummary();
});

function initSummary() {
  const rawData = localStorage.getItem('recruitmentFormData');
  if (!rawData) {
    showNoData();
    return;
  }

  try {
    const parsed = JSON.parse(rawData);
    summaryData.entries = parsed.entries || [];

    if (summaryData.entries.length === 0) {
      showNoData();
      return;
    }

    calculateTotals();
    renderSummary();
  } catch (e) {
    console.error("Error parsing summary data", e);
    showNoData();
  }
}

function showNoData() {
  document.getElementById('noDataAlert').style.display = 'block';
  document.getElementById('summaryCards').style.display = 'none';
}

function calculateTotals() {
  summaryData.entries.forEach(entry => {
    // PIP
    summaryData.totals.pip += (entry.pip || 0);

    // Group-wise initialization
    if (!summaryData.totals.group[entry.group]) {
      summaryData.totals.group[entry.group] = { pip: 0, inPosition: 0 };
    }
    summaryData.totals.group[entry.group].pip += (entry.pip || 0);

    // Departmental / Row Totals
    const rowTotal = getRowTotal(entry);
    summaryData.totals.inPosition += rowTotal;
    summaryData.totals.group[entry.group].inPosition += rowTotal;

    if (summaryData.totals.dept.hasOwnProperty(entry.dept)) {
      summaryData.totals.dept[entry.dept] += rowTotal;
    }

    // Category Breakdown (including PWD, Ex-Svc, Minority)
    ['gen', 'sc', 'st', 'obc', 'ews', 'oh', 'hh', 'vh', 'dbe', 'exServiceMan', 'minorityCommunity'].forEach(cat => {
      if (!summaryData.totals.category[cat]) {
        summaryData.totals.category[cat] = { m: 0, f: 0, o: 0 };
      }
      summaryData.totals.category[cat].m += (entry[cat]?.m || 0);
      summaryData.totals.category[cat].f += (entry[cat]?.f || 0);
      summaryData.totals.category[cat].o += (entry[cat]?.o || 0);
    });
  });
}

function getRowTotal(entry) {
  const categories = ['gen', 'sc', 'st', 'obc', 'ews'];
  return categories.reduce((sum, cat) => {
    return sum + (entry[cat]?.m || 0) + (entry[cat]?.f || 0) + (entry[cat]?.o || 0);
  }, 0);
}

function renderSummary() {
  // Basic Cards
  document.getElementById('totalPipValue').textContent = summaryData.totals.pip;
  document.getElementById('inPositionValue').textContent = summaryData.totals.inPosition;

  const labs = new Set(summaryData.entries.map(e => e.lab));
  document.getElementById('labParticipationValue').textContent = `${labs.size} Submitted`;

  // Dept Values
  document.getElementById('deptSciValue').textContent = summaryData.totals.dept.Scientific;
  document.getElementById('deptTechValue').textContent = summaryData.totals.dept.Technical;
  document.getElementById('deptAdminValue').textContent = summaryData.totals.dept.Administration;
  document.getElementById('deptIsoValue').textContent = summaryData.totals.dept.Isolated;

  // Group Summary Table
  const groupBody = document.getElementById('groupSummaryTableBody');
  groupBody.innerHTML = '';
  Object.keys(summaryData.totals.group).sort().forEach(groupName => {
    const data = summaryData.totals.group[groupName];
    const util = data.pip > 0 ? ((data.inPosition / data.pip) * 100).toFixed(1) : '0.0';
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td style="text-align: left; font-weight: 600;">${groupName}</td>
            <td class="total-col">${data.pip}</td>
            <td class="total-col" style="background-color: #f0fdf4">${data.inPosition}</td>
            <td style="font-weight: 700; color: #2563eb">${util}%</td>
        `;
    groupBody.appendChild(tr);
  });

  // Category Table
  const catBody = document.getElementById('categoryTableBody');
  catBody.innerHTML = '';

  const displayCats = [
    { key: 'gen', label: 'General' },
    { key: 'sc', label: 'SC' },
    { key: 'st', label: 'ST' },
    { key: 'obc', label: 'OBC' },
    { key: 'ews', label: 'EWS' },
    { key: 'divider', label: '---' },
    { key: 'oh', label: 'PWD - OH' },
    { key: 'hh', label: 'PWD - HH' },
    { key: 'vh', label: 'PWD - VH' },
    { key: 'dbe', label: 'PWD - dBe' },
    { key: 'pwd_total', label: 'Total PWD' },
    { key: 'divider_2', label: '---' },
    { key: 'exServiceMan', label: 'Ex-Service Man' },
    { key: 'minorityCommunity', label: 'Minority Community' }
  ];

  displayCats.forEach(item => {
    if (item.key.startsWith('divider')) {
      catBody.insertAdjacentHTML('beforeend', '<tr style="background:#f1f5f9; height: 4px;"><td colspan="5" style="padding:0"></td></tr>');
      return;
    }

    let data;
    if (item.key === 'pwd_total') {
      data = {
        m: (summaryData.totals.category.oh?.m || 0) + (summaryData.totals.category.hh?.m || 0) + (summaryData.totals.category.vh?.m || 0) + (summaryData.totals.category.dbe?.m || 0),
        f: (summaryData.totals.category.oh?.f || 0) + (summaryData.totals.category.hh?.f || 0) + (summaryData.totals.category.vh?.f || 0) + (summaryData.totals.category.dbe?.f || 0),
        o: (summaryData.totals.category.oh?.o || 0) + (summaryData.totals.category.hh?.o || 0) + (summaryData.totals.category.vh?.o || 0) + (summaryData.totals.category.dbe?.o || 0)
      };
    } else {
      data = summaryData.totals.category[item.key] || { m: 0, f: 0, o: 0 };
    }

    const total = data.m + data.f + data.o;
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td style="text-transform: capitalize; font-weight: 600;">${item.label}</td>
            <td>${data.m}</td>
            <td>${data.f}</td>
            <td>${data.o}</td>
            <td class="total-col">${total}</td>
        `;
    catBody.appendChild(tr);
  });

  // Detailed Table
  const detBody = document.getElementById('detailedTableBody');
  detBody.innerHTML = '';

  summaryData.entries.forEach((entry, idx) => {
    const m = ['gen', 'sc', 'st', 'obc', 'ews'].reduce((sum, cat) => sum + (entry[cat]?.m || 0), 0);
    const f = ['gen', 'sc', 'st', 'obc', 'ews'].reduce((sum, cat) => sum + (entry[cat]?.f || 0), 0);
    const o = ['gen', 'sc', 'st', 'obc', 'ews'].reduce((sum, cat) => sum + (entry[cat]?.o || 0), 0);
    const rowTotal = m + f + o;

    const pwdTotal = (entry.oh?.m || 0) + (entry.oh?.f || 0) + (entry.oh?.o || 0) +
      (entry.hh?.m || 0) + (entry.hh?.f || 0) + (entry.hh?.o || 0) +
      (entry.vh?.m || 0) + (entry.vh?.f || 0) + (entry.vh?.o || 0) +
      (entry.dbe?.m || 0) + (entry.dbe?.f || 0) + (entry.dbe?.o || 0);

    const exSvcTotal = (entry.exServiceMan?.m || 0) + (entry.exServiceMan?.f || 0) + (entry.exServiceMan?.o || 0);
    const minorityTotal = (entry.minorityCommunity?.m || 0) + (entry.minorityCommunity?.f || 0) + (entry.minorityCommunity?.o || 0);

    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${idx + 1}</td>
            <td style="font-weight: 600; text-align: left;">${entry.lab}</td>
            <td>${entry.dept}</td>
            <td>${entry.group}</td>
            <td>${entry.subGroup || 'N/A'}</td>
            <td style="text-align: left;">${entry.designation}</td>
            <td style="font-weight: 600; color: #667eea">${entry.level}</td>
            <td class="total-col" style="background-color: #f0fdf4">${entry.pip}</td>
            <td>${m}</td>
            <td>${f}</td>
            <td>${o}</td>
            <td>${pwdTotal}</td>
            <td>${exSvcTotal}</td>
            <td>${minorityTotal}</td>
            <td class="total-col" style="background-color: #fefce8">${rowTotal}</td>
        `;
    detBody.appendChild(tr);
  });
}

function printSummary() {
  window.print();
}
