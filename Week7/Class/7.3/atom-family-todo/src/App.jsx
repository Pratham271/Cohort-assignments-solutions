import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { todosAtomFamily } from './store/atoms/atoms'
import { useEffect } from 'react'



function App() {
  

  return (
    <RecoilRoot>
      <UpdaterTodo/>
      <Todo id={1}/>
      <Todo id={2}/>
    </RecoilRoot>
  )
}

function UpdaterTodo(){
  const [todoLoadable, setTodo] = useRecoilStateLoadable(todosAtomFamily(2))
  useEffect(()=> {
    setTimeout(()=> {
      setTodo({
        id: "2",
        title: "Study harder",
        description: "Deep study session should be of atleast 3 hours"
      })
    },5000)
  },[])
}

function Todo({id}){
  const [todo,setTodo]   = useRecoilStateLoadable(todosAtomFamily(id))
  const updateContents = () => {
    setTodo({
      title: todo.contents.title,
      description: todo.contents.description,
      completed: true
    })
  }
  if(todo.state==="loading"){
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <h4>
      {todo.contents.title}
      </h4>
      {todo.contents.description}
      <br />
      <button onClick={updateContents}>{todo.contents.completed?"Done": "Mark as Done"}</button>
    </div>
  )
}

// function Todo({id}) {
//   const setTodoId = useSetRecoilState(idAtom)
//   const todo = useRecoilValue(todoSelector)
//   console.log(todo)
//   // const todos = useRecoilValue(todoAtom)
//   // console.log(todos[0].title)
//   useEffect(()=> {
//     setTodoId(id)
//   },[id])


//   // useEffect(() => {
//   //   setTodos(Todos);
//   // }, []);

//   if (!todo) {
//     return <div>Loading...</div>; // or any loading indicator
//   }

//   return (
//     <div>
//       <h1>{todo.title}</h1>
//       <h4>{todo.description}</h4>
//     </div>
//   );
// }


export default App
