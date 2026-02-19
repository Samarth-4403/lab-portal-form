import React from 'react';
import { DESIGNATIONS } from '../constants';

export default function LabRowGroup({ labEntry, serialNumber, onChange }) {
    const handleInputChange = (rowIndex, field, value) => {
        // Prevent negative numbers
        const numValue = Math.max(0, parseInt(value) || 0);
        onChange(labEntry.name, rowIndex, field, numValue);
    };

    return (
        <>
            {labEntry.rows.map((row, index) => (
                <tr key={`${labEntry.name}-${index}`} className={`lab-group-${serialNumber}`}>
                    {/* Serial Number - Only on first row */}
                    {index === 0 && (
                        <td className="serial-number" rowSpan={3} style={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600 }}>
                            {serialNumber}
                        </td>
                    )}
                    
                    {/* Lab Name - Only on first row */}
                    {index === 0 && (
                        <td rowSpan={3} style={{ verticalAlign: 'middle' }}>
                            <select 
                                name="labName[]" 
                                required 
                                className="lab-select"
                                disabled
                                style={{ backgroundColor: '#f9fafb', cursor: 'not-allowed' }}
                                value={labEntry.name}
                            >
                                <option value={labEntry.name}>{labEntry.name}</option>
                            </select>
                        </td>
                    )}

                    <td>
                        <input 
                            type="text" 
                            value={row.designation} 
                            readOnly 
                            className="designation-display"
                            style={{ backgroundColor: '#f9fafb', cursor: 'default' }}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.advertisedPosts}
                            onChange={(e) => handleInputChange(index, 'advertisedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.screenedPosts}
                            onChange={(e) => handleInputChange(index, 'screenedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.publishedPosts}
                            onChange={(e) => handleInputChange(index, 'publishedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.interviewedPosts}
                            onChange={(e) => handleInputChange(index, 'interviewedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.yetToBeEndorsedPosts}
                            onChange={(e) => handleInputChange(index, 'yetToBeEndorsedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.endorsedPosts}
                            onChange={(e) => handleInputChange(index, 'endorsedPosts', e.target.value)}
                        />
                    </td>
                    <td>
                        <input 
                            type="number" 
                            min="0"
                            className="number-input"
                            value={row.appointmentOffers}
                            onChange={(e) => handleInputChange(index, 'appointmentOffers', e.target.value)}
                        />
                    </td>
                </tr>
            ))}
        </>
    );
}
