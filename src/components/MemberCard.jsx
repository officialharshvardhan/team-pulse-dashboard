import React from 'react';


export default function MemberCard({ member }) {
    const activeTasks = member.tasks.filter(t => t.progress < 100).length;
    return (
        <div className="member-row card">
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{member.name}</strong>
                    <span className="status-badge">{member.status}</span>
                </div>
                <div className="small">{activeTasks} active task(s)</div>
            </div>
        </div>
    );
}