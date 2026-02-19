import { useState, useMemo } from 'react';
import { ALL_LABS } from '../constants';

export default function LabSelectionModal({ isOpen, onClose, onConfirm, addedLabs }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLab, setSelectedLab] = useState(null);

    const availableLabs = useMemo(() => {
        return ALL_LABS.filter(lab => !addedLabs.includes(lab));
    }, [addedLabs]);

    const filteredLabs = useMemo(() => {
        if (!searchTerm.trim()) return availableLabs;
        return availableLabs.filter(lab => 
            lab.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [availableLabs, searchTerm]);

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => {
            if(e.target === e.currentTarget) onClose();
        }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Select Lab to Add</h3>
                    <button type="button" className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                        Select a lab to add.
                    </p>
                    
                    {/* Search Bar */}
                    <div style={{ marginBottom: '1rem' }}>
                        <input type="text" 
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                               placeholder="Search for a lab..." 
                               style={{ width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '0.375rem', fontSize: '1rem' }}
                        />
                    </div>
                    
                    <div className="lab-grid" id="labSelectionGrid">
                        {availableLabs.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem', gridColumn: '1 / -1' }}>
                                All labs have been added.
                            </p>
                        ) : filteredLabs.length === 0 ? (
                            <p className="no-results-msg" style={{ textAlign: 'center', color: '#ef4444', padding: '1rem', width: '100%', gridColumn: '1 / -1' }}>
                                No labs matching "{searchTerm}" found.
                            </p>
                        ) : (
                            filteredLabs.map((lab) => (
                                <label key={lab} className="lab-checkbox" htmlFor={`lab_${lab}`}>
                                    <input 
                                        type="radio" 
                                        name="selectedLab" 
                                        id={`lab_${lab}`} 
                                        value={lab}
                                        checked={selectedLab === lab}
                                        onChange={() => setSelectedLab(lab)}
                                    />
                                    <span className="lab-name">{lab}</span>
                                </label>
                            ))
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button 
                        type="button" 
                        className="btn-primary" 
                        onClick={() => {
                            if (selectedLab) {
                                onConfirm(selectedLab);
                                setSelectedLab(null); // Reset selection
                                setSearchTerm('');
                            } else {
                                alert('Please select a lab.');
                            }
                        }}
                    >
                        Add Lab
                    </button>
                </div>
            </div>
        </div>
    );
}
