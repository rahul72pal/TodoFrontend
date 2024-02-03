import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PiNotebookFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { completedTask } from '../../services/opreations/taskapi';
import { deleteChallenge, userChallenge } from '../../services/opreations/Challenegeapi';
import ChallenegeCard from '../Challenge/ChallenegeCard';

const ChallengePage = () => {

    const { challenge } = useSelector((state) => state.challenge);
    const [challenges, setChallenge] = useState([])
    console.log("Challenge", challenge)
    const { token } = useSelector((state) => state.auth);
    const tokenValue = token.token;

    const handleToComplted = async (data) => {

        if (data.completed) {
            toast('Alredy Completed!', {
                icon: '😃',
            });
        }
        else {
            await completedTask(data._id, tokenValue);
            // await getAllTaks();
            // await previousTaskData();
        }
        // //console.log("TASK ID HERE =", id);

    };
    const getChallenge = async () => {
        const result = await userChallenge(challenge?._id, tokenValue);
        console.log("Challenges =", result);
        setChallenge(result)
    }

    useEffect(() => {
        getChallenge()
    }, [])

   

    return (
        <div className='w-full'>
            <p className='text-white text-center lg:text-4xl py-5 font-semibold font-[popins] text-xl'>Complete Your Challenge 🚀</p>
            <div className='w-full flex flex-col space-y-5 gap-4 mb-[100px] mt-[10px]'>
                {
                    challenges && challenges.map((data, index) => (
                        <div className='lg:w-4/12 mx-3 border-2 lg:mx-auto  bg-gray-900 rounded-xl shadow-lg shadow-blue-300'>
                            <ChallenegeCard setChallenge={setChallenge} data={data} />
                        </div>
                    ))
                }
            </div>
            {/* <div className='w-[40%] border-2 border-green-500 mx-auto text-white '>
                {
                    challenge?.task.map((data) => (
                        <div key={data._id} className='w-full my-5'>
                            <div className={`flex flex-col space-y-3`} >
                                <div className={`${data.priority === 'red' ? "border-red-700" :
                                    data.priority === 'orange' ? "border-orange-500" :
                                        "border-yellow-300"
                                    } bg-[#181818] border-l-[25px] flex items-center justify-between px-3 py-2 rounded-lg`}>
                                    <div>
                                        <p className='text-xl font-semibold'>{data.name}</p>
                                        <p className='text-sm my-3 text-gray-400'>{data.description}</p>
                                        <div className='text-2xl'><PiNotebookFill /></div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <span onClick={() => handleToComplted(data)} className='cursor-pointer'>
                                            {
                                                data.completed ? (<div className='bg-[#68ed87] lg:w-10 lg:h-10 w-7 h-7 text-xl font-bold rounded-full text-black flex justify-center items-center'>
                                                    <FaCheck className='font-bold' />
                                                </div>) : (<div className='lg:w-10 lg:h-10 w-7 h-7 border-4 rounded-full border-gray-500'></div>)
                                            }
                                        </span>
                                        <div className='flex gap-2'>
                                            {/* <button onClick={() => handleToDelete(data._id)} className='text-2xl text-red-500'><MdOutlineDeleteOutline /></button> */}
                                            {/* <button onClick={() => onEditTask(data)} className='text-xl text-gray-500'><LuFileEdit /></button> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> */}
        </div>
    )
}

export default ChallengePage
