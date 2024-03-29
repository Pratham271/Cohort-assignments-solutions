import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const divRef = useRef()
  const [incomeTax, setIncomeTax] = useState(20000)
  useEffect(()=> {
    setTimeout(()=> {
      // divRef.current.innerHTML = "10"
      setIncomeTax(10)
    },5000)
  },[])
  return (
    <div>
      hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  )
}

export default App
