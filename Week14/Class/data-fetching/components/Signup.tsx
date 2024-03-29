"use client"
import Button from '@/components/Button'
import LabelledInput from '@/components/LabelledInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
  return (
    <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
    <a href="#" className="block w-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Sign up
                    </div>
                </div>
                <div className="pt-2">
                    <LabelledInput onChange={(e)=> {setUsername(e.target.value)}}
                     label="Username" placeholder="pratham@gmail.com" />
                    <div className='mt-4'>
                    <LabelledInput onChange={(e)=> {setPassword(e.target.value)}} label="Password" type={"password"} placeholder="123456" />
                    </div>
                    <div className='mt-4'>
                    <Button onClick={async()=> { await axios.post("http://localhost:3000/api/user", {
                        username, 
                        password
                    });
                    router.push("/")
                    }}/>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
  )
}

export default Signup
