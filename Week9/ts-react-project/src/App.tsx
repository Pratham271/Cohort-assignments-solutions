
import './App.css'

function App() {

  return (
    <>
      <Todo title='go to gym' description='at 7pm' done={false}/>
    </>
  )
}

interface TodoProp{
  title: string,
  description: string,
  done: boolean
}

function Todo({title,description,done}:TodoProp){
  return (
    <div>
        <h1>{title}</h1>
        <br /><br />
        <h4>{description}</h4>
        <br /><br />
        <button>{done?"Done":"Mark as Done"}</button>
    </div>
  )
}

export default App
