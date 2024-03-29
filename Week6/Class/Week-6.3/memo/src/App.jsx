import { memo, useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [exchange1Data, setExchange1Data] = useState({})
  const [exchange2Data, setExchange2Data] = useState({})
  const [bankData, setBankData] = useState({})

  useEffect(()=> {
    setExchange1Data({
      returns: 100
    })
  },[])

  useEffect(()=> {
    setExchange2Data({
      returns: 100
    })
  },[])

  useEffect(()=> {
    setTimeout(()=> {
        setBankData({
          income: 100
        });
    },3000)
  },[])

  const cryptoReturns = useMemo(()=> {
    console.log("hi there before")
    return exchange1Data.returns+ exchange2Data.returns;
  },[exchange1Data,exchange2Data])
  // console.log("hi there after")

  const incomeTax = (cryptoReturns + bankData.income) * 0.3

  return (
    <div>
        Your income tax is {incomeTax}
    </div>
  )
}

export default App
