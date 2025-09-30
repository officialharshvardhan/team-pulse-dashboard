import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';


export default function Header() {
    const dispatch = useDispatch();
    const { currentRole, currentUser } = useSelector(s => s.role);
    return (
        <div className="header">
            <div>
                <h2>💼Team Pulse</h2>
                <div className="small">Signed in as <strong>{currentUser}</strong> · <span className="small">({currentRole})</span></div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: '#45f1a1', gap: 8 }} className="btn" onClick={() => dispatch(switchRole(currentRole === 'member' ? 'lead' : 'member'))}>
                    Switch to {currentRole === 'member' ? 'Team Lead' : 'Team Member'}
                </button>
            </div>
        </div>
    );
}