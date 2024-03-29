
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom, evenSelector } from './store/atoms/count'


function App() {
  

  return (
    <div>
      <RecoilRoot>
          <Count/>
      </RecoilRoot>
    </div>
  )
}

function Count(){
  console.log("count re-rendered")
  return (
    <div>
      <CountRender/>
      <Buttons />
      <IsEven/>
    </div>
  )
}

function CountRender(){
  const count= useRecoilValue(countAtom)
  return(
    <div>
      Count is {count}
    </div>
  )
}

function IsEven(){
  const count = useRecoilValue(evenSelector)
  return (
    <div>
        {count==0?"It is even":null}
    </div>
  )
}

function Buttons(){
  // const [count,setCount] = useRecoilState(countAtom)
  const setCount = useSetRecoilState(countAtom)
  console.log("buttons re-render")
  return(
    <div>
      <button onClick={()=> setCount(count=>count+1)}>Increment</button>
      <button onClick={()=> setCount(count=>count-1)}>Decrement</button>
    </div>
  )
}



export default App
