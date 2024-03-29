import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let counter = 1;
function App() {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [todos,setTodos] = useState([
  ])
  function addTodo(){

    
    setTodos([...todos, {
      id: counter++,
      title: title,
      description: description
    }])
    
    console.log(todos)
  }
  return (
    <>
      <input type="text" name="title" placeholder='Title' onChange={(e)=> {setTitle(e.target.value + Math.random())}}/>
      <br /> <br />
      <input type="text" name="description" placeholder='Description' onChange={(e)=> {setDescription(e.target.value)}}/>
      <br /> <br />
      <button onClick={addTodo}>Add a todo</button>
      {todos.map((todo)=> (
         <Todo key={todo.id} title={todo.title} description={todo.description}/>
      ))}
    </>
  )
}

function Todo({title,description}){
    
  return (
    <div>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  )

}

export default App
