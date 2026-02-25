import React from 'react';

export default function PreviewSection({ entries, onEdit, onSubmit }) {
    
    const handleConfirm = () => {
        // Data is already in the correct flat format in entries
        onSubmit(entries);
    };

    return (
        <div id="previewView">
            <div className="section-title" style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Preview Your Submission</span>
                <button type="button" className="btn-secondary" onClick={onEdit} style={{ minWidth: 'auto', padding: '0.5rem 1rem' }}>&larr; Back to Edit</button>
            </div>
            
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Please review your data before final submission. Click <strong>Edit</strong> to make changes or <strong>Submit</strong> to finalize.
            </p>
            
            <div className="table-responsive">
                <table className="pag-table" id="previewTable">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>S. No.</th>
                            <th style={{ minWidth: '150px' }}>Lab</th>
                            <th style={{ minWidth: '120px' }}>Dept</th>
                            <th style={{ minWidth: '100px' }}>Group</th>
                            <th style={{ minWidth: '120px' }}>Designation</th>
                            <th style={{ minWidth: '80px' }}>Gender</th>
                            <th style={{ minWidth: '100px' }}>Category</th>
                            <th style={{ minWidth: '80px' }}>Adv.</th>
                            <th style={{ minWidth: '80px' }}>Scr.</th>
                            <th style={{ minWidth: '80px' }}>Pub.</th>
                            <th style={{ minWidth: '80px' }}>Int.</th>
                            <th style={{ minWidth: '80px' }}>Yet.</th>
                            <th style={{ minWidth: '80px' }}>End.</th>
                            <th style={{ minWidth: '80px' }}>Off.</th>
                        </tr>
                    </thead>
                    <tbody id="previewTableBody">
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td className="serial-number" style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>{entry.lab}</td>
                                <td>{entry.dept}</td>
                                <td>{entry.group}</td>
                                <td>{entry.designation}</td>
                                <td>{entry.gender}</td>
                                <td>{entry.category}</td>
                                <td className="preview-number-cell">{entry.advertisedPosts}</td>
                                <td className="preview-number-cell">{entry.screenedPosts}</td>
                                <td className="preview-number-cell">{entry.publishedPosts}</td>
                                <td className="preview-number-cell">{entry.interviewedPosts}</td>
                                <td className="preview-number-cell">{entry.yetToBeEndorsedPosts}</td>
                                <td className="preview-number-cell">{entry.endorsedPosts}</td>
                                <td className="preview-number-cell">{entry.appointmentOffers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="btn-container">
                <button type="button" className="btn-secondary" onClick={onEdit}>Edit Data</button>
                <button type="button" className="btn-primary" onClick={handleConfirm} style={{ backgroundColor: '#10b981' }}>Confirm & Submit Form</button>
            </div>
        </div>
    );
}

