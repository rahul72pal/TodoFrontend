import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { createtodo, updateTask } from '../services/opreations/taskapi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { resetTask } from '../slices/taskSlice';
import { createChallengeTask } from '../services/opreations/Challenegeapi';
import { setChallenge, setStep } from '../slices/Challenge';

const AddTask = ({ challenge, challengeId, setAddTask }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { task, editTask, taskId } = useSelector((state) => state.task);
    // console.log("TASK =", task, "EDITTASK =", editTask);
    const [taskPriority, setTaskPriority] = useState('')
    // const { token } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.auth);
    const tokenValue = token.token;
    console.log(task)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        reset
    } = useForm();

    const handlechangePriority = (e) => {
        // console.log(e.target.value);
        setTaskPriority(e.target.value);
    }
    // console.log(taskPriority);


    const isUpdateForm = () => {
        const currentValues = getValues()
        console.log("Current=", currentValues);
        console.log("Task", task);

        return (
            currentValues.name !== task.name ||
            currentValues.description !== task.description ||
            currentValues.priority !== task.priority ||
            currentValues.alert !== task.alertMode ||
            currentValues.hours !== task.dueHours
        )
    }



    useEffect(() => {
        if (editTask) {
            console.log("API edit Called")
            setValue("name", task.name);
            setValue("description", task.description);
            setValue("priority", task.priority);
            setValue("hours", task.dueHours);
            setValue("alert", task.alertMode);
            setTaskPriority(task.priority);
            console.log(task.priority)
        }
    }, [task, editTask])

    const onFormSubmit = async (data) => {
        console.log("On Submit Form Data", data);

        const date = (hour) => {
            const current = new Date();
            console.log(current)
            const curretnHours = current.getHours();
            const updateDate = current.setHours(curretnHours + hour);
            // console.log(updateDate);
            return updateDate;
        }

        if (editTask) {

            if (isUpdateForm()) {

                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("description", data.description);
                formData.append("priority", data.priority);
                formData.append("dueHours", data.hours);
                formData.append("alertMode", data.alert);
                formData.append("taskId", taskId);
                formData.append("completed", task.completed);
                await updateTask(formData, tokenValue);
                reset()
                navigate('/tasks');
                dispatch(resetTask());
            }
            else {
                toast('Nothing Change!', {
                    icon: '😕',
                });
            }
        }

        else {
            const time = date(data.hours)
            console.log("Time = ", time)
            //edit fuctionallity
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("priority", data.priority);
            formData.append("dueHours", data?.hours);
            formData.append("alertMode", data?.alert);
            formData.append("challengeId", challengeId);
            // console.log("Form Data=",formData);
            console.log(tokenValue)
            if (challenge) {
                const result = await createChallengeTask(formData, tokenValue)
                console.log("Result of the challenge Task ", result);
                dispatch(setChallenge(result?.challenge))
                setAddTask(false)
                //    dispatch(setStep(3))
            } else {
                await createtodo(formData, tokenValue);
                navigate('/tasks')
                reset()
            }
        }
    }

    const onClickBack = () => {
        if (challenge) {
            setAddTask(false)
        } else {
            navigate(-1);
            dispatch(resetTask());
        }

    }

    return (
        <div className='text-white bg-gray-800 py-5 lg:w-[40%] px-5 rounded-xl md:w-full mx-auto'>

            <button className='px-3 py-1 text-black flex items-center gap-1 hover:bg-[#a764d4] hover:text-white font-semibold mt-6 rounded-xl bg-[#BA83DE]'
                onClick={() => onClickBack()}> <IoMdArrowRoundBack /> Back</button>

            <h1 className='text-center text-3xl font-semibold py-3'>{challenge ? "Add Challenge Task" : "Create new task"}</h1>

            {/* task form  */}
            <p className='py-3'>Schedule</p>
            <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-4 pb-4'>


                <label htmlFor="" className='bg-[#181818]'>
                    <input
                        type="text"
                        className='bg-[#181818] px-2 py-3 w-full mx-auto rounded-lg'
                        placeholder='Name'
                        {...register("name", { required: true })}
                    />
                    {
                        errors.name && (
                            <span className='text-red-600'>Name is Required**</span>
                        )
                    }
                </label>

                <textarea className='bg-[#181818] px-2 py-3 w-full mx-auto rounded-lg'
                    name="" id="" rows={6} cols={6}
                    placeholder='Description'
                    {...register("description", { required: true })}
                ></textarea>
                {
                    errors.description && (
                        <span className='text-red-600'>
                            Description is Required**
                        </span>
                    )
                }

                {/* priority */}
                {/* <div className='w-full pb-4 space-y-3'>
                    <p>Priority</p>
                    <div className='w-full flex gap-x-2 '>
                        <button {...register("priority", {required: true})} value={"red"} className='px-4 py-1 border-4 bg-red-500 text-black font-semibold border-red-800 rounded-xl'>Hard</button>
                        <button {...register("priority", {required: true})} value={"orange"} className='px-4 py-1 border-4  bg-orange-500 text-black font-semibold border-orange-800 rounded-xl'>Medium</button>
                        <button {...register("priority", {required: true})} value={"yellow"} className='px-4 py-1 border-4  bg-yellow-500 text-black font-semibold border-yellow-800 rounded-xl'>Low</button>
                    </div>
                </div> */}

                <div className='w-full space-y-2'>
                    <p>Set the Priority of your task</p>
                    <select className={`w-full
                      ${taskPriority === 'red' ? "bg-red-500" : "bg-[#1e1e1e]"} 
                      ${taskPriority === 'orange' ? "bg-orange-500" : "bg-[#1e1e1e]"} 
                      ${taskPriority === 'yellow' ? "bg-yellow-500" : "bg-[#1e1e1e]"} 
                      px-1 py-1 font-semibold text-white 
                     rounded-xl text-xl`}
                        {...register("priority", { required: true })}
                        onChange={(e) => handlechangePriority(e)}
                        value={taskPriority}
                    >
                        <option
                            value="yellow"
                            className='px-4 py-1 border-4  bg-yellow-500 text-black font-semibold border-orange-800 rounded-xl'
                        >Low</option>
                        <option
                            value="orange"
                            className='px-4 py-1 border-4  bg-orange-500 text-black font-semibold border-orange-800 rounded-xl'
                        >Medium</option>
                        <option
                            value="red"
                            className='px-4 py-1 border-4 bg-red-500 text-black font-semibold border-red-800 rounded-xl'
                        >High</option>
                    </select>
                </div>

                <div>
                    {
                        challenge ? (null) : (
                            <div>
                                <div className='w-full space-y-2'>
                                    <p>Complete the task in Hours</p>
                                    <select className='w-full
                     bg-[#1e1e1e] px-1 py-1 font-semibold text-purple-400 
                     rounded-xl text-xl'
                                        {...register("hours", { required: true })}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={4}>4</option>
                                        <option value={6}>6</option>
                                        <option value={8}>8</option>
                                        <option value={12}>12</option>
                                        <option value={16}>16</option>
                                        <option value={24}>24</option>
                                    </select>
                                </div>

                                <div className='text-white'>
                                    <label className="relative inline-flex items-center me-5 cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer"
                                            {...register("alert")}
                                        />
                                        <div className="w-11 h-6 bg-gray-700 rounded-full peer
                             dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300
                              dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                               peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white
                                after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
                                 peer-checked:bg-purple-600"></div>
                                        <span className="ms-3 lg:text-xl font-medium text-white dark:text-gray-300">Get alert for this task <span className='text-yellow-400 lg:text-xl'>Before 1 Hour</span> </span>
                                    </label>
                                </div>
                            </div>
                        )
                    }
                </div>

                <button type='submit' className='w-full hover:bg-purple-500 font-semibold
                 hover:text-white bg-purple-600 text-white text-center py-2 
                 rounded-xl'>
                    {
                        editTask ? ("Update The Task") : ("Create Task")
                    }
                </button>

            </form>

        </div>

    )
}

export default AddTask
