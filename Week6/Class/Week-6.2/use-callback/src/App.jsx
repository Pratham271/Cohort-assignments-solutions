import { useState, memo, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let a = 1;
function App() {
  const [count, setCount] = useState(0)
  // const a = function(){
  //   console.log("hi there")
  // }

  // const a = useCallback(function(){
  //   console.log("hi there")
  // },[])

  function logSomething(){
    console.log("child clicked")
  }
  return (
    <>
      <ButtonComponent inputFunction={logSomething}/>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {/* <Demo a={a}></Demo> */}
    </>
  )
}

const ButtonComponent = memo(({inputFunction})=> {
  console.log("child render")
  return (
    <div>
      <button onClick={inputFunction}>Click Button</button>
    </div>
  )
})

// const Demo = memo(function({a}){
//   console.log("rerender");
//  return (
//   <div>
//     hi there 
//   </div>
//  )
// })

export default App
