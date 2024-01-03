import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: null,
    editTask: false,
    taskId: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTask: (state, action)=>{
            state.task = action.payload
        },
        setEditTask: (state, action)=>{
            state.editTask = action.payload
        },
        setTaskId: (state, action)=>{
            state.taskId = action.payload
        },
        resetTask: (state)=>{
            state.task = null,
            state.editTask = null
        },
    },
});

export const {
    setTask,
    setEditTask,
    resetTask,
    setTaskId
} = taskSlice.actions;

export default taskSlice.reducer