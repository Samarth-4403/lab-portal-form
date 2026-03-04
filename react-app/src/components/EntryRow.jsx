import React from 'react';

export default function EntryRow({ entry, index, onChange, onRemove }) {
    const handleInput = (cat, field, value) => {
        const numVal = parseInt(value) || 0;
        const currentData = entry[cat] || { m: 0, f: 0, o: 0 };
        onChange(index, cat, { ...currentData, [field]: numVal });
    };

    const sexOptions = [
        { label: 'Male', key: 'm' },
        { label: 'Female', key: 'f' },
        { label: 'Other', key: 'o' }
    ];

    const getSexTotal = (sexKey) => {
        return (entry.gen[sexKey] || 0) +
            (entry.sc[sexKey] || 0) +
            (entry.st[sexKey] || 0) +
            (entry.obc[sexKey] || 0) +
            (entry.ews[sexKey] || 0);
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
                <td rowSpan="3" className="serial-number">
                    <div className="sno-container">
                        <button
                            type="button"
                            className="row-remove-btn"
                            onClick={() => onRemove(index)}
                            title="Remove this entry"
                        >
                            &minus;
                        </button>
                        <span>{index + 1}</span>
                    </div>
                </td>
                <td rowSpan="3" className="dim-cell dim-cell-lab">{entry.lab}</td>
                <td rowSpan="3" className="dim-cell">{entry.group}</td>
                <td rowSpan="3" className="dim-cell">{entry.designation}</td>
                <td rowSpan="3" className="dim-cell">{entry.subGroup || 'N/A'}</td>
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
