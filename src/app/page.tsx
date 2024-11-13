'use client';

import Link from "next/link";
export default function Home() {

  return (
      <div>
        <p>Hello, this is the Home Page</p>
        <div className="flex flex-col m-5">
        <Link href='/login'>Login</Link>
        <Link href='/signup'>Signup</Link>
        <Link href='/profile'>Profile</Link>
        </div>
      </div>
  );
}
