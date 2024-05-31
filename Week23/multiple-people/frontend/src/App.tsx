import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sender from './components/Sender'
import Receiver from './components/Receiver'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sender' element={<Sender/>} />
        <Route path='/receiver' element={<Receiver/> } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
