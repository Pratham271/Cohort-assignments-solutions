import { useEffect, useState } from 'react'
import axios from 'axios'
import useIsOnline from './hooks/useIsOnline'
import useMouseMove from './hooks/useMouseMove'
import useDimensions from './hooks/useDimensions'
import useDebounce from './hooks/useDebounce'

function useInterval(cb,time){
  useEffect(() => {
    const intervalId = setInterval(cb, time);

    return () => clearInterval(intervalId);
  }, [cb, time]);
}

function App() {
  // const {todos,loading} = useTodos(5);
  // const isOnline = useIsOnline()
  // const mousePointer = useMouseMove();
  // const dimensions = useDimensions();
  const [inputValue,setInputValue] = useState("")
  // useInterval(()=> {
  //   setCount(c => c+1)
  // },1000)

  const debounceValue = useDebounce(inputValue,500);

  return (
    <>
        Debounced value is {debounceValue}
        <br /><br />
       <input type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} placeholder='Search...' />
    </>
  )
}

// function Track({ todo }) {
//   return <div>
//     {todo.title}
//     <br />
//     {todo.description}
//   </div>
// }

export default App

