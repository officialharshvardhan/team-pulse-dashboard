import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../redux/slices/membersSlice';


export default function StatusSelector({ member }) {
    const dispatch = useDispatch();
    const options = ['Working', 'Break', 'Meeting', 'Offline'];
    if (!member) return null;
    return (
        <div className="card" >
            <h4>Update Status</h4>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {options.map(o => (
                    <button key={o} className={`btn ${member.status === o ? 'btn-primary' : ''}`} onClick={() => dispatch(updateStatus({ memberId: member.id, status: o }))}>{o}</button>
                ))}
            </div>
        </div>
    );
}