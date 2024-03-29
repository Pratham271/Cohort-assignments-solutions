import { useState } from 'react'

function App() {


  return (
    <div style={{display:"flex"}}>
    <Card>
     <Card>
     <TextComponent></TextComponent>
     </Card>
    </Card>
      <Card >
        <div>
          Hello there
        </div>
      </Card>
      
    </div>
  )
}

function Card({children}){
  
  return (
    <div style={{border: "2px solid black",padding: 10, margin:10}}>
      {children}
    </div>
  )
}

function TextComponent(){
  return (
    <div>
      Hi there
    </div>
  )
}

export default App
