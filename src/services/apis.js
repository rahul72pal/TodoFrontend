// require('dotenv').config();
// import dotenv from 'dotenv'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL 
//  dotenv.process.env.REACT_APP_BASE_URL;
console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
// console.log(BASE_URL);
// const BASE_URL = process.env.REACT_APP_BASE_URL;

//Auth ENDpoinsts
export const endpoints = {
    SENDOTP_API: BASE_URL + "/sendotp",
    LOGIN_API: BASE_URL + "/login",
    SINGUP_API: BASE_URL + "/singup",
}

//TODOS ENDS POINTS
export const taskendpoints = {
    CREATETODD_API: BASE_URL + "/createtodo",
    GETTODD_API: BASE_URL + "/alltodos",
    YESTERDAY: BASE_URL + "/yesterday",
    PREVIOUS: BASE_URL + "/previous",
    COMPLETED: BASE_URL + "/completed",
    DELETEAPI: BASE_URL + '/delete',
    UPDATETASK_API: BASE_URL + '/updateTask'
}