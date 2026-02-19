import React from 'react';

export default function PreviewSection({ labs, onEdit, onSubmit }) {
    
    const handleConfirm = () => {
        // Prepare data for saving/submission
        // Keeping logic similar to legacy `finalSubmit`
        // In a real app we might send this to a backend API
        
        const simplifiedData = labs.map(lab => ({
            labName: lab.name,
            designations: lab.rows.map(row => ({
                designation: row.designation,
                advertisedPosts: row.advertisedPosts,
                screenedPosts: row.screenedPosts,
                publishedPosts: row.publishedPosts,
                interviewedPosts: row.interviewedPosts,
                yetToBeEndorsedPosts: row.yetToBeEndorsedPosts,
                endorsedPosts: row.endorsedPosts,
                appointmentOffers: row.appointmentOffers
            }))
        }));

        onSubmit(simplifiedData);
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
                            <th style={{ width: '60px' }}>S. No.</th>
                            <th style={{ minWidth: '200px' }}>Name of Lab</th>
                            <th style={{ minWidth: '150px' }}>Designation</th>
                            <th style={{ minWidth: '120px' }}>No. of advertised posts</th>
                            <th style={{ minWidth: '180px' }}>No. of posts where application has been Screened by Screening committee</th>
                            <th style={{ minWidth: '200px' }}>No. of posts where Screening Result has been published & is in Public Domain</th>
                            <th style={{ minWidth: '180px' }}>No. of posts where interview has been conducted</th>
                            <th style={{ minWidth: '200px' }}>Recommendations of Selection Committee yet to be endorsed by RAB</th>
                            <th style={{ minWidth: '200px' }}>No. of posts where recommendations of Selection Committee has been endorsed by RAB, CSIR</th>
                            <th style={{ minWidth: '180px' }}>No. of posts where appointment offers have been made</th>
                        </tr>
                    </thead>
                    <tbody id="previewTableBody">
                        {labs.map((labEntry, index) => (
                            <React.Fragment key={labEntry.name}>
                                {labEntry.rows.map((row, rowIndex) => (
                                    <tr key={`${labEntry.name}-preview-${rowIndex}`}>
                                        {/* Serial Number & Name - only on first row */}
                                        {rowIndex === 0 && (
                                            <>
                                                <td rowSpan={3} className="serial-number" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                                <td rowSpan={3} style={{ verticalAlign: 'middle', fontWeight: 600, backgroundColor: '#f8fafc', color: '#1e293b' }}>
                                                    {labEntry.name}
                                                </td>
                                            </>
                                        )}
                                        <td className="preview-designation-cell">{row.designation}</td>
                                        <td className="preview-number-cell">{row.advertisedPosts}</td>
                                        <td className="preview-number-cell">{row.screenedPosts}</td>
                                        <td className="preview-number-cell">{row.publishedPosts}</td>
                                        <td className="preview-number-cell">{row.interviewedPosts}</td>
                                        <td className="preview-number-cell">{row.yetToBeEndorsedPosts}</td>
                                        <td className="preview-number-cell">{row.endorsedPosts}</td>
                                        <td className="preview-number-cell">{row.appointmentOffers}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
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
