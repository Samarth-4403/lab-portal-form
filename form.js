// Lab Recruitment Form JavaScript

// List of all CSIR labs (same as DPR/DIB forms) - SORTED ALPHABETICALLY
const ALL_LABS = [
    "CSIR - 4PI",
    "CSIR - AMPRI",
    "CSIR - CBRI",
    "CSIR - CCMB",
    "CSIR - CDRI",
    "CSIR - CECRI",
    "CSIR - CEERI",
    "CSIR - CFTRI",
    "CSIR - CGCRI",
    "CSIR - CIMAP",
    "CSIR - CIMFR",
    "CSIR - CLRI",
    "CSIR - CMC",
    "CSIR - CMERI",
    "CSIR - CRRI",
    "CSIR - CSMCRI",
    "CSIR - CSIO",
    "CSIR - IGIB",
    "CSIR - IHBT",
    "CSIR - IICB",
    "CSIR - IICT",
    "CSIR - IIIM",
    "CSIR - IIP",
    "CSIR - IITR",
    "CSIR - IMMT",
    "CSIR - IMTECH",
    "CSIR - NAL",
    "CSIR - NBRI",
    "CSIR - NCL",
    "CSIR - NEERI",
    "CSIR - NEIST",
    "CSIR - NGRI",
    "CSIR - NIIST",
    "CSIR - NIO",
    "CSIR - NIScPR",
    "CSIR - NML",
    "CSIR - NPL",
    "CSIR - SERC",
    "CSIR - URDIP"
].sort(); // Ensure alphabetical order

// Fixed designations - each lab gets 3 rows
const DESIGNATIONS = [
    "Scientist L-11",
    "Scientist L-12",
    "Scientist L-13"
];

// Track added labs
let addedLabs = [];
let labCounter = 0;

// Initialize form - no rows initially, user must add labs
document.addEventListener('DOMContentLoaded', function() {
    updateDeleteButton();
});

/**
 * Add a new lab (creates 3 rows - one for each designation)
 */
function addLabEntry() {
    // Show lab selection modal
    showLabSelectionModal();
}

/**
 * Show lab selection modal
 */
