import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskProgress } from '../redux/slices/membersSlice';


export default function TaskList({ member }) {
    const dispatch = useDispatch();
    if (!member) return null;
    return (
        <div className="card" >
            <h4>Your Tasks</h4>
            {member.tasks.length === 0 && <div className="small">No tasks assigned</div>}
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {member.tasks.map(t => (
                    <div key={t.id} className="task card">
                        <div style={{ flex: 1 }}>
                            <div><strong>{t.title}</strong></div>
                            <div className="small">Due: {t.due}</div>
                            <div className="progress" style={{ marginTop: 8 }}><i style={{ width: t.progress + '%' }}></i></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 12 }}>
                            <div className="small">{t.progress}%</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <button className="btn" onClick={() => dispatch(updateTaskProgress({ memberId: member.id, taskId: t.id, progress: t.progress - 10 }))}>-10%</button>
                                <button className="btn" onClick={() => dispatch(updateTaskProgress({ memberId: member.id, taskId: t.id, progress: t.progress + 10 }))}>+10%</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}