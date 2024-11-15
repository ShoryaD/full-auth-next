'use client';

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

export default function verifyEmailPage() {
    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async (urlToken: string) => {
        try {
            await axios.post('/api/users/verifyemail', { token: urlToken });
            setVerified(true);
            setError(false); 
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('token');
        if (urlToken) {
            setToken(urlToken);
            verifyUserEmail(urlToken); 
        } else {
            setError(true);
        }
    }, []);
      

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
    )
}