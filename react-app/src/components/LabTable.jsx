import React from 'react';
import EntryRow from './EntryRow';

export default function LabTable({ entries, onEntryChange }) {
    const colCount = 21;

    return (
        <div className="table-responsive compact-table-wrap">
            <table className="pag-table compact-table" id="recruitmentTable">
                <thead>
                    <tr className="header-group-row">
                        <th rowSpan="2" className="col-sno">#</th>
                        <th rowSpan="2" className="col-lab">Lab</th>
                        <th rowSpan="2" className="col-grp">Grp</th>
                        <th rowSpan="2" className="col-post">Post Name</th>
                        <th rowSpan="2" className="col-level nowrap-th">Level</th>
                        <th rowSpan="2" className="col-pip">PIP</th>
                        <th colSpan="3" className="header-group section-inpos-end">In Position</th>
                        <th colSpan="5" className="header-group header-category">Category (In Position)</th>
                        <th colSpan="4" className="header-group header-pwd">PWD (In Position)</th>
                        <th rowSpan="2" className="col-num v-header"><span>Ex-Svc</span></th>
                        <th rowSpan="2" className="col-num v-header"><span>Minority</span></th>
                    </tr>
                    <tr className="header-sub-row">
                        <th className="col-num">Male</th>
                        <th className="col-num">Female</th>
                        <th className="col-num section-inpos-end">Others</th>
                        <th className="col-num section-cat-start">Gen</th>
                        <th className="col-num">SC</th>
                        <th className="col-num">ST</th>
                        <th className="col-num">OBC</th>
                        <th className="col-num section-cat-end">EWS</th>
                        <th className="col-num section-pwd-start">OH</th>
                        <th className="col-num">HH</th>
                        <th className="col-num">VH</th>
                        <th className="col-num">dBe*</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan={colCount} style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>
                                No entries yet — click <strong style={{ color: '#10b981' }}>+ Add Entry</strong> above.
                            </td>
                        </tr>
                    ) : (
                        entries.map((entry, index) => (
                            <EntryRow 
                                key={index}
                                entry={entry}
                                index={index}
                                onChange={onEntryChange}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
