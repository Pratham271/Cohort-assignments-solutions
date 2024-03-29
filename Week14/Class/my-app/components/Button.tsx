"use client"
import React from 'react'

const Button = () => {
  return (
    <div>
        <button onClick={()=> console.log("hi there")} 
                        type="button" 
                        className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Sign in
        </button>
    </div>
  )
}

export default Button
