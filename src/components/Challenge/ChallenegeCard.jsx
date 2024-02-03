import React, { useState } from 'react'
import { PiNotebookFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../services/opreations/taskapi';
import { deleteChallenge } from '../../services/opreations/Challenegeapi';
import { useSelector } from 'react-redux';
import { Circle } from 'rc-progress';

const ChallenegeCard = ({ data, setChallenge }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const tokenValue = token.token;
    const navigate = useNavigate();

    const deletechallenge = async (challengeId) => {
        const result = await deleteChallenge(challengeId, tokenValue);
        console.log("Deleteing result of the challenege =", result);
        setChallenge(result?.challenge)
    }

    return (
        <div className='text-white py-2 lg:py-5 lg:px-2 flex flex-col transition-colors duration-300 ease-in-out'>
            <div className='flex  ml-2 lg:flex-row flex-col lg:items-center justify-center'>
                <div>
                    <h1 onClick={() => navigate(`/challenge/${data._id}`)}
                        className='lg:text-2xl font-bold text-center
                 font-[popins] cursor-pointer hover:text-[#BA83DE]'> 🌟 {data?.days} Days Challenge's 🌟</h1>
                    <div className='lg:ml-5 mt-4 '>
                        <p className='font-[inter] '> <span className='font-bold lg:text-xl font-[popins]'>Name:</span>  {data?.name}</p>
                        <p className='font-[inter] '> <span className='font-bold lg:text-xl font-[popins]'>Description:</span> {data?.description}</p>
                        <p className='font-[inter] '> <span className='font-bold lg:text-xl font-[popins]'>Status:</span> {data?.status}</p>
                        <p className='font-[inter] '> <span className='font-bold lg:text-xl font-[popins]'>Total Task: </span>{data?.task?.length} </p>
                        <p className='font-[inter] '> <span className='font-bold lg:text-xl font-[popins]'>Completed:</span> {Math.floor(data?.progress ? data?.progress: 0 )} %</p>
                    </div>
                    <div className='flex items-center justify-between mx-3'>
                        <button onClick={() => deletechallenge(data._id)}>delete</button>
                        {/* <button onClick={() => deletechallenge(data._id)}>edit</button> */}
                    </div>
                </div>
                <div className='w-fit relative shadow-lg shadow-blue-200  rounded-full '>
                    <Circle className='lg:w-[200px] w-[150px] h-[150px] lg:h-[200px] mx-auto' percent={data?.progress} strokeWidth={8} strokeColor="#BA83DE" />
                    <div className=' absolute text-2xl font-semibold text-[#BA83DE] font-[inter] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>{Math.floor(data?.progress ? data?.progress: 0 )} %</div>
                </div>
            </div>
            <div className={`${isOpen ? 'max-h-[9999px]' : 'max-h-0'
                } transition-max-h duration-300 h-full ease-in-out overflow-hidden`}>
                {isOpen && data?.task.map((task, index) => (
                    <div className={`flex flex-col space-y-4 h-full my-4 mx-3 `} key={index}>
                        <div className={`${task.priority === 'red' ? "border-red-700" :
                            task.priority === 'orange' ? "border-orange-500" :
                                "border-yellow-300"
                            } bg-[#181818] border-l-[25px] flex items-center justify-between px-3 py-2 rounded-lg`}>
                            <div>
                                <p className='text-xl font-semibold'>{task.name}</p>
                                <p className='text-sm my-3 text-gray-400'>{task.description}</p>
                                <div className='text-2xl'><PiNotebookFill /></div>
                            </div>
                            {/* <div className='flex items-center gap-3'>
                                <span onClick={() => handleToComplted(task)} className='cursor-pointer'>
                                    {
                                        task.completed ? (<div className='bg-[#68ed87] lg:w-10 lg:h-10 w-7 h-7 text-xl font-bold rounded-full text-black flex justify-center items-center'>
                                            <FaCheck className='font-bold' />
                                        </div>) : (<div className='lg:w-10 lg:h-10 w-7 h-7 border-4 rounded-full border-gray-500'></div>)
                                    }
                                </span>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className='transition-max-h duration-300 ease-in-out overflow-hidden'>
                <div className="accordion-header cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
                    <div className='font-[popins] text-lg mx-4'>{isOpen ? 'See less' : 'Sell All'}</div>
                </div>
            </div>
        </div>
    )
}

export default ChallenegeCard
