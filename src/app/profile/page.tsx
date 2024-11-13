'use client';

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {

    const [data, setData] = useState('nothing')

    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-950">
            <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
                <div>
                    <img
                        src="/next.svg" 
                        alt="Logo"
                        className="w-24 h-24 rounded-full"
                    />
                </div>

                <h2 className="text-black p-2 m-4 rounded bg-red-600">{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>
                {data}
                </Link>}</h2>

                <button onClick={getUserDetails} className="px-4 py-2 bg-green-700 text-white rounded-md shadow transition-colors duration-200">
                        Details
                    </button>

                <div className="flex space-x-4 mt-4">
                    {/* <button className="px-4 py-2 bg-blue-950 text-white rounded-md shadow hover:bg-blue-800 transition-colors duration-200">
                        Edit Profile
                    </button> */}
                    <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-500 transition-colors duration-200">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
