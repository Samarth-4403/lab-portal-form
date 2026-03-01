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
                            <th rowSpan="2">In Position</th>
                            <th colSpan="5" className="header-group header-category">Category</th>
                            <th colSpan="4" className="header-group header-pwd">PWD</th>
                            <th rowSpan="2">ExSvc</th>
                            <th rowSpan="2">Min.</th>
                        </tr>
                        <tr className="header-sub-row">
                            <th className="section-cat-start">Gen</th><th>SC</th><th>ST</th><th>OBC</th><th className="section-cat-end">EWS</th>
                            <th className="section-pwd-start">OH</th><th>HH</th><th>VH</th><th>dBe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => {
                            const renderDataCells = (sexKey) => (
                                <>
                                    <td className="section-cat-start">{entry.gen[sexKey]}</td>
                                    <td>{entry.sc[sexKey]}</td>
                                    <td>{entry.st[sexKey]}</td>
                                    <td>{entry.obc[sexKey]}</td>
                                    <td className="section-cat-end">{entry.ews[sexKey]}</td>

                                    <td className="section-pwd-start">{entry.oh[sexKey]}</td>
                                    <td>{entry.hh[sexKey]}</td>
                                    <td>{entry.vh[sexKey]}</td>
                                    <td>{entry.dbe[sexKey]}</td>

                                    <td>{entry.exServiceMan[sexKey]}</td>
                                    <td>{entry.minorityCommunity[sexKey]}</td>
                                </>
                            );

                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan="3" className="serial-number">{index + 1}</td>
                                        <td rowSpan="3" style={{ fontWeight: 600, textAlign: 'left' }}>{entry.lab}</td>
                                        <td rowSpan="3">{entry.group}</td>
                                        <td rowSpan="3" style={{ textAlign: 'left' }}>{entry.designation}</td>
                                        <td rowSpan="3" style={{ color: '#667eea', fontWeight: 600 }}>{entry.level}</td>
                                        <td rowSpan="3" className="preset-cell">{entry.pip}</td>
                                        <td className="sex-label-cell">Male</td>
                                        {renderDataCells('m')}
                                    </tr>
                                    <tr>
                                        <td className="sex-label-cell">Female</td>
                                        {renderDataCells('f')}
                                    </tr>
                                    <tr>
                                        <td className="sex-label-cell">Other</td>
                                        {renderDataCells('o')}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
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
