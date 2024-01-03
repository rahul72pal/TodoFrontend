import React, { useEffect, useState } from 'react'
import { TfiPencil } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Line, Circle } from 'rc-progress';
import { PiNotebookFill } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { completedTask, deleteTask, getTask, previous } from '../services/opreations/taskapi';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { setEditTask, setTask, setTaskId } from '../slices/taskSlice';
import { toast } from 'react-hot-toast';

const Task = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  const [task, setTasks] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const tokenValue = token.token;
  console.log("121212=", tokenValue);
  const [previousTask, setPreviousTask] = useState();
  const [progress, setProgress] = useState(0);
  const [completedTaskNum, setComplatedTask] = useState(0);

  //serach input
  const handleOnSearch = (e) => {
    setSearch(e.target.value);
  }

  const onEditTask = (data) => {
    dispatch(setTask(data));
    dispatch(setEditTask(true));
    dispatch(setTaskId(data._id));
    navigate("/add-task");
  }

  const getAllTaks = async () => {
    const result = await getTask(tokenValue);
    // console.log("DATA=", result);
    if (result && result?.data) {
      setTasks(result?.data);
      setProgress(result.completed);
      setComplatedTask(result.taskCompleted);
    }
  }

  const previousTaskData = async () => {
    const result = await previous(tokenValue)
    // console.log("Previos Data=", result);
    setPreviousTask(result);
  }

  useEffect(() => {
    getAllTaks(),
      previousTaskData()
  }, [''])

  const handleToComplted = async (data) => {

    if (data.completed) {
      toast('Alredy Completed!', {
        icon: '😃',
      });
    }
    else {
      await completedTask(data._id, tokenValue);
      await getAllTaks();
      await previousTaskData();
    }
    // console.log("TASK ID HERE =", id);

  };

  const handleToDelete = async (id) => {
    await deleteTask(id, tokenValue);
    if (task.length !== 0) {
      await getAllTaks();
      await previousTaskData();
    }
  }

  
  console.log("Task is here=",(task?.length)+(previousTask?.length));
  const totalTask = (task?.length)+(previousTask?.length);
  console.log("Previous Task", ((progress/100)/totalTask)*100);
  // setProgress(((progress/100)/totalTask)*100);
  const totalProgress = ((progress/100)/totalTask)*100;

  return (
    <div className='text-white lg:w-[50%] md:w-full mx-auto relative px-4 flex mb-10 flex-col space-y-3 mt-5 pt-5'>

      <div>
        <button className='px-3 py-1 text-black flex items-center gap-1 hover:bg-[#a764d4] hover:text-white font-semibold mt-6 rounded-xl bg-[#BA83DE]'
          onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> Back
        </button>
      </div>

      <div onClick={() => navigate("/add-task")} className='w-[60px] h-[60px] bg-[#ba83de] hover:cursor-pointer
       rounded-full absolute flex justify-center items-center text-xl right-6 top-[5rem]'>
        <FaPlus />
      </div>

      <div>
        <div>
          <p className='text-white font-semibold text-2xl md:text-3xl lg:text-4xl'>
            You have got {task.length} tasks to complete today <TfiPencil />
          </p>
          <img src="" alt="" />
        </div>

        <div>
          <div className='bg-[#1e1e1e] text-white flex items-center px-3 py-2 rounded-xl my-3 gap-3'>
            <FaSearch />
            <input onChange={(e) => handleOnSearch(e)} className='bg-[#1e1e1e] w-full' type="text" placeholder={`Search The Task Name Here `} />
          </div>
        </div>
      </div>

      <div className='flex flex-col space-y-3'>
        <div className='flex justify-between '>
          <p className='font-bold text-lg md:text-xl lg:text-2xl'>Progress</p>
          {/* <button className='text-sm text-[#ba83de] '>See All</button> */}
        </div>

        <div className='bg-[#181818] flex flex-col px-2 py-3 rounded-lg space-y-2'>
          <p className='text-lg font-semibold'>Daily Task</p>
          <p className='text-sm text-gray-400'>{completedTaskNum}/{totalTask} Task Completed</p>

          <div className='flex flex-col gap-2'>
            <p>You are almost done, go ahead</p>
            {/* Add responsive styles to Line component if needed */}
            <Line className='bg-transparent rounded-lg h-4' percent={totalProgress? totalProgress: progress} strokeWidth={3} strokeColor="#9b64bf" />
          </div>
        </div>
      </div>

      <section className='flex flex-col space-y-3'>
        <div className='flex justify-between '>
          <p className='font-bold text-lg md:text-xl lg:text-2xl'>Today's Task</p>
          {/* <button className='text-sm text-[#ba83de] '>See All</button> */}
        </div>


        <div className='space-y-4'>
          {task && task.filter((item) => {
            return search.toLocaleLowerCase() === '' ?
              item :
              item.name.toLocaleLowerCase().includes(search)
          }).map((data, index) => (
            <div className={`flex flex-col space-y-3`} key={index}>
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
                    <button onClick={() => handleToDelete(data._id)} className='text-2xl text-red-500'><MdOutlineDeleteOutline /></button>
                    <button onClick={() => onEditTask(data)} className='text-xl text-gray-500'><LuFileEdit /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {previousTask && previousTask?.length !== 0 && previousTask !== undefined ?
        (
          <div>
            <section className='flex flex-col space-y-3 mb-5 pb-5'>
              <div className='flex justify-between '>
                <p className='font-bold text-lg md:text-xl lg:text-2xl'>Previous Task's</p>
                {/* <button className='text-sm text-[#ba83de] '>See All</button> */}
              </div>
            </section>
            <div className='flex flex-col space-y-3'>
              <div className='space-y-3'>
                {previousTask && previousTask.filter((item) => {
                  return search.toLocaleLowerCase() === '' ?
                    item :
                    item.name.toLocaleLowerCase().includes(search)
                }).map((data, index) => (
                  <div className={`flex flex-col space-y-3`} key={index}>
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
                          <button onClick={(data) => handleToDelete(data._id)} className='text-2xl text-red-500'><MdOutlineDeleteOutline /></button>
                          <button className='text-xl text-gray-500'><LuFileEdit /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        :
        (null)
      }
    </div>

  )
}

export default Task
