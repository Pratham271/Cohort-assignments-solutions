import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const name = searchParams.get("name")

  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080')
    setSocket(socket)
  },[name])
  
  return (
    <div>
      Hi {name}
    </div>
  )
}

export default Room