function showLabSelectionModal() {
    const modal = document.getElementById('labSelectionModal');
    const grid = document.getElementById('labSelectionGrid');
    
    // Clear previous selection
    grid.innerHTML = '';
    
    // Clear search input
    const searchInput = document.getElementById('labSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Populate with available labs (exclude already added labs)
    const availableLabs = ALL_LABS.filter(lab => !addedLabs.includes(lab));
    
    if (availableLabs.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">All labs have been added.</p>';
    } else {
        availableLabs.forEach((lab, index) => {
            const labId = `lab_${index}`;
            const labOption = document.createElement('label');
            labOption.className = 'lab-checkbox';
            labOption.setAttribute('for', labId);
            labOption.innerHTML = `
                <input type="radio" name="selectedLab" id="${labId}" value="${lab}">
                <span class="lab-name">${lab}</span>
            `;
            grid.appendChild(labOption);
        });
    }
    
    modal.classList.add('active');
}

/**
 * Filter labs based on search input
 */
function filterLabs() {
    const searchInput = document.getElementById('labSearchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const grid = document.getElementById('labSelectionGrid');
    const labCheckboxes = grid.querySelectorAll('.lab-checkbox');
    
    // Remove any existing "No results" message
    const existingNoResults = grid.querySelector('.no-results-msg');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    let matchCount = 0;
    
    labCheckboxes.forEach(checkbox => {
        const labName = checkbox.querySelector('.lab-name').textContent.toLowerCase();
        if (labName.includes(searchTerm)) {
            checkbox.style.display = 'flex';
            matchCount++;
        } else {
            checkbox.style.display = 'none';
        }
    });
    
    // Show message if no labs match the search
    if (matchCount === 0 && labCheckboxes.length > 0) {
        const noResults = document.createElement('p');
        noResults.className = 'no-results-msg';
        noResults.style.cssText = 'text-align: center; color: #ef4444; padding: 1rem; width: 100%; grid-column: 1 / -1;';
        noResults.textContent = `No labs matching "${searchTerm}" found.`;
        grid.appendChild(noResults);
    }
}

/**
 * Close lab selection modal
 */
function closeLabSelectionModal() {
    const modal = document.getElementById('labSelectionModal');
    modal.classList.remove('active');
}

/**
 * Confirm lab selection and add rows
 */
function confirmLabSelection() {
    const selectedRadio = document.querySelector('input[name="selectedLab"]:checked');
    
    if (!selectedRadio) {
        alert('Please select a lab.');
        return;
    }
    
    const labName = selectedRadio.value;
    
    // Add the lab rows
    addLabRows(labName);
    
    // Close the modal
    closeLabSelectionModal();
}

/**
 * Add 3 rows for a selected lab (one for each designation)
 */
function addLabRows(labName) {
    labCounter++;
    const tableBody = document.getElementById('tableBody');
    const currentRowCount = tableBody.children.length;
    
    // Add the lab to tracking
    addedLabs.push(labName);
    
    // Create lab dropdown options (for display purposes, will be readonly)
    const labOptions = ALL_LABS.map(lab => 
        `<option value="${lab}" ${lab === labName ? 'selected' : ''}>${lab}</option>`
    ).join('');
    
    // Calculate the serial number for this lab group (each lab = 1 number)
    const serialNumber = addedLabs.length;
    
    // Create 3 rows, one for each designation
    DESIGNATIONS.forEach((designation, index) => {
        const row = document.createElement('tr');
        row.className = `lab-group-${labCounter}`;
        row.dataset.labName = labName;
        
        // Only add serial number and lab name cells to the first row, with rowspan=3
        const serialCell = index === 0 
            ? `<td class="serial-number" rowspan="3" style="vertical-align: middle; text-align: center; font-weight: 600;">${serialNumber}</td>`
            : '';
        
        const labCell = index === 0
            ? `<td rowspan="3" style="vertical-align: middle;">
                <select name="labName[]" 
                        required 
                        class="lab-select"
                        disabled
                        style="background-color: #f9fafb; cursor: not-allowed;">
                    ${labOptions}
                </select>
                <input type="hidden" name="labName[]" value="${labName}">
               </td>`
            : '';
        
        // Hidden inputs for lab name in rows 2 and 3 (for form submission)
        const hiddenLabInput = index > 0
            ? `<input type="hidden" name="labName[]" value="${labName}">`
            : '';
        
        row.innerHTML = `
            ${serialCell}
            ${labCell}
            <td>
                <input type="text" 
                       value="${designation}" 
                       readonly 
                       class="designation-display"
                       style="background-color: #f9fafb; cursor: default;">
                <input type="hidden" name="designation[]" value="${designation}">
                ${hiddenLabInput}
            </td>
            <td>
                <input type="number" 
                       name="advertisedPosts[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
            <td>
                <input type="number" 
                       name="screenedPosts[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
            <td>
                <input type="number" 
                       name="publishedPosts[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
            <td>
                <input type="number" 
                       name="interviewedPosts[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
            <td>
                <input type="number" 
                       name="endorsedPosts[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
            <td>
                <input type="number" 
                       name="appointmentOffers[]" 
                       placeholder="0" 
                       min="0" 
                       value="0"
                       class="number-input">
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateDeleteButton();
}

/**
 * Delete the last added lab (removes all 3 rows)
 */
function deleteLastLab() {
    const tableBody = document.getElementById('tableBody');
    
    if (addedLabs.length === 0) {
        alert('No labs to delete.');
        return;
    }
    
    // Remove the last 3 rows (one lab = 3 rows) immediately without confirmation
    for (let i = 0; i < 3; i++) {
        const lastRow = tableBody.lastElementChild;
        if (lastRow) {
            lastRow.remove();
        }
    }
    
    // Remove from tracking
    addedLabs.pop();
    labCounter--;
    
    updateDeleteButton();
}

/**
 * Update delete button state
 */
function updateDeleteButton() {
    const deleteBtn = document.getElementById('deleteLabBtn');
    if (deleteBtn) {
        deleteBtn.disabled = addedLabs.length === 0;
        deleteBtn.style.opacity = addedLabs.length === 0 ? '0.5' : '1';
        deleteBtn.style.cursor = addedLabs.length === 0 ? 'not-allowed' : 'pointer';
    }
}

/**
 * Validate form before submission
 */
function validateForm() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
    let isValid = true;
    let errorMessages = [];
    
    // Clear previous error states
    document.querySelectorAll('.error-border').forEach(el => {
        el.classList.remove('error-border');
    });
    
    // Check if at least one lab exists
    if (addedLabs.length === 0) {
        errorMessages.push('Please add at least one lab entry.');
        isValid = false;
    }
    
    // Validate each row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 1;
        
        // Get all number inputs in the row
        const numberInputs = row.querySelectorAll('input[type="number"]');
        
        // Check if all numbers are valid (>= 0)
        numberInputs.forEach(input => {
            const value = parseFloat(input.value);
            if (isNaN(value) || value < 0) {
                input.classList.add('error-border');
                if (isNaN(value)) {
                    errorMessages.push(`Row ${rowNum}: All number fields are required.`);
                } else {
                    errorMessages.push(`Row ${rowNum}: All numbers must be 0 or greater.`);
                }
                isValid = false;
            }
        });
    }
    
    // Display error messages
    if (!isValid) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = '<strong>Please fix the following errors:</strong><br>' + 
                            errorMessages.join('<br>');
        errorDiv.style.display = 'block';
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide error message after 10 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 10000);
    }
    
    return isValid;
}

/**
 * Show preview (in-page view) with read-only table
 */
function showPreview() {
    // Validate form first
    if (!validateForm()) {
        return;
    }
    
    const tableBody = document.getElementById('tableBody');
    const previewTableBody = document.getElementById('previewTableBody');
    previewTableBody.innerHTML = '';
    
    // Collect data from the main table
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const previewRow = document.createElement('tr');
        
        // Create the cells for preview
        const serialCell = row.querySelector('.serial-number');
        const labSelect = row.querySelector('.lab-select');
        const designationInput = row.querySelector('input[name="designation[]"]');
        const advertised = row.querySelector('input[name="advertisedPosts[]"]').value || '0';
        const screened = row.querySelector('input[name="screenedPosts[]"]').value || '0';
        const published = row.querySelector('input[name="publishedPosts[]"]').value || '0';
        const interviewed = row.querySelector('input[name="interviewedPosts[]"]').value || '0';
        const endorsed = row.querySelector('input[name="endorsedPosts[]"]').value || '0';
        const offers = row.querySelector('input[name="appointmentOffers[]"]').value || '0';
        
        // Handle rowspan for first row of group
        const serialHtml = serialCell ? `<td rowspan="3" class="serial-number" style="vertical-align: middle;">${serialCell.textContent}</td>` : '';
        const labHtml = serialCell ? `<td rowspan="3" style="vertical-align: middle; font-weight: 600; background-color: #f8fafc; color: #1e293b;">${labSelect.options[labSelect.selectedIndex] ? labSelect.options[labSelect.selectedIndex].text : ''}</td>` : '';
        
        previewRow.innerHTML = `
            ${serialHtml}
            ${labHtml}
            <td class="preview-designation-cell">${designationInput.value}</td>
            <td class="preview-number-cell">${advertised}</td>
            <td class="preview-number-cell">${screened}</td>
            <td class="preview-number-cell">${published}</td>
            <td class="preview-number-cell">${interviewed}</td>
            <td class="preview-number-cell">${endorsed}</td>
            <td class="preview-number-cell">${offers}</td>
        `;
        
        previewTableBody.appendChild(previewRow);
    });
    
    // Toggle views
    document.getElementById('formView').style.display = 'none';
    document.getElementById('previewView').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Close preview and return to form
 */
function closePreview() {
    document.getElementById('previewView').style.display = 'none';
    document.getElementById('formView').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle official form submission (from Preview)
 */
function finalSubmit() {
    // Collect data to save for the summary page
    const labsData = [];
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.querySelectorAll('tr');
    
    // Group rows by lab (3 rows per lab)
    for (let i = 0; i < rows.length; i += 3) {
        const labName = rows[i].dataset.labName;
        const labEntry = {
            labName: labName,
            designations: []
        };
        
        for (let j = 0; j < 3; j++) {
            const row = rows[i + j];
            if (!row) continue;
            
            const designation = row.querySelector('input[name="designation[]"]').value;
            const advertised = row.querySelector('input[name="advertisedPosts[]"]').value || 0;
            const screened = row.querySelector('input[name="screenedPosts[]"]').value || 0;
            const published = row.querySelector('input[name="publishedPosts[]"]').value || 0;
            const interviewed = row.querySelector('input[name="interviewedPosts[]"]').value || 0;
            const endorsed = row.querySelector('input[name="endorsedPosts[]"]').value || 0;
            const offers = row.querySelector('input[name="appointmentOffers[]"]').value || 0;
            
            labEntry.designations.push({
                designation,
                advertisedPosts: advertised,
                screenedPosts: screened,
                publishedPosts: published,
                interviewedPosts: interviewed,
                endorsedPosts: endorsed,
                appointmentOffers: offers
            });
        }
        labsData.push(labEntry);
    }
    
    // Save to localStorage
    const savedData = {
        labs: labsData,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('recruitmentFormData', JSON.stringify(savedData));

    // Show success modal
    showConfirmation();
}

/**
 * Show confirmation modal
 */
function showConfirmation() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        // Update modal body to include summary link
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody && !modalBody.innerHTML.includes('summary.html')) {
            modalBody.innerHTML += `
                <div style="margin-top: 2rem; padding: 1rem; background: #f0f7ff; border-radius: 8px; border: 1px solid #2563eb; text-align: center;">
                    <p style="color: #1e40af; margin-bottom: 1rem; font-weight: 600;">Would you like to see a summary of your data?</p>
                    <a href="summary.html" class="btn-primary" style="display: inline-block; text-decoration: none; background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 6px;">View Data Summary</a>
                </div>
            `;
        }
        modal.classList.add('active');
    }
}

/**
 * Close confirmation modal
 */
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Click outside listeners for all modals
 */
document.addEventListener('click', function(event) {
    const confirmationModal = document.getElementById('confirmationModal');
    const labSelectionModal = document.getElementById('labSelectionModal');
    const previewModal = document.getElementById('previewModal');
    
    if (event.target === confirmationModal) {
        closeModal();
    }
    if (event.target === labSelectionModal) {
        closeLabSelectionModal();
    }
    if (event.target === previewModal) {
        closePreview();
    }
});

/**
 * Prevent negative numbers 
 */
document.addEventListener('input', function(event) {
    if (event.target.type === 'number') {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
    }
});
