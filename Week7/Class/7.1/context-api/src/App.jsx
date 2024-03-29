import { useContext, useState } from 'react'
import './App.css'
import { CountContext } from './context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CountContext.Provider value={{count, setCount}}>
      <Count/>
      </CountContext.Provider>
    </div>
  )
}

function Count(){
  return (
    <div>
      <CountRender/>
      <Buttons />
    </div>
  )
}

function CountRender(){
  const {count} = useContext(CountContext)
  return(
    <div>
      Count is {count}
    </div>
  )
}

function Buttons(){
  const {count,setCount} = useContext(CountContext)
  return(
    <div>
      <button onClick={()=> setCount(count+1)}>Increment</button>
      <button onClick={()=> setCount(count-1)}>Decrement</button>
    </div>
  )
}



export default App
