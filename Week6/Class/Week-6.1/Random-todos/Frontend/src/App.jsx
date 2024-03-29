import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  useEffect(()=> {
    async function fetchData(){
      const res = await fetch("http://localhost:3000/todos")
      const json = await res.json()
      setTodos(json.newTodos)
    }
    const intervalId = setInterval(fetchData, 5000)

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  },[])

  return (
    <div>
        {todos.map((todo)=> (
            <div key={todo.id}>
                <h1>{todo.title}</h1>
                <h3>{todo.description}</h3>
            </div>
        ))}
    </div>
  )
}

export default App
