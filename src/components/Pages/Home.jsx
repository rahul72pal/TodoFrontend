import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/opreations/authApi';
import Navbar from '../smallComponents/Navbar';
import undraw from '../../assets/undraw_completed_m9ci.svg'

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    console.log("Token is Here = ",token);
    return (
        <div className="container mx-auto mt-8 text-center text-white p-5 flex flex-col justify-center items-center">
           
            {token && (<button onClick={()=> dispatch(logout(navigate))} className="bg-gray-500 text-white px-4 py-2 rounded">Logout</button>)}
            <h1 className="text-4xl font-bold mb-4">Welcome to Your Todo Task App</h1>
            <p className="text-lg mb-8">Stay organized and get things done!</p>

            <div className="flex justify-center space-x-4">
                <img src={undraw} alt="" />
            </div>
        </div>
    );
};

export default Home;
