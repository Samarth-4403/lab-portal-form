import { useState } from 'react';
import LabTable from './components/LabTable';
import LabSelectionModal from './components/LabSelectionModal';
import PreviewSection from './components/PreviewSection';
import { DESIGNATIONS } from './constants';

function App() {
  const [labs, setLabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add a new lab
  const handleAddLab = (labName) => {
    // Check if already exists (should be handled by modal filter, but double check)
    if (labs.some(l => l.name === labName)) return;

    const newLabEntry = {
      name: labName,
      rows: DESIGNATIONS.map(d => ({
        designation: d,
        advertisedPosts: 0,
        screenedPosts: 0,
        publishedPosts: 0,
        interviewedPosts: 0,
        yetToBeEndorsedPosts: 0,
        endorsedPosts: 0,
        appointmentOffers: 0
      }))
    };

    setLabs([...labs, newLabEntry]);
    setIsModalOpen(false);
  };

  // Delete last lab
  const handleDeleteLastLab = () => {
    if (labs.length === 0) return;
    setLabs(labs.slice(0, -1));
  };

  // Handle input change
  const handleLabChange = (labName, rowIndex, field, value) => {
    setLabs(labs.map(lab => {
      if (lab.name !== labName) return lab;
      
      const newRows = [...lab.rows];
      newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
      return { ...lab, rows: newRows };
    }));
  };

  // Validate and show preview
  const handleShowPreview = () => {
    setErrorMsg('');
    if (labs.length === 0) {
      setErrorMsg('Please add at least one lab entry.');
      return;
    }
    
    // Additional validation if needed (e.g. check for negative numbers)
    // By input type="number" and logic in LabRowGroup, we mostly handle this, but checking anyway
    
    setIsPreviewMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submit
  const handleFinalSubmit = (data) => {
    // Save to localStorage
    const savedData = {
      labs: data,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('recruitmentFormData', JSON.stringify(savedData));
    
    setShowSuccess(true);
    setIsPreviewMode(false);
  };

  return (
    <>
      <div className="pag-styled-container">
        <h1>
          Lab Recruitment Data Collection Form
          <br /><span style={{ fontSize: '0.6em', fontWeight: 'normal', color: '#555' }}>
            Recruitment Status Tracking
          </span>
        </h1>

        {!isPreviewMode && !showSuccess && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div id="formView">
              {/* Success/Error Messages */}
              {errorMsg && (
                <div id="errorMessage" className="alert alert-danger">
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Main Data Table Section */}
              <div className="section-title">Lab Recruitment Information</div>
              
              <LabTable labs={labs} onLabChange={handleLabChange} />

              <div className="table-controls">
                <button type="button" className="btn-add" onClick={() => setIsModalOpen(true)}>
                  + Add Lab Entry
                </button>
                <button 
                  type="button" 
                  className="btn-delete" 
                  disabled={labs.length === 0}
                  onClick={handleDeleteLastLab}
                >
                  Delete Lab Entry
                </button>
              </div>

              {/* Preview Button */}
              <div className="btn-container">
                <button type="button" className="btn-primary" onClick={handleShowPreview}>Preview Submission</button>
              </div>
            </div>
          </form>
        )}

        {isPreviewMode && !showSuccess && (
          <PreviewSection 
            labs={labs} 
            onEdit={() => setIsPreviewMode(false)} 
            onSubmit={handleFinalSubmit} 
          />
        )}
      </div>

      {/* Lab Selection Modal */}
      <LabSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleAddLab}
        addedLabs={labs.map(l => l.name)}
      />

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Submission Successful</h3>
              <button type="button" className="modal-close" onClick={() => setShowSuccess(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#059669', fontSize: '1.1rem', margin: '1rem 0' }}>
                ✓ Your lab recruitment data has been submitted successfully!
              </p>
              <p style={{ color: '#6b7280', margin: '1rem 0' }}>
                The data has been saved to the database and will be processed shortly.
              </p>
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f7ff', borderRadius: '8px', border: '1px solid #2563eb', textAlign: 'center' }}>
                    <p style={{ color: '#1e40af', marginBottom: '1rem', fontWeight: 600 }}>Would you like to see a summary of your data?</p>
                    {/* In a real react app, this would be a Link or a route */}
                    <a href="summary.html" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', background: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px' }}>View Data Summary</a>
                </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button type="button" className="btn-primary" onClick={() => setShowSuccess(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
