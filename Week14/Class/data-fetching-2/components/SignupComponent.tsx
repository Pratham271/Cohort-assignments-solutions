"use client"
import { Signup } from '@/app/actions/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignupComponent = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()
  return (
    <div className='flex flex-col justify-center h-screen'>
       <div className='flex justify-center'>
        <div className='flex flex-col border p-12 rounded-md border-gray-600'>
          <label htmlFor="username">Username</label>
          <input onChange={(e)=> setUsername(e.target.value)} className='p-2 m-2 border border-gray-400 rounded-md w-full' type="text" />
          <label htmlFor="name">Name</label>
          <input onChange={(e)=> setName(e.target.value)} className='p-2 m-2 border border-gray-400 rounded-md w-full' type="text" />
          <label htmlFor="password">Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} className='p-2 m-2 border border-gray-400 rounded-md w-full' type="password" />
          <button onClick={()=> {Signup(username,name,password); router.push("/user")} } className='p-2 m-2 bg-gray-800 rounded-md text-white w-full'>Signup</button>
        </div>
       </div>
    </div>
  )
}

export default SignupComponent
