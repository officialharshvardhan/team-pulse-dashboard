
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';
import { setFilterStatus, toggleSortByActiveTasks } from '../redux/slices/membersSlice';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { currentRole, currentUser } = useSelector(s => s.role);
    const membersState = useSelector(s => s.members);
    const members = membersState.list.slice();
    const [expandedMember, setExpandedMember] = useState(null);
    // filter
    const filtered = members.filter(m => membersState.filterStatus === 'All' ? true : m.status === membersState.filterStatus);

    // sort
    if (membersState.sortByActiveTasks) {
        filtered.sort((a, b) => b.tasks.filter(t => t.progress < 100).length - a.tasks.filter(t => t.progress < 100).length);
    }

    const summary = members.reduce((acc, m) => { acc[m.status] = (acc[m.status] || 0) + 1; return acc; }, {});

    const currentMember = members.find(m => m.name === currentUser) || members[0];

    return (
        <div className="layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="card" style={{ background:"#f8ebc3"}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>Summary</strong>
                            <div className="small">{Object.entries(summary).map(([k, v]) => `${v} ${k}`).join(' · ')}</div>
                        </div>
                        <div>
                            <button className="btn" onClick={() => dispatch(toggleSortByActiveTasks())}>Toggle sort by active tasks</button>
                        </div>
                    </div>
                </div>

                {currentRole === 'lead' && <TaskForm />}
                <div className="card " style={{ background:"#f8ebc2"}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>Members</strong>
                        
                    </div>
                    <div className="member-list" style={{ marginTop: 10 }}>
                        {members.map(m => (
                            <div key={m.id}>
                                <MemberCard member={m} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="card">
                    <h3>Welcome, {currentUser}</h3>
                    <div className="small">Role: {currentRole}</div>
                </div>

                {currentRole === 'member' && (
                    <>
                        <StatusSelector member={currentMember} />
                        <TaskList member={currentMember} />
                    </>
                )}

                {currentRole === 'lead' && (
                    <>
                        <div className="card membercard">
                            <h4>Members</h4>
                            <div style={{ display: 'flex', gap: 10 }}>
                            <select value={membersState.filterStatus} onChange={e => dispatch(setFilterStatus(e.target.value))}>
                                <option>All</option>
                                <option>Working</option>
                                <option>Break</option>
                                <option>Meeting</option>
                                <option>Offline</option>
                            </select>
                        </div>
                            <div className="member-list" style={{ marginTop: 10 }}>
                                {filtered.map(m => (
                                    <div key={m.id}>
                                        <div onClick={() => setExpandedMember(expandedMember === m.id ? null : m.id)} style={{ cursor: 'pointer' }}>
                                            <MemberCard member={m} />
                                        </div>
                                        {expandedMember === m.id && (
                                            <div style={{ marginLeft: 16, marginTop: 6 }}>
                                                <TaskList member={m} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}