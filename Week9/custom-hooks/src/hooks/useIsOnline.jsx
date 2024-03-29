import { useEffect, useState } from "react"

export default function useIsOnline(){
    const [isOnline, setIsOnline] = useState(window.navigator.onLine)
  
    useEffect(()=> {
      window.addEventListener('online', ()=> {
        setIsOnline(true)
      })
      window.addEventListener('offline', ()=> {
        setIsOnline(false)
      })

      return ()=> {
        window.removeEventListener('online', ()=> {
          setIsOnline(true)
        })
        window.removeEventListener('offline', ()=> {
          setIsOnline(false)
        })
      }
    },[])
    return isOnline;
  
  }