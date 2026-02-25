import React from 'react';
import EntryRow from './EntryRow';

export default function LabTable({ entries, onEntryChange }) {
    return (
        <div className="table-responsive">
            <table className="pag-table" id="recruitmentTable">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>S. No.</th>
                        <th>Lab</th>
                        <th>Dept</th>
                        <th>Group</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Category</th>
                        <th>Adv. Posts</th>
                        <th>Screened</th>
                        <th>Published</th>
                        <th>Interviewed</th>
                        <th>Yet to Endorse</th>
                        <th>Endorsed</th>
                        <th>Offers</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {entries.length === 0 ? (
                        <tr>
                            <td colSpan="14" style={{ textAlign: 'center', padding: '3rem 2rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                No entries added yet. Select criteria above and click <strong style={{ color: '#10b981' }}>+ Add Entry</strong> to begin.
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
