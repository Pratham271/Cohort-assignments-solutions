import RevenueCard from "./components/RevenueCard"


function App() {
  return (
  <>
    <div className="grid grid-cols-4">
    <RevenueCard title={"Amount Pending"} orderCount={13} amount={"92,312.20"}/>  
    </div>
  </>
  )
}

export default App
