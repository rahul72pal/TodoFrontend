import { combineReducers } from "@reduxjs/toolkit";

import authReducers from '../slices/authSlice';
import taskSlice from "../slices/taskSlice";
import Challenge from "../slices/Challenge";



const rootReducer = combineReducers({
    auth: authReducers ,
    task: taskSlice,
    challenge: Challenge
})

export default rootReducer;