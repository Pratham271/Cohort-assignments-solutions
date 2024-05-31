import React from 'react'

const BusinessCard = ({card,setUpdate,setCardUpdate}) => {
  async function handleUpdate(id){
    const res = await fetch("http://localhost:3000/card/"+id)
    const json = await res.json()
    setCardUpdate(json.card)
    setUpdate(true)
  }
  return (
    <div className='container'>
    {card.map((c,index)=>(
      <div className="card" key={index}>
      <div className="card-header">
        <h1>{c.title}</h1>
        <p>{c.description}</p>
      </div>
      {/* <div>
      </div> */}
      <div className="card-body">
      <h2 >Interests</h2>
      {
        c.interests.map((interest,index)=> (
          <ul key={index}>
            <li>{interest}</li>
        </ul>
        ))
      }
      </div>
      <div className="card-footer" >
        {
          c.links.map((link,index)=> (
            <button key={index}><a href={link.url} target='_blank'>{link.name}</a></button>
          ))
        }
    </div>
    <br /> <br />
    <button style={{color:"white"}} onClick={()=> handleUpdate(c._id)}>Update</button>
    </div>
    ))}
  </div>
  )
}

export default BusinessCard
