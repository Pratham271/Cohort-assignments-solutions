import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const [inputValue,setInputValue] = useState(0);
  // const [finalAns, setFinalAns] = useState(0)

  // worst approach as it is getting called on every counter click and computing this for loop again
    // let ans = 0
    // for(let i=1; i<=inputValue; i++){
    //   ans+=i;
    // }

    // slightly better approach as this gets rendered only when input changes but
    // it has 2 state variable ans that makes it render 2 times
    // useEffect(()=> {
    //   let ans = 0
    //   for(let i=1; i<=inputValue; i++){
    //     ans+=i;
    //   }
    //   setFinalAns(ans) // rendered for the second time as the state variable gets updated
    // },[inputValue]) // rendered for the first time as input value changes
    
    let count = useMemo(()=> {
      // console.log("memo got called")
      let finalCount = 0;
      for(let i=1; i<=inputValue; i++){
        finalCount = finalCount+i;
      }
      return finalCount;
    }, [inputValue])
  
  return (
    <>  
        <input type="text" name="sum" id="" onChange={(e)=> setInputValue(e.target.value)}/>
        <p>Sum is {count}</p>
        <button onClick={() => setCounter((count) => count + 1)}>
          count is {counter}
        </button>
   
    </>
  )
}

export default App
