import { useState } from 'react';
import { ALL_LABS, DEPARTMENTS, GROUPS_BY_DEPT, DESIGNATIONS_BY_GROUP, getLevel } from '../constants';

export default function EntryAdditionSection({ onAdd, entryCount }) {
    const defaultDept = DEPARTMENTS[0];
    const defaultGroup = GROUPS_BY_DEPT[defaultDept][0];
    const defaultDesig = DESIGNATIONS_BY_GROUP[defaultGroup][0];

    const [selection, setSelection] = useState({
        lab: ALL_LABS[0],
        dept: defaultDept,
        group: defaultGroup,
        designation: defaultDesig.name,
        pip: 0,
        subGroup: 'N/A'
    });

    const level = getLevel(selection.group, selection.designation);

    const getInitialSubGroup = (dept, group) => {
        const isCadre = dept === 'Administration' && !['MTS', 'Canteen', 'N/A'].includes(group);
        return isCadre ? 'CCO' : 'N/A';
    };

    const handleDeptChange = (dept) => {
        const newGroup = GROUPS_BY_DEPT[dept][0];
        const defaultSubGroup = getInitialSubGroup(dept, newGroup);

        const designations = DESIGNATIONS_BY_GROUP[newGroup] || [];
        const filtered = designations.filter(d => defaultSubGroup === 'N/A' || d.subGroup === defaultSubGroup);
        const newDesig = filtered.length > 0 ? filtered[0] : (designations[0] || { name: 'N/A' });

        setSelection(prev => ({
            ...prev,
            dept,
            group: newGroup,
            designation: newDesig.name,
            subGroup: defaultSubGroup
        }));
    };

    const handleGroupChange = (group) => {
        const defaultSubGroup = getInitialSubGroup(selection.dept, group);

        const designations = DESIGNATIONS_BY_GROUP[group] || [];
        const filtered = designations.filter(d => defaultSubGroup === 'N/A' || d.subGroup === defaultSubGroup);
        const newDesig = filtered.length > 0 ? filtered[0] : (designations[0] || { name: 'N/A' });

        setSelection(prev => ({ ...prev, group, designation: newDesig.name, subGroup: defaultSubGroup }));
    };

    const handleSubGroupChange = (subGroup) => {
        const designations = DESIGNATIONS_BY_GROUP[selection.group] || [];
        const filtered = designations.filter(d => subGroup === 'N/A' || d.subGroup === subGroup);
        const newDesig = filtered.length > 0 ? filtered[0] : (designations[0] || { name: 'N/A' });

        setSelection(prev => ({ ...prev, subGroup, designation: newDesig.name }));
    };

    const handleAdd = () => {
        onAdd({ ...selection, level });
    };

    const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' };

    return (
        <div className="entry-addition-section" style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                alignItems: 'end',
                marginBottom: '1rem'
            }}>
                <div className="form-group">
                    <label style={labelStyle}>Lab</label>
                    <select value={selection.lab} onChange={(e) => setSelection({ ...selection, lab: e.target.value })}>
                        {ALL_LABS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Department</label>
                    <select value={selection.dept} onChange={(e) => handleDeptChange(e.target.value)}>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Group</label>
                    <select value={selection.group} onChange={(e) => handleGroupChange(e.target.value)}>
                        {GROUPS_BY_DEPT[selection.dept].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                {selection.dept === 'Administration' && !['MTS', 'Canteen', 'N/A'].includes(selection.group) && (
                    <div className="form-group">
                        <label style={labelStyle}>Sub Groups</label>
                        <select value={selection.subGroup} onChange={(e) => handleSubGroupChange(e.target.value)}>
                            <option value="CCO">CCO</option>
                            <option value="Non-CCO">Non-CCO</option>
                        </select>
                    </div>
                )}
                <div className="form-group">
                    <label style={labelStyle}>Designation</label>
                    <select value={selection.designation} onChange={(e) => setSelection({ ...selection, designation: e.target.value })}>
                        {(DESIGNATIONS_BY_GROUP[selection.group] || [])
                            .filter(d => selection.subGroup === 'N/A' || d.subGroup === selection.subGroup)
                            .map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={labelStyle}>Level</label>
                    <input type="text" value={level} readOnly
                        style={{ backgroundColor: '#e2e8f0', cursor: 'not-allowed', fontWeight: 600, color: '#667eea' }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ ...labelStyle, color: '#059669' }}>PIP</label>
                    <input type="number" min="0" value={selection.pip}
                        onChange={(e) => setSelection({ ...selection, pip: Math.max(0, parseInt(e.target.value) || 0) })}
                        style={{ fontWeight: 600 }}
                    />
                </div>
            </div>

            <div className="entry-buttons-row">
                <button type="button" className="btn-add" onClick={handleAdd}>+ Add Entry</button>
            </div>
        </div>
    );
}
