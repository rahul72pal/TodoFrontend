import React, { useState } from 'react'
import { login } from '../../services/opreations/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logigImage from '../../assets/Images/Frame 13.jpg'

const LoginPage = () => {

  const disptach = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  //destructure the Property of the form Data
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("On submit Form Data = ", formData);
    disptach(login(formData.email, formData.password, navigate));
  }

  return (
    <div className='text-white px-4 py-5  flex flex-col lg:flex-row  justify-evenly items-center '>
      <div className='lg:w-[50%]'>
        <img className='w-[600px] h-[550px] rounded-lg object-cover ' src={logigImage} alt="" />
        </div>
      <div className='lg:w-[30%] sm:mt-5'>
        <h1 className='text-center text-xl w-full'>Welcome Back</h1>
        <form onSubmit={handleOnSubmit} className='flex flex-col w-full space-y-5 '>
          <label className='w-full' >
            <p>Email <span className='text-red-700'>*</span></p>
            <input type="email"
              name="email" id="email"
              placeholder='Enter your email'
              className='px-3 py-2 bg-[#1e1e1e] w-full'
              value={email}
              onChange={handleChange}
            />
          </label>
          <label className='' >
            <p>Password<span className='text-red-700'>*</span></p>
            <div className='relative'>
              <input type={!showPassword ? "password" : "text"}
                name="password" id="password"
                placeholder='Enter your Password'
                className='px-3 py-2 bg-[#1e1e1e] w-full'
                value={password}
                onChange={handleChange}
              />
              <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                {
                  showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)
                }
              </span>
            </div>
          </label>
          <button type='submit' className='font-semibold bg-slate-800
         px-3 py-2 rounded-xl  hover:bg-slate-900 hover:text-blue-600 mt-5
         '>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
