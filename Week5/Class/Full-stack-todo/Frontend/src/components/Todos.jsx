import React from 'react'

const Todos = ({todos}) => {
  async function updateTodo(id){
    const res = await fetch("http://localhost:3000/Completed", {
        method: "PUT",
        body: JSON.stringify({
          id: id
        }),
        headers: {
          "Content-type": "application/json"
      }
      
    })
    const json = await res.json()
    console.log(json)
    alert("Updated")
  }
  return (
    <div>
      {todos.map((todo,index)=> {
        return <div key={index}>
                <h1>{todo.Title}</h1>
                <h2>{todo.Description}</h2>
                <button onClick={()=> updateTodo(todo._id)}>{todo.Completed?"Done!":"Mark as done"}</button>
            </div>
        
      })}
    </div>
  )
}

export default Todos
