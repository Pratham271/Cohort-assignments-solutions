import { useEffect, useState } from 'react'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import {  networkAtom, totalNotificationsCount } from './store/atoms/atoms'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecoilRoot>
        <MainApp/>
      </RecoilRoot>
    </>
  )
}

function MainApp(){
  const [notifications,setNotifcations] = useRecoilState(networkAtom)
  const totalNotifications = useRecoilValue(totalNotificationsCount)
  // we can use this useEffect in atoms to avoid the 0 flshing as the default value
  // useEffect(()=> {
  //   axios.get("https://sum-server.100xdevs.com/notifications")
  //   .then(res => {
  //     setNotifcations(res.data)
  //   })
  // },[])

  return(
    <div>
      <button>Home</button>

      <button>My network ({notifications.network>=99?"99+":notifications.network})</button>
      <button>Jobs ({notifications.jobs})</button>
      <button>Messaging ({notifications.messaging})</button>
      <button>Notifications ({notifications.notifications})</button>

      <button>Me ({totalNotifications})</button>
      {/* <button onClick={()=> setMessagingNotificationCount(m => m+1)}>Me</button> */}
    </div>
  )
}

export default App
