import React from 'react';

export default function PreviewSection({ entries, onEdit, onSubmit }) {
    return (
        <div id="previewView">
            <div className="section-title" style={{ marginTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Preview Your Submission</span>
                <button type="button" className="btn-secondary" onClick={onEdit} style={{ minWidth: 'auto', padding: '0.5rem 1rem' }}>&larr; Back to Edit</button>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Please review your data before final submission.</p>
            
            <div className="table-responsive">
                <table className="pag-table compact-table" id="previewTable">
                    <thead>
                        <tr className="header-group-row">
                            <th rowSpan="2">#</th>
                            <th rowSpan="2">Lab</th>
                            <th rowSpan="2">Group</th>
                            <th rowSpan="2">Post</th>
                            <th rowSpan="2">Level</th>
                            <th rowSpan="2">PIP</th>
                            <th colSpan="3" className="header-group section-inpos-end">In Position</th>
                            <th colSpan="5" className="header-group header-category">Category</th>
                            <th colSpan="4" className="header-group header-pwd">PWD</th>
                            <th rowSpan="2">ExSvc</th>
                            <th rowSpan="2">Min.</th>
                        </tr>
                        <tr className="header-sub-row">
                            <th>Male</th><th>Female</th><th className="section-inpos-end">Others</th>
                            <th className="section-cat-start">Gen</th><th>SC</th><th>ST</th><th>OBC</th><th className="section-cat-end">EWS</th>
                            <th className="section-pwd-start">OH</th><th>HH</th><th>VH</th><th>dBe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td className="serial-number">{index + 1}</td>
                                <td style={{ fontWeight: 600, textAlign: 'left' }}>{entry.lab}</td>
                                <td>{entry.group}</td>
                                <td style={{ textAlign: 'left' }}>{entry.designation}</td>
                                <td style={{ color: '#667eea', fontWeight: 600 }}>{entry.level}</td>
                                <td className="preset-cell">{entry.pip}</td>
                                <td>{entry.male}</td>
                                <td>{entry.female}</td>
                                <td className="section-inpos-end">{entry.other}</td>
                                <td className="section-cat-start">{entry.gen}</td>
                                <td>{entry.sc}</td>
                                <td>{entry.st}</td>
                                <td>{entry.obc}</td>
                                <td className="section-cat-end">{entry.ews}</td>
                                <td className="section-pwd-start">{entry.oh}</td>
                                <td>{entry.hh}</td>
                                <td>{entry.vh}</td>
                                <td>{entry.dbe}</td>
                                <td>{entry.exServiceMan}</td>
                                <td>{entry.minorityCommunity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="btn-container">
                <button type="button" className="btn-secondary" onClick={onEdit}>Edit Data</button>
                <button type="button" className="btn-primary" onClick={() => onSubmit(entries)} style={{ backgroundColor: '#10b981' }}>Confirm & Submit</button>
            </div>
        </div>
    );
}
