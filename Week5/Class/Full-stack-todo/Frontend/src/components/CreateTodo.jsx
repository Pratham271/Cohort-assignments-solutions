import React, { useState } from 'react'

const CreateTodo = () => {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    async function handleSubmit(){
        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                Title: title,
                Description: description
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        const json = await response.json()
        alert("Todo added")
    }
  return (
    
    <div>
      <input type="text" placeholder='title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
      <br /><br />
      <input type="text" placeholder='description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
      <br /><br />
      <button onClick={handleSubmit}>Add a todo</button>
    </div>
  )
}

export default CreateTodo
