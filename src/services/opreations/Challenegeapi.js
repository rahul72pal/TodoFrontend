import {toast} from "react-hot-toast";
import { challenegeEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import axios from "axios";


const {
    CREATECHALLLENGEAPI,
    CREATETASKCHANLLENGEAPI,
    STARTCHALLENGEAPI,
    USERCHALLENGEAPI,
    CHALLENGEDETAILSAPI,
    DELETECHALLENGEAPI,
    COMPLETEDCHALLENGETASKAPI
} = challenegeEndPoints;

export const createChallenge =async (data,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Loading..")
    let result = null;
    try {

        const response = await apiConnector("POST", CREATECHALLLENGEAPI, data, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE api =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Challenge Created Successfully");
        result = response.data.savedChallenge;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createChallengeTask =async (data,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Loading..")
    let result = null;
    try {

        const response = await apiConnector("POST", CREATETASKCHANLLENGEAPI, data, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE api =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Task Created Successfully");
        result = response.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const startChallenge =async (challengeId,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Loading..")
    let result = null;
    try {
        const response = await apiConnector("POST", STARTCHALLENGEAPI, {challengeId:challengeId}, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE api =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Task Created Successfully");
        result = response.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const userChallenge = async (challengeId,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Waiting...")
    let result = null;
    try {
        const response = await apiConnector("GET", USERCHALLENGEAPI, {challengeId:challengeId}, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE api =", response);
        if(!response?.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("Task Created Successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}
export const userChallengeDetails = async (challengeId,token)=>{
    console.log("Form Data userChallengeDetails ",challengeId);
    const toastId = toast.loading("Waiting...")
    let result = null;
    try {
        const response = await apiConnector("POST", CHALLENGEDETAILSAPI, challengeId, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        // const response = await axios.post("http://localhost:3000/api/v1/challenge/challengeDetails",challengeId,{
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        // })

        console.log("Challenge Details Response API =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("Task Created Successfully");
        result = response?.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteChallenge =async (challengeId,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Deleting..")
    let result = null;
    try {
        const response = await apiConnector("POST", DELETECHALLENGEAPI, {challengeId:challengeId}, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE api =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("Task Deleted Successfully");
        toast.success('Challenge Deleted Successfully!', {
            icon: '🗑️',
        });
        result = response?.data?.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const compltedChallengeTask =async (challengeTaskId, challengeId,token)=>{
    console.log("challengeTaskId, challengeId,token",challengeTaskId, challengeId.challengeId,token);
    const toastId = toast.loading("WAITING...")
    let result = null;
    try {
        const response = await apiConnector("POST", COMPLETEDCHALLENGETASKAPI, {
            challengeTaskId: challengeTaskId,
            challengeId: challengeId.challengeId
        }, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("Result of the  complated task of  = == API ====",response);
        if(!response.data.success){
            toast(response.data.message);
        }
        // toast.success("Task Deleted Successfully");
        toast.success('Task Completed Successfully!', {
            icon: '👍',
        });
        result = response?.data?.data;

    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}
