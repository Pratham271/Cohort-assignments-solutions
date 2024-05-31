import { useState } from 'react'


function App() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [todos, setTodos] = useState([]);
  
  function handleSubmit(e){
    e.preventDefault()
    setTodos([...todos, {title,desc,text:"Mark as Done"}])
    // setTitle('')
    // setDesc('')
  }
  function handleTitleChange(e){
    setTitle(e.target.value)
  }

  function handleDescriptionChange(e){
    setDesc(e.target.value)
  }

  function handleDone(id){
    // using previous document approach
    //  const element = document.getElementById(id)
    //  element.children[2].innerHTML = "Done!"

    // new Use State variable 
    setTodos(todos.map((t,index)=> {
      if(index==id){
        // both are same
        // return {...t, text:"Done!"}
        t.text="Done!"
      }
      return t
    }))
   
  }
  return (
    <>
      <div>
        <div>
          <input type="text" placeholder='Title' value={title} onChange={handleTitleChange}/>
          <br /><br />
          <input type="text" placeholder='Description' value={desc} onChange={handleDescriptionChange}/>
          <br /><br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {
          todos?
          <div>
            {todos.map((t, index) => (
            <div key={index} id={index}>
            <p>{t.title}</p>
            <p>{t.desc}</p>
            {/* <button onClick={()=> handleDone(index)}>Mark as done</button> */}
            <button onClick={()=> handleDone(index)}>{t.text}</button>
            
            </div>
            ))}
          </div> : <div></div>
        }
        
      
      </div>
    </>
  )
}

export default App
