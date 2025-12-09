// src/pages/Login.jsx
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// NOTE: update imports to match where you keep Config
import { handleGoogleLogin, handleSubmit } from '../Utils/Config';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setFormVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className=' min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500
     via-gray-700 to-gray-900 px-4'>
      <div className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full
       border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
       ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transform transition-all duration-500
        ease-out`}>
        <h2 className='text-3xl font-bold text-center mb-4'>Welcome Back</h2>
        <p className='text-gray-400 text-center mb-6'>Login to your Account</p>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={(e) => handleSubmit(e, setError, navigate)} className=' space-y-6'>
          <div>
            <label htmlFor="email" className=' block text-gray-300 font-medium mb-1'>Email Address</label>
            <input required type="email" name='email' id='email' placeholder='Enter Your Email' className='w-full border-b
             border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none' />
          </div>

          <div className=' relative'>
            <label htmlFor="password" className='block text-gray-300 font-medium mb-1' >Password</label>
            <input type={passwordVisible ? 'text' : 'password'} id='password' name='password' placeholder='Enter your Password' className='w-full border-b
             border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none'/>
            <button type='button' onClick={() => setPasswordVisible(!passwordVisible)} className=' absolute right-2 top-8 text-gray-400 hover:text-cyan-400 focus:outline-none'>
              {passwordVisible ? (
                <AiOutlineEyeInvisible className='h-5 w-5' />
              ) : (<AiOutlineEye className='w-5 h-5' />)}
            </button>
          </div>
          <button type='submit' className=' w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l
           hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 focus:ring focus:ring-cyan-300
            focus:outline-none shadow-md hover:shadow-lg'>
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className=' mt-8 flex items-center justify-between'>
          <span className=' border-b w-1/4 border-gray-600'></span>
          <span className=' text-gray-400 text-sm'>OR</span>
          <span className=' border-b w-1/4 border-gray-600'></span>
        </div>

        {/* GOOGLE BUTTON */}
        <button onClick={() => handleGoogleLogin(setError, navigate)} className=' mt-6 w-full flex items-center justify-center bg-gray-700 border border-gray-600 py-2
         rounded-lg shadow-md hover:bg-gray-600 hover:shadow-lg transition-all duration-300 focus:ring focus:ring-cyan-300
          focus:outline-none'>
          <FcGoogle className='h-6 w-6 mr-3' />
          Continue with Google
        </button>

        <p className='text-center text-gray-400 text-sm mt-6'>
          Don't have an account? <a href="/signup" className='text-cyan-400 hover:underline'>Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login;
