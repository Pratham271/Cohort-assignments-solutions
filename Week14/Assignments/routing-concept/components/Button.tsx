
import Link from 'next/link'
import React from 'react'

const Button = ({label,route, onClick}:{label:string,route?:string,onClick?:()=>void}) => {
  
  return (
    <div className='pr-32'>
        <Link href={route||""}>
        <button
        onClick={onClick}
         className="border border-gray-900 p-2 rounded-md px-4">
        {label}</button>
        </Link>
    </div>
  )
}

export default Button
