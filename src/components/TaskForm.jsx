import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';


export default function TaskForm() {
    const members = useSelector(s => s.members.list);
    const dispatch = useDispatch();
    const [memberId, setMemberId] = useState(members[0]?.id || '');
    const [title, setTitle] = useState('');
    const [due, setDue] = useState('');


    function submit(e) {
        e.preventDefault();
        if (!memberId || !title) return alert('Select member and enter a title');
        dispatch(assignTask(memberId, title, due || new Date().toISOString().slice(0, 10)));
        setTitle(''); setDue('');
        alert('Task assigned');
    }


    return (
        <form className="card" style={{ background:"#f8ebc2"}} onSubmit={submit}>
            <h4>Assign Task</h4>
            <div className="form-row">
                <select className="select" value={memberId} onChange={e => setMemberId(e.target.value)}>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
            </div>
            <div className="form-row">
                <input className="input" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-row">
                <input type="date" className="input" value={due} onChange={e => setDue(e.target.value)} />
            </div>
            <div style={{ textAlign: 'right' }}>
                <button className="btn btn-primary" type="submit">Assign</button>
            </div>
        </form>
    );
}