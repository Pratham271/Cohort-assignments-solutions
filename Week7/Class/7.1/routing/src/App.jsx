import React, { Suspense, lazy, memo, useCallback, useMemo } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
const Dashboard = lazy(()=>  import('./components/Dashboard'))
const Landing = lazy(()=> import('./components/Landing'))

function App() {
  
  return (
    <>
     
      <BrowserRouter>
      <Appbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/' element={<Landing/>}/>
        </Routes>
        </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App


const Appbar = memo(()=>{
  const navigate = useNavigate();
  return (
    <div>
    <button onClick={()=> {
      navigate("/")
    }}>Home</button>
    <button onClick={()=> {
      navigate("/dashboard")
    }}>Dashboard</button>
  </div>
  )
})

// old way
{/* <button onClick={()=> {
          window.location.href="/"
        }}>Home</button>
        <button onClick={()=> {
          window.location.href="/dashboard"
        }}>Dashboard</button> */}