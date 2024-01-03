import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constants';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';
import { sendOtp } from '../../services/opreations/authApi'
import SingupImage from '../../assets/Images/Frame 13 (1).jpg'

const Singup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //User Or Admin
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //destructure the property of the formData
  const { firstName, lastName, email, password, confirmPassword } = formData;

  //Handle input Fiels, when the value is change
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  //handleOnsubmit
  const handleOnSubmit = (e) => {
    console.log("Singup Page handleOnSubmit");
    e.preventDefault()

    if (password !== confirmPassword) {
      console.log("Password Error")
      toast.error("Password Do Not Matched");
      // window.alert("Password Not Matched");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    }

    console.log("SignUp Data = ", signupData);
    //set the singup Data and call sendOtp Function
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.USER);
  }

  console.log("Singup Page");
  return (
    <div className='flex px-4 py-5 items-center lg:flex-row mx-auto flex-col'>
      {/* images  */}
      <div className='lg:w-[800px] mx-auto px-3 lg:pl-5 lg:ml-5 rounded-lg'>
        <img src={SingupImage} className='w-[600px] h-[550px] rounded-lg object-cover' alt="SingUp Image" />
      </div>
      <div className='text-white px-4 py-2 w-full h-full flex flex-col justify-center items-center '>
        <h1 className='text-white text-2xl text-center font-semibold'>Sign Up With Us</h1>
        <form onSubmit={handleOnSubmit} className='max-w-md mx-auto w-full'>
          {/* First Name */}
          <div className='mb-4'>
            <label className='block mb-1'>
              <span className='text-pink-800'>*</span> First Name
            </label>
            <input
              type='text'
              required
              name='firstName'
              id='firstName'
              value={firstName}
              onChange={handleOnChange}
              placeholder='Enter First Name'
              className='w-full bg-[#1e1e1e] text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-blue-500'
            />
          </div>

          {/* Last Name */}
          <div className='mb-4'>
            <label className='block mb-1'>
              <span className='text-pink-800'>*</span> Last Name
            </label>
            <input
              type='text'
              required
              name='lastName'
              id='lastName'
              value={lastName}
              onChange={handleOnChange}
              placeholder='Enter Last Name'
              className='w-full bg-[#1e1e1e] text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-blue-500'
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block mb-1'>
              <span className='text-pink-800'>*</span> Email
            </label>
            <input
              type='email'
              required
              name='email'
              id='email'
              value={email}
              onChange={handleOnChange}
              placeholder='Enter Email'
              className='w-full bg-[#1e1e1e] text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-blue-500'
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='block mb-1'>
              <span className='text-pink-800'>*</span> Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name='password'
                id='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
                className='w-full bg-[#1e1e1e] text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-blue-500 pr-10'
              />
              <span
                className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='mb-6'>
            <label className='block mb-1'>
              <span className='text-pink-800'>*</span> Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder='Enter Confirm Password'
                className='w-full bg-[#1e1e1e] text-white border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-blue-500 pr-10'
              />
              <span
                className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          <button
            type='submit'
            className='bg-blue-500 text-white
          py-2 px-4 rounded hover:bg-blue-600 
          focus:outline-none focus:shadow-outline-blue 
          active:bg-blue-700 w-full text-center font-semibold'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Singup
