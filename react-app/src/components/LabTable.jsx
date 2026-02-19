import React from 'react';
import LabRowGroup from './LabRowGroup';

export default function LabTable({ labs, onLabChange }) {
    return (
        <div className="table-responsive">
            <table className="pag-table" id="recruitmentTable">
                <thead>
                    <tr>
                        <th style={{ width: '60px' }}>S. No.</th>
                        <th style={{ minWidth: '200px' }}>Name of Lab <span className="required">*</span></th>
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
                <tbody id="tableBody">
                    {labs.map((labEntry, index) => (
                        <LabRowGroup 
                            key={labEntry.name}
                            labEntry={labEntry}
                            serialNumber={index + 1}
                            onChange={onLabChange}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
