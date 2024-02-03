import React from 'react'
import { useSelector } from 'react-redux'
import ChallenegeBuilder from '../Challenge/ChallenegeBuilder'
import StartChallenge from '../Challenge/StartChallenge'
import ChallenegeInformation from '../Challenge/ChallenegeInformation'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FaCheck } from "react-icons/fa";

const HardChallange = () => {

    const {step} = useSelector((state)=> state.challenge)
    console.log("step ",step);


    const steps = [
        {
            id: 1,
            title: "Challenge Information",
        },
        {
            id: 2,
            title: "Add Task's",
        },
        {
            id: 3,
            title: "Start Your Challenge",
        },
    ]


    return (
        <div className='w-full text-white'>
            <div className=' h-full flex justify-center items-center w-full flex-col gap-x-2 '>

                <div className="flex w-[60%] items-center my-5">
                    {steps.map((item) => (
                        <React.Fragment key={item.id}>
                            <div
                                className={`${step >= item.id
                                    ? 'bg-blue-300 gap-4 text-black px-5 py-3 rounded-full text-2xl font-bold'
                                    : 'bg-gray-400 gap-4 text-black px-5 py-3 rounded-full text-2xl font-bold'
                                    }`}
                            >
                                {step > 0 && step > item.id ? (
                                    <FaCheck className='' />
                                ) : (
                                    <div>{item.id}</div>
                                )}
                            </div>
                            {item.id !== steps.length && (
                                <div className="flex-1">
                                    {/* Dashed lines for connection */}
                                    <div className={`h-0.7 border-2 border-dashed  ${item.id <= step ? "border-blue-300" : "border-gray-300"}`}></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>


                <div className='flex w-[75%] items-center justify-around my-6 '>
                    {
                        steps.map((item, index) => (
                            <div key={index}>
                                <>
                                    <div className={`${step >= item.id
                                        ? 'text-blue-300 rounded-full w-full text-lg font-semibold font-[poppins]'
                                        : 'text-gray-300 rounded-full w-full text-lg font-semibold font-[poppins]'
                                        }`} >
                                        <p >{item.title}</p>
                                    </div>
                                </>
                            </div>
                        ))
                    }
                </div>

                {step === 1 && <ChallenegeInformation />}
                {step === 2 && <ChallenegeBuilder />}
                {step === 3 && <StartChallenge />}
            </div>
        </div>
    )
}

export default HardChallange
