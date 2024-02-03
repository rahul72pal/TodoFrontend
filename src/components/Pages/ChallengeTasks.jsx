import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { compltedChallengeTask, deleteChallenge, userChallengeDetails } from '../../services/opreations/Challenegeapi';
import { useSelector } from 'react-redux';
import { PiNotebookFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { Line, Circle } from 'rc-progress';
import { convertDateToHoursMinutes } from '../../utils/dateConverter';
import toast from 'react-hot-toast';

const ChallengeTasks = () => {

  const [challenge, setChallenge] = useState();
  const [userDailyTask, setUserDailyTask] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const tokenValue = token.token;
  const challengeId = useParams();
  console.log(challengeId)

  const getChallengeDetails = async () => {
    const result = await userChallengeDetails(challengeId, tokenValue)
    console.log("User challenge detaisl 1212= ", result);
    setChallenge(result?.challenge);
    setUserDailyTask(result?.uerdailyTask)
  }

  const completeTask = async (taskobj) => {

    if (taskobj.completed) {
      toast.success('Task Completed Alredy!', {
        icon: '😃',
      });
    }
    else if(new Date(taskobj?.expiresAt) < Date.now()){
      toast.success('Task Expires Please Reload!', {
        icon: '😞',
      });
    }
    else{
      //this function gave the updated challnege
    const result = await compltedChallengeTask(taskobj._id, challengeId, tokenValue);
    console.log("Result of the  complated task of  = == ", result);
    setChallenge(result);
    setUserDailyTask(result?.challengeTasks);
    }
    
  }

  useEffect(() => {
    getChallengeDetails()
  }, [])

  const deletechallenge = async () => {
    await deleteChallenge(challengeId, tokenValue);
  }

  const date = Date.now()

  return (
    <div className='text-white w-full'>
      <div className='mx-3 lg:w-7/12 lg:mx-auto '>

        <div className='w-full flex lg:flex-row flex-col items-center justify-between gap-4 '>
          <div className=''>
            <p className='lg:text-3xl text-xl font-bold text-center
                 font-[popins] lg:my-8 my-4'> 🚀 {challenge?.days} Days Challenge - {challenge?.name} 🚀</p>

            <p className='lg:text-xl font-semibold font-[popins] lg:my-[50px] my-[10px]'>Challenge Details:</p>
            <p className='lg:text-xl font-[popins]'> <span className='font-bold'>Name:</span> {challenge?.name}</p>
            <p className='lg:text-xl font-[popins]'> <span className='font-bold'>Description:</span> {challenge?.description}</p>
            <p className='lg:text-xl font-[popins]'> <span className='font-bold'>Status:</span> {challenge?.status}  🚦</p>
            <p className='lg:text-xl font-[popins]'> <span className='font-bold'>Remaining Days:</span> {challenge?.remainingDays} ⏰</p>
          </div>
          <div className='w-fit relative'>
            <Circle className='lg:w-[250px] lg:h-[250px] w-[200px] h-[200px] mx-auto' percent={challenge?.progress} strokeWidth={6} strokeColor="#BA83DE" />
            <div className=' absolute text-4xl font-semibold text-[#BA83DE] font-[inter] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>{Math.floor(challenge?.progress ? challenge?.progress : 0)} %</div>
          </div>
        </div>

        <div>
          {
            userDailyTask.map((data, index) => (
              <div key={data._id} className='w-full my-5'>
                {new Date(data?.expiresAt) < Date.now() ?
                  (
                    null
                  ) :
                  (
                    <div className={`flex flex-col space-y-3`} >
                      <div className={`${data.priority === 'red' ? "border-red-700" :
                        data.priority === 'orange' ? "border-orange-500" :
                          "border-yellow-300"
                        } bg-[#181818] border-l-[25px] flex items-center justify-between px-3 py-2 rounded-lg`}>
                        <div>
                          <p className='text-xl font-semibold'>{data.name}</p>
                          <p className='text-sm my-3 text-gray-400'>{data.description} expires In: <span>{convertDateToHoursMinutes(data?.expiresAt)}</span></p>
                          <div className='text-2xl'><PiNotebookFill /></div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <span onClick={() => completeTask(data)} className='cursor-pointer'>
                            {
                              data.completed ? (<div className='bg-[#68ed87] lg:w-10 lg:h-10 w-7 h-7 text-xl font-bold rounded-full text-black flex justify-center items-center'>
                                <FaCheck className='font-bold' />
                              </div>) : (<div className='lg:w-10 lg:h-10 w-7 h-7 border-4 rounded-full border-gray-500'></div>)
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                {/* <div>{Date(data?.expiresAt)} and {Date(date)}</div> */}
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default ChallengeTasks
