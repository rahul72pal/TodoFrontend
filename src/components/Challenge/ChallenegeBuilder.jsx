import React, { useState } from 'react'
import AddTask from '../AddTask'
import { useDispatch, useSelector } from 'react-redux'
import { PiNotebookFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { completedTask } from '../../services/opreations/taskapi';
import { setTask } from '../../slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { setStep } from '../../slices/Challenge';
import { FaRightLong } from "react-icons/fa6";
import toast from 'react-hot-toast';

const ChallenegeBuilder = () => {
  const { challenge } = useSelector((state) => state.challenge)
  console.log("Challene Object = ", challenge)
  const [addTask, setAddTask] = useState(false)
  const dispatch = useDispatch();

  // const getAllTaks = async () => {
  //   const result = await getTask(tokenValue);
  //   // //console.log("DATA=", result);
  //   if (result && result?.data) {
  //     // setTask(result?.data);
  //     // setProgress(result.completed);
  //     // setComplatedTask(result.taskCompleted);
  //   }
  // }

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

  const onNext = ()=>{
    console.log(challenge?.task?.length)
    if(challenge?.task?.length === 0){
      toast('Add Atleast one task!', {
        icon: '☝️',
      });
    }
    else{
      dispatch(setStep(3))
    }
  }


  return (
    <div className='w-full h-full relative flex items-center justify-center'>
      <div className='w-full h-full text-center mx-auto'>
        <button className='bg-blue-300 mx-auto px-4 py-4 lg:text-4xl font-semibold text-black rounded-lg flex items-center gap-2 ' onClick={() => setAddTask(true)}>
          Add Tasks
          <div onClick={() => setAddTask(true)} >
            <FaPlus />
          </div>
        </button>

        <div className='mx-3 lg:w-[40%] lg:mx-auto '>
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
                        {/* <button onClick={() => onEditTask(data)} className='text-xl text-gray-500'><LuFileEdit /></button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='w-fit mx-auto mt-5'>
          <button className='px-3 py-3 bg-blue-300 rounded-xl 
        font-semibold font-[inter] lg:text-lg text-black flex items-center gap-2' onClick={() => onNext()}>
            Next <FaRightLong />
          </button>
        </div>
      </div>
      {addTask && (<div className='w-full lg:h-[100vh] h-full m-auto right-0 top-20 bottom-0 absolute pb-8 bg-opacity-70 backdrop-blur-md'>
        <div className='w-full lg:h-[100vh] h-full flex items-center justify-center'>
          <AddTask setAddTask={setAddTask} challenge={true} challengeId={challenge?._id} />
        </div>
      </div>)}

    </div>
  )
}

export default ChallenegeBuilder
