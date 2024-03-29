import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { jobsAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationsCounter } from './store/atoms/atoms'

function App() {
  

  return (
    <>
     <RecoilRoot>
        <TopBar/>
     </RecoilRoot>

    </>
  )
}

function TopBar(){
  const networkNotificationCount = useRecoilValue(networkAtom)
  const jobsNotificationCount = useRecoilValue(jobsAtom)
  // const [messagingNotificationCount, setMessagingNotificationCount] = useRecoilState(messagingAtom)
  const messagingNotificationCount = useRecoilValue(messagingAtom)
  const NotificationsCount = useRecoilValue(notificationsAtom)

  // doing it use memo
  // const totalNotifications = useMemo(()=> {
  //     return networkNotificationCount + jobsNotificationCount + messagingNotificationCount + NotificationsCount
  // },[networkNotificationCount, jobsNotificationCount, messagingNotificationCount, NotificationsCount])
  
  // doing it using selector from recoil
  const totalNotifications = useRecoilValue(totalNotificationsCounter)
  return(
    <div>
      <button>Home</button>

      <button>My network ({networkNotificationCount>=99?"99+":networkNotificationCount})</button>
      <button>Jobs ({jobsNotificationCount})</button>
      <button>Messaging ({messagingNotificationCount})</button>
      <button>Notifications ({NotificationsCount})</button>

      <button>Me ({totalNotifications})</button>
      {/* <button onClick={()=> setMessagingNotificationCount(m => m+1)}>Me</button> */}
    </div>
  )
}

export default App
