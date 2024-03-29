export default function useTodos(n){
      const [todos, setTodos] = useState([])
      const [loading, setLoading] = useState(true)
      useEffect(() => {
        const interval = setInterval(()=> {
          axios.get("https://sum-server.100xdevs.com/todos")
          .then(res => {
            setTodos(res.data.todos);
            setLoading(false)
          })
        },n*1000)
        axios.get("https://sum-server.100xdevs.com/todos")
        .then(res => {
          setTodos(res.data.todos);
          setLoading(false)
        })
        return() => {
          clearInterval(interval)
        }
      }, [n])
      return {todos,loading};
    }