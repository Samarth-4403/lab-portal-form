import React from 'react';

export default function EntryRow({ entry, index, onChange }) {
    const handleInputChange = (field, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        onChange(index, field, numValue);
    };

    return (
        <tr>
            <td className="serial-number">{index + 1}</td>
            <td className="dim-cell dim-cell-lab">{entry.lab}</td>
            <td className="dim-cell">{entry.dept}</td>
            <td className="dim-cell">{entry.group}</td>
            <td className="dim-cell">{entry.designation}</td>
            <td className="dim-cell">{entry.gender}</td>
            <td className="dim-cell">{entry.category}</td>
            
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.advertisedPosts}
                    onChange={(e) => handleInputChange('advertisedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.screenedPosts}
                    onChange={(e) => handleInputChange('screenedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.publishedPosts}
                    onChange={(e) => handleInputChange('publishedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.interviewedPosts}
                    onChange={(e) => handleInputChange('interviewedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.yetToBeEndorsedPosts}
                    onChange={(e) => handleInputChange('yetToBeEndorsedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.endorsedPosts}
                    onChange={(e) => handleInputChange('endorsedPosts', e.target.value)}
                />
            </td>
            <td>
                <input 
                    type="number" min="0" className="number-input"
                    value={entry.appointmentOffers}
                    onChange={(e) => handleInputChange('appointmentOffers', e.target.value)}
                />
            </td>
        </tr>
    );
}
