// require('dotenv').config();
// import dotenv from 'dotenv'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL 
//  dotenv.process.env.REACT_APP_BASE_URL;
console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
// console.log(BASE_URL);
// const BASE_URL = process.env.REACT_APP_BASE_URL;

//Auth ENDpoinsts
export const endpoints = {
    SENDOTP_API: BASE_URL + "/todos/sendotp",
    LOGIN_API: BASE_URL + "/todos/login",
    SINGUP_API: BASE_URL + "/todos/singup",
}

//TODOS ENDS POINTS
export const taskendpoints = {
    CREATETODD_API: BASE_URL + "/todos/createtodo",
    GETTODD_API: BASE_URL + "/todos/alltodos",
    YESTERDAY: BASE_URL + "/todos/yesterday",
    PREVIOUS: BASE_URL + "/todos/previous",
    COMPLETED: BASE_URL + "/todos/completed",
    DELETEAPI: BASE_URL + '/todos/delete',
    UPDATETASK_API: BASE_URL + '/todos/updateTask'
}

//CHALLENGE ENDS POINST
export const challenegeEndPoints = {
    CREATECHALLLENGEAPI: BASE_URL + "/challenge/createChallenge",
    CREATETASKCHANLLENGEAPI: BASE_URL + "/challenge/createChallenge-task",
    STARTCHALLENGEAPI: BASE_URL + "/challenge/createChallenge-task-start",
    USERCHALLENGEAPI: BASE_URL + '/challenge/challenges',
    CHALLENGEDETAILSAPI: BASE_URL+ '/challenge/challengeDetails',
    DELETECHALLENGEAPI: BASE_URL+ '/challenge/deleteChallenge',
    COMPLETEDCHALLENGETASKAPI: BASE_URL + '/challenge/challengeTaskComplated'
}