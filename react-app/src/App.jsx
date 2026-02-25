import { useState } from 'react';
import LabTable from './components/LabTable';
import EntryAdditionSection from './components/EntryAdditionSection';
import PreviewSection from './components/PreviewSection';

function App() {
  const [entries, setEntries] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add a new entry
  const handleAddEntry = (selection) => {
    const newEntry = {
      ...selection,
      advertisedPosts: 0,
      screenedPosts: 0,
      publishedPosts: 0,
      interviewedPosts: 0,
      yetToBeEndorsedPosts: 0,
      endorsedPosts: 0,
      appointmentOffers: 0
    };
    setEntries([...entries, newEntry]);
    setErrorMsg('');
  };

  // Remove last entry
  const handleRemoveLastEntry = () => {
    if (entries.length === 0) return;
    setEntries(entries.slice(0, -1));
  };

  // Handle entry input change
  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  // Validate and show preview
  const handleShowPreview = () => {
    setErrorMsg('');
    if (entries.length === 0) {
      setErrorMsg('Please add at least one entry.');
      return;
    }
    setIsPreviewMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submit
  const handleFinalSubmit = (data) => {
    const savedData = {
      entries: data,
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
          <br /><span>Recruitment Status Tracking</span>
        </h1>

        {!isPreviewMode && !showSuccess && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div id="formView">
              {errorMsg && (
                <div id="errorMessage" className="alert alert-danger">
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="section-title">Selection Criteria</div>
              <EntryAdditionSection 
                onAdd={handleAddEntry} 
                onRemoveLast={handleRemoveLastEntry}
                entryCount={entries.length}
              />

              <div className="section-title">Lab Recruitment Information</div>
              <LabTable 
                entries={entries} 
                onEntryChange={handleEntryChange} 
              />

              <div className="btn-container">
                <button type="button" className="btn-primary" onClick={handleShowPreview}>
                  Preview Submission
                </button>
              </div>
            </div>
          </form>
        )}

        {isPreviewMode && !showSuccess && (
          <PreviewSection 
            entries={entries} 
            onEdit={() => setIsPreviewMode(false)} 
            onSubmit={handleFinalSubmit} 
          />
        )}
      </div>

      {showSuccess && (
        <div className="modal-overlay active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Submission Successful</h3>
              <button type="button" className="modal-close" onClick={() => setShowSuccess(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #10b981, #059669)', 
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                }}>
                  <span style={{ color: 'white', fontSize: '1.8rem' }}>✓</span>
                </div>
                <p style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 700 }}>
                  Data submitted successfully!
                </p>
              </div>
              <p style={{ color: '#64748b', margin: '0.5rem 0', textAlign: 'center', fontSize: '0.9rem' }}>
                Your lab recruitment data has been saved and will be processed shortly.
              </p>
              <div style={{ 
                marginTop: '1.5rem', padding: '1.25rem', 
                background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', 
                borderRadius: '10px', border: '1px solid #c4b5fd', textAlign: 'center' 
              }}>
                <p style={{ color: '#5b21b6', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  Would you like to see a summary of your data?
                </p>
                <a href="summary.html" className="btn-primary" style={{ 
                  display: 'inline-block', textDecoration: 'none', padding: '0.6rem 1.5rem', fontSize: '0.85rem'
                }}>
                  View Data Summary
                </a>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowSuccess(false)}>
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
