import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { descriptionState, titleState, todosState, filterTodos, filtered } from './store/atoms/todos'

function App() {
  return (
   <RecoilRoot>
    <div>
      <Inputs/>
   </div>
   </RecoilRoot>
  )
}

function Inputs(){
  const [title, setTitle] = useRecoilState(titleState)
  const [description,setDescription] = useRecoilState(descriptionState)
  const [todos,setTodos] = useRecoilState(todosState)
  function createTodo(){
    setTodos([ ...todos, {
      title: title,
      description: description
    }])
    setTitle('')
    setDescription('')
  }
  return (
    <div>
      <input type="text" name='title' value={title} placeholder='Title' onChange={(e)=> setTitle(e.target.value)}/>
      <br /><br />
      <input type="text" name='description' value={description} placeholder='Description' onChange={(e)=> setDescription(e.target.value)}/>
      <br /><br />
      <button onClick={createTodo}>Add a todo</button>
      <br /><br />
      {todos.length>0?<FilterTodos/>:<></>}
      <Todos/>
    </div>
  )
}

function Todos() {
  const filteredTodos = useRecoilValue(filtered);
  const filterString = useRecoilValue(filterTodos); // Access filter string
  const todos = useRecoilValue(todosState)
  return (
    <div>
      {filterString === '' ? ( // Check if filter string is empty
        todos.map((todo, index) => ( // Display all todos
          <div key={index}>
            <h1>{todo.title}</h1>
            <h3>{todo.description}</h3>
          </div>
        ))
      ) : (
        filteredTodos.map((todo, index) => ( // Display filtered todos
          <div key={index}>
            <h1>{todo.title}</h1>
            <h3>{todo.description}</h3>
          </div>
        ))
      )}
    </div>
  );
}

function FilterTodos(){
  const [filter,setFilter] = useRecoilState(filterTodos);
  return(
    <div>
      <input type="text" placeholder='Filter Todos' value={filter}  onChange={(e)=> {
        setFilter(e.target.value) 
      }}/>
    </div>
  )
}

export default App
