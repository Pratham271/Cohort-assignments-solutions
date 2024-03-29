import { memo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title,setTitle] = useState("Pratham")
  function handleChange(){
    setTitle(Math.random())
  }
  return (
   <div>
    <button onClick={handleChange}>Click me to change the title</button>
    <Header title={title}></Header>
    <Header title="Raman"></Header>
    <Header title="Raman"></Header>
    <Header title="Raman"></Header>

   </div>

  )
}

const Header = memo(function Header({title}){
    return (
      <div>
        My name is {title}
      </div>
    )
  })

// pushing the state down approach 
// function HeaderWithButton(){
//   const [title,setTitle] = useState("Pratham")
//   function handleChange(){
//     setTitle(Math.random())
//   }
//   return(
//     <>
//         <button onClick={handleChange}>Click me to change the title</button>
//         <Header title={title}></Header>
//     </>
//   )
// }
// function Header({title}){
//   return (
//     <div>
//       My name is {title}
//     </div>
//   )
// }

export default App
