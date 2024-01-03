import { combineReducers } from "@reduxjs/toolkit";

import authReducers from '../slices/authSlice';
import taskSlice from "../slices/taskSlice";



const rootReducer = combineReducers({
    auth: authReducers ,
    task: taskSlice,
})

export default rootReducer;