import React from 'react'
import Button from "@/components/Button";

const Navbar = () => {
  return (
    <div className='flex justify-center'>
        <div className='pl-28'>
            <div className="flex justify-center mt-24">
                <Button label="Home" route="/"/>
                <Button label="Server Page" route="/static-page"/>
                <Button label="Client Page" route="interactive-page"/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
