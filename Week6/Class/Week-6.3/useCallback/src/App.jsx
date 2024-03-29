import { memo, useCallback, useEffect, useMemo, useState } from 'react'
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


  const calculateCryptoReturns = useCallback(()=> {
    return exchange1Data.returns + exchange2Data.returns
  },[exchange1Data,exchange2Data])

  // const incomeTax = (calculateCryptoReturns() + bankData.income) * 0.3

  return (
    <div>
        <CryptoGainCalculator calculateCryptoReturns={calculateCryptoReturns}></CryptoGainCalculator>
        <Dummy></Dummy>
    </div>
  )
}

const Dummy = memo(() => {
  console.log("Dummy")
  return(
    <div>
      Dummy
    </div>
  )
})

const CryptoGainCalculator = memo(function({calculateCryptoReturns}){
  console.log("re-rendered")
  return(
    <div>
      Your crypto returns {calculateCryptoReturns()}
    </div>
  )
})

export default App
