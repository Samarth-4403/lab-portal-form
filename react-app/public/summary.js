// Summary Page JavaScript - Annexure-A Structure

const ALL_LABS_COUNT = 39;

let entries = [];

document.addEventListener('DOMContentLoaded', function () {
  loadFormData();
  if (entries.length === 0) {
    showNoDataAlert();
  } else {
    renderSummary();
  }
});

function loadFormData() {
  try {
    const savedData = localStorage.getItem('recruitmentFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      entries = parsed.entries || [];
    }
  } catch (error) {
    console.error('Error loading form data:', error);
  }
}

function showNoDataAlert() {
  document.getElementById('noDataAlert').style.display = 'flex';
  document.getElementById('summaryCards').style.display = 'none';
}

function renderSummary() {
  const totals = calculateTotals();
  displayCards(totals);
  displayGroupSummary(totals);
}

function calculateTotals() {
  const categories = ['gen', 'sc', 'st', 'obc', 'ews'];
  const pwdFields = ['oh', 'hh', 'vh', 'dbe'];
  const otherFields = ['exServiceMan', 'minorityCommunity'];

  const totals = {
    totalPIP: 0,
    uniqueLabs: new Set(),
    totalEntries: entries.length,
    byGroup: {}
  };

  entries.forEach(e => {
    totals.totalPIP += (e.pip || 0);
    totals.uniqueLabs.add(e.lab);

    const group = e.group || 'N/A';
    if (!totals.byGroup[group]) {
      totals.byGroup[group] = {
        count: 0,
        pip: 0,
        male: 0,
        female: 0,
        other: 0,
        gen: 0, sc: 0, st: 0, obc: 0, ews: 0,
        oh: 0, hh: 0, vh: 0, dbe: 0,
        exServiceMan: 0,
        minorityCommunity: 0
      };
    }
    const g = totals.byGroup[group];
    g.count++;
    g.pip += (e.pip || 0);

    // Sum nested m,f,o values for categories
    categories.concat(pwdFields).concat(otherFields).forEach(field => {
      const val = e[field] || { m: 0, f: 0, o: 0 };
      const m = (val.m || 0);
      const f = (val.f || 0);
      const o = (val.o || 0);

      // Update gender totals
      g.male += m;
      g.female += f;
      g.other += o;

      // Update specific category/field totals (sum of m+f+o)
      if (g.hasOwnProperty(field)) {
        g[field] += (m + f + o);
      }
    });
  });

  return totals;
}

function displayCards(totals) {
  document.getElementById('totalPIPValue').textContent = totals.totalPIP.toLocaleString();
  document.getElementById('labParticipationValue').textContent = `${totals.uniqueLabs.size} / ${ALL_LABS_COUNT}`;
  document.getElementById('totalEntriesValue').textContent = totals.totalEntries.toLocaleString();
}

function displayGroupSummary(totals) {
  const container = document.getElementById('groupSummaryCards');
  container.innerHTML = '';

  // Dynamically get all groups present in the data
  const groupsToDisplay = Object.keys(totals.byGroup).sort();

  const colors = {
    'Group IV': '#4f46e5',
    'Group III': '#0891b2',
    'Group II': '#059669',
    'Group I': '#d97706',
    'General Cadre: CCO & Non-CCO': '#7c3aed',
    'F&A Cadre: CCO & Non-CCO': '#db2777',
    'S&P Cadre: CCO & Non-CCO': '#ea580c',
    'Stenographic Cadre: CCO & Non-CCO': '#dc2626',
    'MTS': '#4b5563',
    'Canteen': '#92400e',
    'N/A': '#6b7280'
  };

  groupsToDisplay.forEach(group => {
    const d = totals.byGroup[group];
    if (!d) return;

    const inPosTotal = d.male + d.female + d.other;
    const catTotal = d.gen + d.sc + d.st + d.obc + d.ews;
    const pwdTotal = d.oh + d.hh + d.vh + d.dbe;

    const card = document.createElement('div');
    card.className = 'group-detail-card';
    card.style.borderTop = `4px solid ${colors[group] || '#6366f1'}`;
    card.innerHTML = `
      <div class="gd-header">
        <h3>${group}</h3>
        <span class="gd-badge">${d.count} ${d.count === 1 ? 'entry' : 'entries'}</span>
      </div>

      <div class="gd-pip-row">
        <span class="gd-pip-label">Sanctioned Strength (PIP)</span>
        <span class="gd-pip-value">${d.pip}</span>
      </div>

      <div class="gd-section">
        <div class="gd-section-title">Actual In Position <span class="gd-section-total">${inPosTotal}</span></div>
        <div class="gd-grid gd-grid-3">
          <div class="gd-item"><span class="gd-label">Male</span><span class="gd-val">${d.male}</span></div>
          <div class="gd-item"><span class="gd-label">Female</span><span class="gd-val">${d.female}</span></div>
          <div class="gd-item"><span class="gd-label">Others</span><span class="gd-val">${d.other}</span></div>
        </div>
      </div>

      <div class="gd-section">
        <div class="gd-section-title">Category Breakdown <span class="gd-section-total">${catTotal}</span></div>
        <div class="gd-grid gd-grid-5">
          <div class="gd-item"><span class="gd-label">Gen</span><span class="gd-val">${d.gen}</span></div>
          <div class="gd-item"><span class="gd-label">SC</span><span class="gd-val">${d.sc}</span></div>
          <div class="gd-item"><span class="gd-label">ST</span><span class="gd-val">${d.st}</span></div>
          <div class="gd-item"><span class="gd-label">OBC</span><span class="gd-val">${d.obc}</span></div>
          <div class="gd-item"><span class="gd-label">EWS</span><span class="gd-val">${d.ews}</span></div>
        </div>
      </div>

      <div class="gd-section">
        <div class="gd-section-title">PWD Breakdown <span class="gd-section-total">${pwdTotal}</span></div>
        <div class="gd-grid gd-grid-4">
          <div class="gd-item"><span class="gd-label">OH</span><span class="gd-val">${d.oh}</span></div>
          <div class="gd-item"><span class="gd-label">HH</span><span class="gd-val">${d.hh}</span></div>
          <div class="gd-item"><span class="gd-label">VH</span><span class="gd-val">${d.vh}</span></div>
          <div class="gd-item"><span class="gd-label">dBe*</span><span class="gd-val">${d.dbe}</span></div>
        </div>
      </div>

      <div class="gd-section gd-section-last">
        <div class="gd-grid gd-grid-2">
          <div class="gd-item"><span class="gd-label">Ex-Serviceman</span><span class="gd-val">${d.exServiceMan}</span></div>
          <div class="gd-item"><span class="gd-label">Minority</span><span class="gd-val">${d.minorityCommunity}</span></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function printSummary() {
  window.print();
}
