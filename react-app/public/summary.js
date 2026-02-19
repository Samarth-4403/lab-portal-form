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
document.addEventListener('DOMContentLoaded', function() {
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
    const savedData = localStorage.getItem('recruitmentFormData');
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
      yetToBeEndorsed: 0,
      endorsed: 0,
      offers: 0
    }
  };

  // Count unique labs that submitted data
  const uniqueLabs = new Set();

  formData.labs.forEach(lab => {
    const labName = lab.labName;
    uniqueLabs.add(labName);
    
    // Initialize lab totals
    if (!totals.labTotals[labName]) {
      totals.labTotals[labName] = {
        l11: 0,
        l12: 0,
        l13: 0,
        total: 0
      };
    }

    // Process each designation row
    lab.designations.forEach(designation => {
      const desigName = designation.designation;
      
      // Sum all columns for this row
      const rowTotal = 
        parseInt(designation.advertisedPosts || 0) +
        parseInt(designation.screenedPosts || 0) +
        parseInt(designation.publishedPosts || 0) +
        parseInt(designation.interviewedPosts || 0) +
        parseInt(designation.yetToBeEndorsedPosts || 0) +
        parseInt(designation.endorsedPosts || 0) +
        parseInt(designation.appointmentOffers || 0);

      // Add to appropriate designation total
      if (desigName === 'Scientist L-11') {
        totals.l11Total += rowTotal;
        totals.labTotals[labName].l11 = rowTotal;
      } else if (desigName === 'Scientist L-12') {
        totals.l12Total += rowTotal;
        totals.labTotals[labName].l12 = rowTotal;
      } else if (desigName === 'Scientist L-13') {
        totals.l13Total += rowTotal;
        totals.labTotals[labName].l13 = rowTotal;
      }

      // Add to lab total
      totals.labTotals[labName].total += rowTotal;

      // Add to stage totals
      totals.stageTotals.advertised += parseInt(designation.advertisedPosts || 0);
      totals.stageTotals.screened += parseInt(designation.screenedPosts || 0);
      totals.stageTotals.published += parseInt(designation.publishedPosts || 0);
      totals.stageTotals.interviewed += parseInt(designation.interviewedPosts || 0);
      totals.stageTotals.yetToBeEndorsed += parseInt(designation.yetToBeEndorsedPosts || 0);
      totals.stageTotals.endorsed += parseInt(designation.endorsedPosts || 0);
      totals.stageTotals.offers += parseInt(designation.appointmentOffers || 0);
    });
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
 * Display detailed stage-wise breakdown
 */
function displayDetailedBreakdown() {
  const tbody = document.getElementById('detailedTableBody');
  tbody.innerHTML = '';

  let serialNo = 1;

  // Initialize grand totals per designation
  const grandDesignationTotals = {
    'Scientist L-11': { advertised: 0, screened: 0, published: 0, interviewed: 0, yetToBeEndorsed: 0, endorsed: 0, offers: 0 },
    'Scientist L-12': { advertised: 0, screened: 0, published: 0, interviewed: 0, yetToBeEndorsed: 0, endorsed: 0, offers: 0 },
    'Scientist L-13': { advertised: 0, screened: 0, published: 0, interviewed: 0, yetToBeEndorsed: 0, endorsed: 0, offers: 0 }
  };

  formData.labs.forEach(lab => {
    const labName = lab.labName;
    const labRowSpan = lab.designations.length + 1; // +1 for the total row

    // Initialize lab-level totals
    const labStageTotals = {
      advertised: 0,
      screened: 0,
      published: 0,
      interviewed: 0,
      yetToBeEndorsed: 0,
      endorsed: 0,
      offers: 0
    };
    
    lab.designations.forEach((designation, index) => {
      const row = document.createElement('tr');
      
      const desigName = designation.designation;
      const advertised = parseInt(designation.advertisedPosts || 0);
      const screened = parseInt(designation.screenedPosts || 0);
      const published = parseInt(designation.publishedPosts || 0);
      const interviewed = parseInt(designation.interviewedPosts || 0);
      const yetToBeEndorsed = parseInt(designation.yetToBeEndorsedPosts || 0);
      const endorsed = parseInt(designation.endorsedPosts || 0);
      const offers = parseInt(designation.appointmentOffers || 0);

      // Add to lab totals
      labStageTotals.advertised += advertised;
      labStageTotals.screened += screened;
      labStageTotals.published += published;
      labStageTotals.interviewed += interviewed;
      labStageTotals.yetToBeEndorsed += yetToBeEndorsed;
      labStageTotals.endorsed += endorsed;
      labStageTotals.offers += offers;

      // Add to grand designation totals
      if (grandDesignationTotals[desigName]) {
        grandDesignationTotals[desigName].advertised += advertised;
        grandDesignationTotals[desigName].screened += screened;
        grandDesignationTotals[desigName].published += published;
        grandDesignationTotals[desigName].interviewed += interviewed;
        grandDesignationTotals[desigName].yetToBeEndorsed += yetToBeEndorsed;
        grandDesignationTotals[desigName].endorsed += endorsed;
        grandDesignationTotals[desigName].offers += offers;
      }

      // Only show serial number and lab name for first row of each lab (with rowspan)
      const serialCell = index === 0 
        ? `<td rowspan="${labRowSpan}" style="text-align: center; vertical-align: middle; font-weight: 600; background-color: #f9fafb;">${serialNo}</td>`
        : '';
      
      const labCell = index === 0
        ? `<td rowspan="${labRowSpan}" style="vertical-align: middle; font-weight: 600; background-color: #f9fafb;">${labName}</td>`
        : '';
      
      row.innerHTML = `
        ${serialCell}
        ${labCell}
        <td class="summary-designation">${desigName}</td>
        <td class="stage-col">${advertised.toLocaleString()}</td>
        <td class="stage-col">${screened.toLocaleString()}</td>
        <td class="stage-col">${published.toLocaleString()}</td>
        <td class="stage-col">${interviewed.toLocaleString()}</td>
        <td class="stage-col">${yetToBeEndorsed.toLocaleString()}</td>
        <td class="stage-col">${endorsed.toLocaleString()}</td>
        <td class="stage-col">${offers.toLocaleString()}</td>
      `;
      
      tbody.appendChild(row);
    });

    // Add Lab Total row
    const totalRow = document.createElement('tr');
    totalRow.style.backgroundColor = '#f0f9ff';
    totalRow.style.fontWeight = '700';
    totalRow.innerHTML = `
      <td class="summary-designation" style="background-color: #f0f9ff; color: #1e40af;">Total for ${labName}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.advertised.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.screened.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.published.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.interviewed.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.yetToBeEndorsed.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.endorsed.toLocaleString()}</td>
      <td class="stage-col" style="color: #1e40af;">${labStageTotals.offers.toLocaleString()}</td>
    `;
    tbody.appendChild(totalRow);
    
    serialNo++;
  });

  // Add a separator or title for grand totals
  const separatorRow = document.createElement('tr');
  separatorRow.innerHTML = `<td colspan="10" style="background-color: #f1f5f9; height: 10px; border-top: 2px solid #cbd5e1;"></td>`;
  tbody.appendChild(separatorRow);

  // Add Separate Grand Totals for each designation
  Object.keys(grandDesignationTotals).forEach(desig => {
    const totals = grandDesignationTotals[desig];
    const row = document.createElement('tr');
    row.style.backgroundColor = '#f8fafc';
    row.style.fontWeight = '700';
    row.innerHTML = `
      <td colspan="3" style="text-align: right; padding-right: 1.5rem; font-weight: 800; color: #1e2937; background-color: #f1f5f9;">
        ${desig}
      </td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.advertised.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.screened.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.published.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.interviewed.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.yetToBeEndorsed.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.endorsed.toLocaleString()}</td>
      <td class="stage-col" style="font-weight: 800; color: #1e2937; background-color: #f1f5f9;">${totals.offers.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });

  // Add Final Overall Grand Total row
  const overallTotals = { advertised: 0, screened: 0, published: 0, interviewed: 0, yetToBeEndorsed: 0, endorsed: 0, offers: 0 };
  Object.values(grandDesignationTotals).forEach(t => {
    overallTotals.advertised += t.advertised;
    overallTotals.screened += t.screened;
    overallTotals.published += t.published;
    overallTotals.interviewed += t.interviewed;
    overallTotals.yetToBeEndorsed += t.yetToBeEndorsed;
    overallTotals.endorsed += t.endorsed;
    overallTotals.offers += t.offers;
  });

  const finalRow = document.createElement('tr');
  finalRow.style.backgroundColor = '#f1f5f9';
  finalRow.style.borderTop = '2px solid #94a3b8';
  finalRow.innerHTML = `
    <td colspan="3" style="text-align: right; padding-right: 1.5rem; font-weight: 900; color: #1e2937; background-color: #e2e8f0;">
      GRAND TOTAL
    </td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.advertised.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.screened.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.published.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.interviewed.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.yetToBeEndorsed.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.endorsed.toLocaleString()}</td>
    <td class="stage-col" style="font-weight: 900; color: #1e2937; background-color: #e2e8f0;">${overallTotals.offers.toLocaleString()}</td>
  `;
  tbody.appendChild(finalRow);
}

/**
 * Display stage-wise summary
 */
function displayStageSummary(totals) {
  document.getElementById('stageAdvertised').textContent = totals.stageTotals.advertised.toLocaleString();
  document.getElementById('stageScreened').textContent = totals.stageTotals.screened.toLocaleString();
  document.getElementById('stagePublished').textContent = totals.stageTotals.published.toLocaleString();
  document.getElementById('stageInterviewed').textContent = totals.stageTotals.interviewed.toLocaleString();
  document.getElementById('stageYetToBeEndorsed').textContent = totals.stageTotals.yetToBeEndorsed.toLocaleString();
  document.getElementById('stageEndorsed').textContent = totals.stageTotals.endorsed.toLocaleString();
  document.getElementById('stageOffers').textContent = totals.stageTotals.offers.toLocaleString();
}

/**
 * Navigate back to the form
 */
function goBackToForm() {
  // Check if we are in the react app context
  // If we are, we might want to just close the window if opened in new tab, 
  // or go back to root. 
  // For now, consistent with legacy behavior:
  window.history.back();
}

/**
 * Print the summary
 */
function printSummary() {
  window.print();
}
