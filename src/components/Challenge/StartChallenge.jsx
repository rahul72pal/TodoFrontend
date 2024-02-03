import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startChallenge } from '../../services/opreations/Challenegeapi'
import { useNavigate } from 'react-router-dom'
import { resetChanllegeState, setStep } from '../../slices/Challenge'

const StartChallenge = () => {
  const navigate = useNavigate();
  const { challenge } = useSelector((state) => state.challenge)
  const {token} = useSelector((state)=>state.auth);
  const tokenValue = token.token
  console.log(challenge.task.length)
  const dispatch = useDispatch();

  
  const onStart = async ()=>{
    const result = await startChallenge(challenge._id,tokenValue);
    if(result){
      dispatch(resetChanllegeState())
      navigate(`/challenge/${challenge._id}`)
    }
    console.log("Challlenge Result Here =",result);
  }

  return (
    <div className='w-full text-center'>
      <p className='lg:text-4xl text-2xl font-semibold font-[inter] my-10 text-blue-400'>Get Ready For Your {challenge?.days} Days Challenge</p>
      <div className='text-start w-fit mx-auto flex flex-col gap-3 text-white'>
        <p className='lg:text-xl font-semibold'>Name: {challenge?.name}</p>
        <p className='lg:text-xl font-semibold'>Description: {challenge?.description}</p>
        <p className='lg:text-xl font-semibold'>NO of Task's {challenge?.task?.length}</p>
      </div>
      <button onClick={()=> dispatch(setStep(2))}  className='bg-blue-300 px-3 py-4 rounded-lg text-black text-lg font-semibold font-[inter] my-8'>back</button>
      <button onClick={onStart} className='bg-blue-300 px-3 py-4 rounded-lg ml-4 text-black text-lg font-semibold font-[inter] my-8'>Start Your</button>
    </div>
  )
}

export default StartChallenge
