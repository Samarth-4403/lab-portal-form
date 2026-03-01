// Summary Page JavaScript

// List of all CSIR labs (must match form.js)
const ALL_LABS_COUNT = 39;

// Data structure to store form data
let formData = {
  labs: []
};

/**
 * Initialize the summary page
 */
document.addEventListener('DOMContentLoaded', function () {
  loadFormData();
  if (formData.labs.length === 0) {
    showNoDataAlert();
  } else {
    calculateAndDisplaySummary();
  }
});

/**
 * Load form data from localStorage
 */
function loadFormData() {
  try {
    const kdData = localStorage.getItem('recruitmentFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData.labs = parsedData.labs || [];
    }
  } catch (error) {
    console.error('Error loading form data:', error);
  }
}

/**
 * Show alert when no data is available
 */
function showNoDataAlert() {
  document.getElementById('noDataAlert').style.display = 'flex';
  document.getElementById('summaryCards').style.display = 'none';
}

/**
 * Calculate and display all summary data
 */
function calculateAndDisplaySummary() {
  // Calculate totals
  const totals = calculateTotals();

  // Display summary cards
  displaySummaryCards(totals);

  // Display lab-wise breakdown
  displayLabWiseBreakdown(totals);

  // Display detailed breakdown
  displayDetailedBreakdown();

  // Display stage-wise summary
  displayStageSummary(totals);
}

/**
 * Calculate all totals from form data
 */
function calculateTotals() {
  const totals = {
    grandTotal: 0,
    l11Total: 0,
    l12Total: 0,
    l13Total: 0,
    labsSubmitted: 0,
    labTotals: {},
    stageTotals: {
      advertised: 0,
      screened: 0,
      published: 0,
      interviewed: 0,
      endorsed: 0,
      offers: 0
    }
  };

  // Count unique labs that submitted data
  const uniqueLabs = new Set();

  // Process each entry (new structure: entries array)
  const entries = parsedData.entries || [];
  entries.forEach(entry => {
    const labName = entry.lab;
    uniqueLabs.add(labName);

    // Initialize lab totals
    if (!totals.labTotals[labName]) {
      totals.labTotals[labName] = { l11: 0, l12: 0, l13: 0, total: 0 };
    }

    const getMfoSum = (cat) => (entry[cat]?.m || 0) + (entry[cat]?.f || 0) + (entry[cat]?.o || 0);

    // In the new form, we have various categories (gen, sc, etc.)
    const rowTotal = ['gen', 'sc', 'st', 'obc', 'ews'].reduce((sum, cat) => sum + getMfoSum(cat), 0);

    // Map basic levels for the summary cards if possible
    if (entry.level === 'L-11') totals.l11Total += rowTotal;
    else if (entry.level === 'L-12') totals.l12Total += rowTotal;
    else if (entry.level === 'L-13') totals.l13Total += rowTotal;

    totals.labTotals[labName].total += rowTotal;
    totals.grandTotal += rowTotal;
  });

  totals.labsSubmitted = uniqueLabs.size;
  // Calculate grand total
  totals.grandTotal = totals.l11Total + totals.l12Total + totals.l13Total;

  return totals;
}

/**
 * Display summary cards
 */
function displaySummaryCards(totals) {
  document.getElementById('grandTotalValue').textContent = totals.grandTotal.toLocaleString();
  document.getElementById('l11TotalValue').textContent = totals.l11Total.toLocaleString();
  document.getElementById('l12TotalValue').textContent = totals.l12Total.toLocaleString();
  document.getElementById('l13TotalValue').textContent = totals.l13Total.toLocaleString();
  document.getElementById('labParticipationValue').textContent = `${totals.labsSubmitted} / ${ALL_LABS_COUNT}`;
}

/**
 * Display lab-wise breakdown table
 */
function displayLabWiseBreakdown(totals) {
  const tbody = document.getElementById('labWiseTableBody');
  tbody.innerHTML = '';

  let serialNo = 1;

  // Sort labs alphabetically
  const sortedLabNames = Object.keys(totals.labTotals).sort();

  sortedLabNames.forEach(labName => {
    const labData = totals.labTotals[labName];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${serialNo}</td>
      <td style="font-weight: 600; color: #1f2937;">${labName}</td>
      <td class="designation-col">${labData.l11.toLocaleString()}</td>
      <td class="designation-col">${labData.l12.toLocaleString()}</td>
      <td class="designation-col">${labData.l13.toLocaleString()}</td>
      <td class="total-col">${labData.total.toLocaleString()}</td>
    `;

    tbody.appendChild(row);
    serialNo++;
  });

  // Update footer totals
  document.getElementById('footerL11Total').textContent = totals.l11Total.toLocaleString();
  document.getElementById('footerL12Total').textContent = totals.l12Total.toLocaleString();
  document.getElementById('footerL13Total').textContent = totals.l13Total.toLocaleString();
  document.getElementById('footerGrandTotal').textContent = totals.grandTotal.toLocaleString();
}

/**
 * Display detailed stage-wise breakdown
 */
function displayDetailedBreakdown() {
  const tbody = document.getElementById('detailedTableBody');
  tbody.innerHTML = '';

  let serialNo = 1;

  formData.labs.forEach(lab => {
    const labName = lab.labName;

    lab.designations.forEach((designation, index) => {
      const row = document.createElement('tr');

      // Only show serial number and lab name for first row of each lab (with rowspan)
      const serialCell = index === 0
        ? `<td rowspan="3" style="text-align: center; vertical-align: middle; font-weight: 600; background-color: #f9fafb;">${serialNo}</td>`
        : '';

      const labCell = index === 0
        ? `<td rowspan="3" style="vertical-align: middle; font-weight: 600; background-color: #f9fafb;">${labName}</td>`
        : '';

      row.innerHTML = `
        ${serialCell}
        ${labCell}
        <td class="summary-designation">${designation.designation}</td>
        <td class="stage-col">${parseInt(designation.advertisedPosts || 0).toLocaleString()}</td>
        <td class="stage-col">${parseInt(designation.screenedPosts || 0).toLocaleString()}</td>
        <td class="stage-col">${parseInt(designation.publishedPosts || 0).toLocaleString()}</td>
        <td class="stage-col">${parseInt(designation.interviewedPosts || 0).toLocaleString()}</td>
        <td class="stage-col">${parseInt(designation.endorsedPosts || 0).toLocaleString()}</td>
        <td class="stage-col">${parseInt(designation.appointmentOffers || 0).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });

    serialNo++;
  });
}

/**
 * Display stage-wise summary
 */
function displayStageSummary(totals) {
  document.getElementById('stageAdvertised').textContent = totals.stageTotals.advertised.toLocaleString();
  document.getElementById('stageScreened').textContent = totals.stageTotals.screened.toLocaleString();
  document.getElementById('stagePublished').textContent = totals.stageTotals.published.toLocaleString();
  document.getElementById('stageInterviewed').textContent = totals.stageTotals.interviewed.toLocaleString();
  document.getElementById('stageEndorsed').textContent = totals.stageTotals.endorsed.toLocaleString();
  document.getElementById('stageOffers').textContent = totals.stageTotals.offers.toLocaleString();
}

/**
 * Navigate back to the form
 */
function goBackToForm() {
  window.location.href = 'index.html';
}

/**
 * Print the summary
 */
function printSummary() {
  window.print();
}
