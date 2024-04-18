import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  // problemId, userId, code, language
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("")
  const [status, setStatus] = useState("")
  useEffect(()=> {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      setSocket(newSocket)
      console.log('Connection Established')
    }
    newSocket.onmessage = (message) => {
      console.log('Message recieved', message.data)
      const data = JSON.parse(message.data)
      setStatus(data.status)
    }
    
    return()=> newSocket.close()
  },[])
  if(!socket){
    return (
      <div>
        Connecting to websocket...
      </div>
    )
  }
  return (
    <>
      {status? <div>{status}</div>:
      <div>
      <div>
        <input onChange={(e)=> setCode(e.target.value)} type='text'/>
      </div>
      <div>
        <input onChange={(e)=> setLanguage(e.target.value)} type='text'/>
      </div>
      <div>
        <button onClick={()=> {
          axios.post('http://localhost:3000/submit', {
            problemId: "1",
            userId: "2",
            code: code,
            language: language
          })
          socket.send("2")
        }}>Submit</button>
      </div>
      </div>}
    </>
  )
}

export default App
