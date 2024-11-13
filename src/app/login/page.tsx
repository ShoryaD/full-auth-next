'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: 'lalli@gmail.com',
    password: 'LalliHood',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login Success', response.data);
      toast.success('Login Successful');
      router.push('/profile');
    } catch (error: any) {
      console.log('Login Failed', error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.error : 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-4 text-5xl'>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <div className='border border-dotted p-5'>
        <div>
          <label htmlFor='email' className='flex justify-center mb-4'>Email</label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type='email'
            id='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder='email...'
          />
        </div>

        <div>
          <label htmlFor='password' className='flex justify-center mb-4'>Password</label>
          <input
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type='password'
            id='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='password...'
          />
        </div>

        <div className='flex flex-col items-center justify-center h-full w-70 mt-4'>
          <button
            onClick={onLogin}
            className='w-full flex items-center justify-center px-6 py-3 bg-blue-950 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300'
          >
            {buttonDisabled ? 'No login' : 'Login'}
          </button>

          <Link
            href='/signup'
            className='w-full flex items-center justify-center mt-4 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 ease-in-out shadow-md'
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
