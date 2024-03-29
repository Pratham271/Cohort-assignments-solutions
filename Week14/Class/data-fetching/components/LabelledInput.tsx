import React, { ChangeEventHandler } from 'react'

interface LabelledInput{
    label:string,
    placeholder:string,
    type?:string,
    onChange:ChangeEventHandler<HTMLInputElement>
}
const LabelledInput = ({label,placeholder, type, onChange}:LabelledInput) => {
  return (
    <div>
        <label htmlFor={label}>{label}</label>
        <div className='mt-2'>
        <input onChange={onChange} type={type?type:"text"}  className='border border-gray-800 rounded-md w-full px-2 py-1 focus:outline-none' placeholder={placeholder}/>
        </div>
    </div>
  )
}

export default LabelledInput
