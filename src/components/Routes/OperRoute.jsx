import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const OperRoute = ({children}) => {

    const {token} = useSelector((state)=>state.auth);

    // const tokenValue = token.token;
    console.log(token);

    if(!token){
       return children
    }
    else{
        return <Navigate to="/tasks"></Navigate>
    }
}

export default OperRoute
