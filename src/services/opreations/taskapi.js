import { toast } from "react-hot-toast";
import { taskendpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { useDispatch } from "react-redux";
import { resetTask } from "../../slices/taskSlice";

const {
    CREATETODD_API,
    GETTODD_API,
    YESTERDAY,
    PREVIOUS,
    COMPLETED,
    DELETEAPI,
    UPDATETASK_API
} = taskendpoints;

// const dispatch = useDispatch();


export const createtodo = async(data,token)=>{
    console.log("Form Data 1",token);
    const toastId = toast.loading("Loaing..")
    let result = null;
    try {
        const response = await apiConnector("POST", CREATETODD_API, data, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE api =", response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Task Created Successfully");
        result = response.data.savedTodo;
    } catch (error) {
        console.log("Create Api error",error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}
export const getTask = async (token)=>{
    const toastId = toast.loading("Waiting...")
    let result ;
    try {
        const response = await apiConnector("GET", GETTODD_API ,null ,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("GET ALL TAKS API Res",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("")
        if(response.data){
            result = response.data
        }
        return;
       
    } catch (error) {
        console.log("GET API error",error);
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const yesterday = async(token)=>{
    const toastId = toast.loading("Waiting...")
    let result ;
    try {
        const response = await apiConnector("GET", YESTERDAY ,null ,{
            Authorization: `Bearer ${token}`,
        })
        console.log("GET API Res",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("")
        result = response.data.data
    } catch (error) {
        console.log("GET API error",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const previous = async(token)=>{
    const toastId = toast.loading("Waiting...")
    let result ;
    try {
        const response = await apiConnector("GET", PREVIOUS ,null ,{
            Authorization: `Bearer ${token}`,
        })
        // console.log("GET API Res",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("")
        result = response.data.data
    } catch (error) {
        console.log("GET API error",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
export const completedTask = async(taskId,token)=>{
    const toastId = toast.loading("Waiting...")
    let result ;
    console.log("TASK ID HERE 2 =",taskId);
    try {
        const response = await apiConnector("POST",COMPLETED, {taskId: taskId} ,{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        })
        console.log("GET API COMPLETD TASK = ",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // toast.success("Task Completed");
        toast('Well done!', {
            icon: '👍',
          });
        result = response.data.data
        toast.dismiss(toastId);
    } catch (error) {
        console.log("GET API error",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteTask = async(taskId,token)=>{
    const toastId = toast.loading("Waiting...")
    let result ;
    console.log("TASK ID HERE 2 =",taskId);
    try {
        const response = await apiConnector("DELETE",DELETEAPI, {taskId: taskId} ,{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        })
        console.log("GET API COMPLETD TASK = ",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Task Completed");
        result = response.data.data
        toast.dismiss(toastId);
    } catch (error) {
        console.log("GET API error",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateTask = async(data,token)=>{
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector("POST",UPDATETASK_API, data,{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        })

        console.log("UPdate Res=",response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Update Successfully");
        toast.dismiss(toastId)
        // dispatch(resetTask());
        return;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        toast.dismiss(toastId);
        return;
    }
}
