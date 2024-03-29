"use client"
import Button from '@/components/Button'
import React, { useState } from 'react'

const page = () => {
    const [count,setCount] = useState(0)
  return (
    <div className="flex justify-center max-w-screen-3xl">
    <div className="flex flex-col mt-36">
     <div className='flex justify-start max-w-screen-sm'>
     <div className="text-2xl font-bold">
        Welcome to Interactive Page
      </div>
     </div>
      <div className="mt-8 flex justify-center max-w-screen-sm">
            <div >
                This route features a count button that demonstrates the power of
                client-side interactivity in Next.js. Click the button and see the count go up!
                This interactive feature is powered by the "use client" directive in Next.js, which allows this 
                component to be rendered on the client-side.

                <br /><br />
                <Button onClick={()=> setCount(count+1)} label={`count is ${count}`} route={''}/>
            </div> 
      </div>
      
    </div>
    
</div>
  )
}

export default page
