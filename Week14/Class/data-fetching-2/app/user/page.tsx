import axios from 'axios'
import React from 'react'
import { PrismaClient } from "@prisma/client";
import prisma from '@/db';

async function fetchData(){
  const user = await prisma.user.findFirst()
  return {
      email: user?.email,
      name: user?.name
  }
}
const page = async() => {
    const data = await fetchData()
  return (
    <div className='flex flex-col justify-center h-screen'>
        <div className='flex justify-center'>
            <div className='border border-gray-800 p-4'>
            {data.email}
            <div>
            {data.name}
            </div>
            </div>
        </div>
    </div>
  )
}

export default page
