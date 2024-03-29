import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [id, setId] = useState(1)
  function handleClick(e){
    setId(e.target.innerText)
  }

  return (
    <>
      <button onClick={handleClick}>1</button>
      <button onClick={handleClick}>2</button>
      <button onClick={handleClick}>3</button>
      <button onClick={handleClick}>4</button>
      <Todo id={id}></Todo>
    </>
  )
}

function Todo({id}){
  const [todo, setTodo] = useState({})
  useEffect(()=> {  
    async function fetchData(){
      const res = await fetch(`https://sum-server.100xdevs.com/todo?id=${id}`)
      const json = await res.json()
      setTodo(json.todo)
      
    }
    fetchData();
  },[id])
  return (
    <div>
      <h1>
        {todo.title}
      </h1>
      <h4>
        {todo.description}
      </h4>
    </div>
  )
}

export default App
