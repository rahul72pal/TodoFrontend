import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setChallenge, setStep } from '../../slices/Challenge';
import { createChallenge } from '../../services/opreations/Challenegeapi';

const ChallenegeInformation = () => {

    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false);

    // export 
    const COURSE_STATUS = {
        DRAFT: "Draft",
        START: "Start",
    }

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const days = [3,10, 15, 30, 45, 60, 75, 90, 100, 180, 360]

    const { challenge, editChallenge } = useSelector((state) => state.challenge)
    const { token } = useSelector((state) => state.auth);
    console.log(token)
    const tokenValue = token.token

    //on submit 
    const onsubmit = async (data) => {

        //if edit the challege

        //craete the challegne
        console.log(data)
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("days", Number(data.days));
        formData.append("status", COURSE_STATUS.DRAFT)

        //loading and call the backend and set the value
        setLoading(true);

        const result = await createChallenge(formData,tokenValue);
        if(result){
            dispatch(setStep(2));
            console.log("Challene result",result);
            dispatch(setChallenge(result))
        }

        setLoading(false);

    }

    return (
        <div className='w-full h-full font-[inter] mb-[100px]'>
            <div className='w-fit mx-auto bg-gray-800 px-4 py-5 rounded-xl border-4 border-gray-700 shadow-lg shadow-blue-300 shadow-inter'>
                <h1 className='w-full text-center lg:text-2xl font-semibold font-[inter] text-blue-300'>CHALLENGE INFORMATION</h1>
                <form onSubmit={handleSubmit(onsubmit)} className="p-4 space-y-4">
                    <div>
                        <label htmlFor="name">Challenge Title</label>
                        <input
                            type="text"
                            id="name"
                            // name="courseTitle"
                            // value={courseTitle}
                            className="w-full p-2 border  text-white bg-gray-600 border-gray-300 rounded"
                            placeholder='Enter your Challenge Name'
                            {...register("name", { required: true })}
                        />
                        {
                            errors.name && (
                                <span className='text-white'>Challenge Title is Required**</span>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="description">Short Challenge Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder='Course Description'
                            className="w-full p-2 bg-gray-600 text-white border border-gray-300 rounded"
                            {...register("description", { required: true })}
                        />
                        {
                            errors.description && (
                                <span>Challnege Description is required</span>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="days">Completed days</label>
                        <select
                            id="days"
                            name="days"
                            // value={category}
                            // onChange={handleInputChange}
                            className="w-full p-2 flex text-white bg-gray-600 border border-gray-300 rounded"
                            {...register("days", { required: true })}
                        >
                            {
                                challenge?.days && (
                                    <option className='text-blue-300' value={challenge?.days} >
                                        {challenge?.days}
                                    </option>
                                )
                            }
                            {
                                // !loading && 
                                days.map((category, index) => (
                                    <option className='py-2' key={index} value={category}>
                                        {category} Days
                                    </option>
                                ))
                            }
                        </select>
                        {errors.days && (
                            <span className='text-[14px] font-semibold text-white '>
                                Challenge Days is Required
                            </span>
                        )}
                    </div>
                    <div>
                        {
                            editChallenge && (
                                <button
                                    onClick={() => dispatch(setStep(2))}
                                >
                                    Continue withOut Saving
                                </button>
                            )
                        }
                        {
                            <button
                                className='bg-blue-300 text-black font-semibold px-3 py-1 rounded-lg'
                                type='submit'>
                                {!editChallenge ? "Next" : "Save Changes"}
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChallenegeInformation
