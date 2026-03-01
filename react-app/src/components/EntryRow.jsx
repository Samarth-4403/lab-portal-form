import React from 'react';

export default function EntryRow({ entry, index, onChange }) {
    const handleInput = (category, subfield, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        const updatedCategory = { ...entry[category], [subfield]: numValue };
        onChange(index, category, updatedCategory);
    };

    const sexOptions = [
        { key: 'm', label: 'M' },
        { key: 'f', label: 'F' },
        { key: 'o', label: 'O' }
    ];

    const getSexTotal = (sexKey) => {
        return ['gen', 'sc', 'st', 'obc', 'ews', 'oh', 'hh', 'vh', 'dbe', 'exServiceMan', 'minorityCommunity'].reduce((sum, cat) => sum + (entry[cat]?.[sexKey] || 0), 0);
    };

    const inPositionTotal = sexOptions.reduce((sum, sex) => sum + getSexTotal(sex.key), 0);
    const pipExceeded = inPositionTotal > entry.pip;

    const renderInputCells = (sexKey) => (
        <>
            <td className="section-cat-start"><input type="number" min="0" value={entry.gen[sexKey]} onChange={(e) => handleInput('gen', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.sc[sexKey]} onChange={(e) => handleInput('sc', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.st[sexKey]} onChange={(e) => handleInput('st', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.obc[sexKey]} onChange={(e) => handleInput('obc', sexKey, e.target.value)} /></td>
            <td className="section-cat-end"><input type="number" min="0" value={entry.ews[sexKey]} onChange={(e) => handleInput('ews', sexKey, e.target.value)} /></td>

            <td className="section-pwd-start"><input type="number" min="0" value={entry.oh[sexKey]} onChange={(e) => handleInput('oh', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.hh[sexKey]} onChange={(e) => handleInput('hh', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.vh[sexKey]} onChange={(e) => handleInput('vh', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.dbe[sexKey]} onChange={(e) => handleInput('dbe', sexKey, e.target.value)} /></td>

            <td><input type="number" min="0" value={entry.exServiceMan[sexKey]} onChange={(e) => handleInput('exServiceMan', sexKey, e.target.value)} /></td>
            <td><input type="number" min="0" value={entry.minorityCommunity[sexKey]} onChange={(e) => handleInput('minorityCommunity', sexKey, e.target.value)} /></td>
        </>
    );

    return (
        <>
            {/* First row with rowSpan */}
            <tr className={pipExceeded ? 'row-warning' : ''}>
                <td rowSpan="3" className="serial-number">{index + 1}</td>
                <td rowSpan="3" className="dim-cell dim-cell-lab">{entry.lab}</td>
                <td rowSpan="3" className="dim-cell">{entry.group}</td>
                <td rowSpan="3" className="dim-cell">{entry.designation}</td>
                <td rowSpan="3" className="dim-cell" style={{ fontWeight: 600, color: '#667eea', textAlign: 'center' }}>{entry.level}</td>
                <td rowSpan="3" className="preset-cell">{entry.pip}</td>
                <td className="sex-label-cell">Male</td>
                {renderInputCells('m')}
            </tr>
            {/* Second row (Female) */}
            <tr className={pipExceeded ? 'row-warning' : ''}>
                <td className="sex-label-cell">Female</td>
                {renderInputCells('f')}
            </tr>
            {/* Third row (Other) */}
            <tr className={pipExceeded ? 'row-warning' : ''}>
                <td className="sex-label-cell">Other</td>
                {renderInputCells('o')}
            </tr>
            {pipExceeded && (
                <tr className="validation-warning-row">
                    <td colSpan="18">
                        <span className="warning-msg">⚠ Row {index + 1}: Total In Position ({inPositionTotal}) exceeds PIP ({entry.pip})</span>
                    </td>
                </tr>
            )}
        </>
    );
}
