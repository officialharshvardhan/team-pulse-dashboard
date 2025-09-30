import { createSlice, nanoid } from '@reduxjs/toolkit';

const sampleMembers = [
    {
        id: 'm1', name: 'Harsh Vardhan', status: 'Working', tasks: [
            { id: 't1', title: 'Design mockups', due: '2025-10-10', progress: 20 }
        ]
    },
    {
        id: 'm2', name: 'Bhanu Pratap', status: 'Meeting', tasks: [
            { id: 't2', title: 'API integration', due: '2025-10-05', progress: 60 }
        ]
    },
    { id: 'm3', name: 'Shayam', status: 'Break', tasks: [] },
    { id: 'm4', name: 'Bhavya', status: 'Offline', tasks: [] },
];

const membersSlice = createSlice({
    name: 'members',
    initialState: {
        list: sampleMembers,
        filterStatus: 'All',
        sortByActiveTasks: false,
    },
    reducers: {
        setMembers: (state, action) => { state.list = action.payload; },
        updateStatus: (state, action) => {
            const { memberId, status } = action.payload;
            const m = state.list.find(x => x.id === memberId);
            if (m) m.status = status;
        },
        assignTask: {
            reducer(state, action) {
                const { memberId, task } = action.payload;
                const m = state.list.find(x => x.id === memberId);
                if (m) m.tasks.push(task);
            },
            prepare(memberId, title, due) {
                return { payload: { memberId, task: { id: nanoid(), title, due, progress: 0 } } };
            }
        },
        updateTaskProgress: (state, action) => {
            const { memberId, taskId, progress } = action.payload;
            const m = state.list.find(x => x.id === memberId);
            if (!m) return;
            const t = m.tasks.find(tt => tt.id === taskId);
            if (t) t.progress = Math.max(0, Math.min(100, progress));
        },
        setFilterStatus: (state, action) => { state.filterStatus = action.payload; },
        toggleSortByActiveTasks: (state) => { state.sortByActiveTasks = !state.sortByActiveTasks; }
    }
});


export const { setMembers, updateStatus, assignTask, updateTaskProgress, setFilterStatus, toggleSortByActiveTasks } = membersSlice.actions;
export default membersSlice.reducer;