import React from 'react';

export default function EntryRow({ entry, index, onChange }) {
    const handleInput = (field, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        onChange(index, field, numValue);
    };

    const inPositionTotal = (entry.male || 0) + (entry.female || 0) + (entry.other || 0);
    const categoryTotal = (entry.gen || 0) + (entry.sc || 0) + (entry.st || 0) + (entry.obc || 0) + (entry.ews || 0);
    const pipExceeded = inPositionTotal > entry.pip;
    const categoryExceeded = categoryTotal > entry.pip;

    return (
        <>
            <tr className={pipExceeded || categoryExceeded ? 'row-warning' : ''}>
                <td className="serial-number">{index + 1}</td>
                <td className="dim-cell dim-cell-lab">{entry.lab}</td>
                <td className="dim-cell">{entry.group}</td>
                <td className="dim-cell">{entry.designation}</td>
                <td className="dim-cell" style={{ fontWeight: 600, color: '#667eea', textAlign: 'center' }}>{entry.level}</td>
                <td className="preset-cell">{entry.pip}</td>

                {/* In Position */}
                <td><input type="number" min="0" value={entry.male} onChange={(e) => handleInput('male', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.female} onChange={(e) => handleInput('female', e.target.value)} /></td>
                <td className="section-inpos-end"><input type="number" min="0" value={entry.other} onChange={(e) => handleInput('other', e.target.value)} /></td>

                {/* Category — Gen first */}
                <td className="section-cat-start"><input type="number" min="0" value={entry.gen} onChange={(e) => handleInput('gen', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.sc} onChange={(e) => handleInput('sc', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.st} onChange={(e) => handleInput('st', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.obc} onChange={(e) => handleInput('obc', e.target.value)} /></td>
                <td className="section-cat-end"><input type="number" min="0" value={entry.ews} onChange={(e) => handleInput('ews', e.target.value)} /></td>

                {/* PWD */}
                <td className="section-pwd-start"><input type="number" min="0" value={entry.oh} onChange={(e) => handleInput('oh', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.hh} onChange={(e) => handleInput('hh', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.vh} onChange={(e) => handleInput('vh', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.dbe} onChange={(e) => handleInput('dbe', e.target.value)} /></td>

                {/* Others */}
                <td><input type="number" min="0" value={entry.exServiceMan} onChange={(e) => handleInput('exServiceMan', e.target.value)} /></td>
                <td><input type="number" min="0" value={entry.minorityCommunity} onChange={(e) => handleInput('minorityCommunity', e.target.value)} /></td>
            </tr>
            {(pipExceeded || categoryExceeded) && (
                <tr className="validation-warning-row">
                    <td colSpan="21">
                        {pipExceeded && (
                            <span className="warning-msg">⚠ Row {index + 1}: In Position total ({inPositionTotal}) exceeds PIP ({entry.pip})</span>
                        )}
                        {pipExceeded && categoryExceeded && ' | '}
                        {categoryExceeded && (
                            <span className="warning-msg">⚠ Row {index + 1}: Category total ({categoryTotal}) exceeds PIP ({entry.pip})</span>
                        )}
                    </td>
                </tr>
            )}
        </>
    );
}
