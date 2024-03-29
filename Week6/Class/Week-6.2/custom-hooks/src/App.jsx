import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function useTodos(){
  const [todos,setTodos] = useState([])
  useEffect(()=> {
    axios.get("https://sum-server.100xdevs.com/todos")
    .then((res)=> {
      setTodos(res.data.todos)
    })
  },[])
  return todos
}
function App() {
  const todos = useTodos();
  console.log(todos)

  return (
    <div>
      {
        todos.map((todo)=>(
          <div key={todo.id}>
            <h1>{todo.title}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default App
