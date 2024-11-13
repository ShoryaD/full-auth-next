'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const Signup = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup Success', response.data);
      router.push('/login')
      
    } catch (error: any) {
      console.log('Signup Failed', error);
      
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='mb-4 text-5xl'>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <div className='border border-dotted p-5'>
        <div>
        <label htmlFor="username" className='flex justify-center mb-4'>Username</label>
          <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="text" 
            id="username" 
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='username...'
          />
        </div>

        <div>
        <label htmlFor="email" className='flex justify-center mb-4'>Email</label>
          <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="email" 
            id="email" 
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='email...'
          />
        </div>

        <div>
        <label htmlFor="password" className='flex justify-center mb-4'>Password</label>
          <input 
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
            type="password" 
            id="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='password...'
          />
        </div>

        <div className="flex flex-col items-center justify-center h-full w-70 mt-4">
          <button 
              onClick={onSignup} 
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-950 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300"
          >
              {buttonDisabled ? 'No signup' : 'Signup'}
          </button>

          <Link
              href="/login"
              className="w-full flex items-center justify-center mt-4 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 ease-in-out shadow-md"
          >
              Login
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Signup