import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [todo, setTodo] = useState([])

  

  function handleSubmit(){
    setTodo([...todo, {title,desc,completed:false}])
    console.log(todo)
  }

  function handleTitleChange(e){
    setTitle(e.target.value)
  }

  function handleDescChange(e){
    setDesc(e.target.value)
  }

  function changeDone(id){
    setTodo(todo.map((t,index)=> {
      if(index===id){
         t.completed = true
      }
      return t
  }))
  }

  return (
    <>
    <div>
      <input type="text" placeholder='Title' value={title} onChange={handleTitleChange}/>
      <br /><br />
      <input type="text" placeholder='Description' value={desc} onChange={handleDescChange}/>
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
   
      {todo? 
      <div>
        {todo.map((t,index)=> (
            <div key={index}>
              <p>{t.title}</p>
              <p>{t.desc}</p>
              <button onClick={()=> changeDone(index)}>{t.completed?"Done!":"Mark as done"}</button>
            </div>
        ))}
      </div>: <div></div>}
    
    </>
  )
}

export default App
