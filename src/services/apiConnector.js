import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (methode, url , bodyData, headers, params)=>{
    console.log(methode, url , bodyData, headers, params);
    console.log("data 3",bodyData);
    return axiosInstance({
        method: `${methode}`,
        url: `${url}`,
        data: bodyData? bodyData: null,
        headers: headers? headers: null,
        params: params? params: null
    })
}