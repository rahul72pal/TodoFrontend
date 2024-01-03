import React, { useState } from 'react';
// import OTPInput from 'react-otp-input';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { singUp } from '../../services/opreations/authApi';
import { useNavigate } from 'react-router-dom';
import veriyImage from '../../assets/Images/Frame 12.jpg'

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const { signupData, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log("SignUp Data = ", signupData);
  // const {firstName, lastName, email, password,
  //   accountType, confirmPassword} = signupData

  return (
    <div className='flex px-4 py-5 items-center lg:flex-row mx-auto flex-col'>
      <div className='w-[800px] px-3 pl-5 ml-5 rounded-lg'>
        <img className='w-[600px] h-[550px] rounded-lg object-cover' src={veriyImage} alt="" />
      </div>


      <div className="flex flex-col items-center text-white px-3 py-5">
        <h1 className=" font-semibold mb-4 text-3xl ">Verify Your Email</h1>
        <p className="text-gray-400 mb-6">Enter the OTP sent to your email address</p>
        <div className='py-3 mb-5'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1">-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle=" text-[36px] w- h-12 border rounded-lg text-center bg-[#1e1e1e] text-white gap-5  "
          />
        </div>

        <button
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={() => {
            // Add your logic for OTP verification here
            dispatch(singUp(signupData.firstName, signupData.lastName, signupData.email, signupData.password,
              signupData.accountType, signupData.confirmPassword, otp, navigate));
            console.log('Verifying OTP:', otp);
          }}
        >
          Verify
        </button>
        {loading && <Loading></Loading>}
      </div>
    </div>
  );
};

export default VerifyEmail;
