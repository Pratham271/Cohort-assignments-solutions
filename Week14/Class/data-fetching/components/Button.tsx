import React from 'react'

const Button = ({onClick}:{onClick:()=> void}) => {
  return (
    <div >
        <button onClick={onClick} type='button' className='border-none bg-gray-800 hover:bg-slate-900 w-full rounded-md px-2 py-1 text-white'>Sign up</button>
    </div>
  )
}

export default Button
