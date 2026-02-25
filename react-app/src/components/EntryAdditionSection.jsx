import { useState } from 'react';
import { ALL_LABS, DEPARTMENTS, GROUPS_BY_DEPT, GENDERS, CATEGORIES, DESIGNATIONS_BY_GROUP } from '../constants';

export default function EntryAdditionSection({ onAdd, onRemoveLast, entryCount }) {
    const defaultDept = DEPARTMENTS[0];
    const defaultGroup = GROUPS_BY_DEPT[defaultDept][0];
    const defaultDesignation = DESIGNATIONS_BY_GROUP[defaultGroup][0];

    const [selection, setSelection] = useState({
        lab: ALL_LABS[0],
        dept: defaultDept,
        group: defaultGroup,
        designation: defaultDesignation,
        gender: GENDERS[0],
        category: CATEGORIES[0]
    });

    const handleDeptChange = (dept) => {
        const newGroup = GROUPS_BY_DEPT[dept][0];
        const newDesig = DESIGNATIONS_BY_GROUP[newGroup][0];
        setSelection(prev => ({
            ...prev,
            dept,
            group: newGroup,
            designation: newDesig
        }));
    };

    const handleGroupChange = (group) => {
        const newDesig = DESIGNATIONS_BY_GROUP[group][0];
        setSelection(prev => ({
            ...prev,
            group,
            designation: newDesig
        }));
    };

    const handleAdd = () => {
        onAdd(selection);
    };

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
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '1rem',
                alignItems: 'end',
                marginBottom: '1rem'
            }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lab</label>
                    <select value={selection.lab} onChange={(e) => setSelection({ ...selection, lab: e.target.value })}>
                        {ALL_LABS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
                    <select value={selection.dept} onChange={(e) => handleDeptChange(e.target.value)}>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Group</label>
                    <select value={selection.group} onChange={(e) => handleGroupChange(e.target.value)}>
                        {GROUPS_BY_DEPT[selection.dept].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Designation</label>
                    <select value={selection.designation} onChange={(e) => setSelection({ ...selection, designation: e.target.value })}>
                        {DESIGNATIONS_BY_GROUP[selection.group].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</label>
                    <select value={selection.gender} onChange={(e) => setSelection({ ...selection, gender: e.target.value })}>
                        {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                    <select value={selection.category} onChange={(e) => setSelection({ ...selection, category: e.target.value })}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Buttons row */}
            <div className="entry-buttons-row">
                <button type="button" className="btn-add" onClick={handleAdd}>
                    + Add Entry
                </button>
                <button 
                    type="button" 
                    className="btn-delete" 
                    onClick={onRemoveLast}
                    disabled={entryCount === 0}
                >
                    − Remove Entry
                </button>
            </div>
        </div>
    );
}
