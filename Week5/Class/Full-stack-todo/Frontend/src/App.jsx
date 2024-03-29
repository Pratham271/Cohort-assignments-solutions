import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])
  useEffect(()=> {
    async function fetchData(){
      const res = await fetch("http://localhost:3000/todos")
      const data = await res.json();
      console.log(data)
      setTodos(data.todos)
    }
    fetchData();
  },[])
  return (
    <div>
      <CreateTodo/>
      <Todos todos={todos}/>
    </div>
  )
}

export default App
