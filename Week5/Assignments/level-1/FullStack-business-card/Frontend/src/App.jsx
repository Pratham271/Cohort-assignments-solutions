import { useEffect, useState } from 'react'
import './App.css'
import BusinessCard from './components/BusinessCard'
// import Navbar from './components/Navbar'
import UpdateCard from './components/UpdateCard'

function App() {
  const [cards,setCards] = useState([])
  const [update, setUpdate] = useState(false)
  const [cardUpdate, setCardUpdate] = useState({})
  useEffect(()=> {
    async function fetchData(){
      const res = await fetch('http://localhost:3000/cards')
      const json = await res.json()
      setCards(json.cards)
    }
    fetchData();
  },[])
  return (
    <div>
      {/* <Navbar setCreate={setCreate}></Navbar> */}
      {update? <UpdateCard setUpdate={setUpdate} cardUpdate={cardUpdate} setCardUpdate={setCardUpdate}/>:
      <BusinessCard card={cards} setCardUpdate={setCardUpdate} setUpdate={setUpdate}></BusinessCard>}
    </div>
  )
}



export default App
