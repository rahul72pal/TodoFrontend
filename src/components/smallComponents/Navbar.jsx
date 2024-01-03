import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
                <div className="text-white text-xl flex items-center gap-3 font-bold"><Link className='flex items-center gap-2' to={"/"}>Task Alert  <FaBell /></Link></div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Link to="/" className="text-white">Home</Link>
                    {/* <a href="https://rpportfolio-website.rahulpal5.repl.co/" className="text-white">About</a> */}
                    <a href="https://rpportfolio-website.rahulpal5.repl.co/" className="text-white">Contact</a>
                </div>
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    {token ? (
                        <div className='flex gap-3'>
                            <Link to="/tasks" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Tasks
                            </Link>
                            <Link to="/add-task" className="bg-green-500 text-white px-4 py-2 rounded">
                                Add Task
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-3'>
                            <Link to="/sign-up" className="bg-green-500 font-semibold text-white px-4 py-2 rounded">
                                Sign Up
                            </Link>
                            <Link to="/login" className="bg-green-500 font-semibold text-white px-4 py-2 rounded">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
