import { useEffect, useState } from "react";

export default function useDimensions(){
    const [dimension,setDimension] = useState({height:window.innerHeight,width:window.innerWidth})

    useEffect(()=> {
        window.addEventListener('resize', ()=> {
            setDimension({height: window.innerHeight, width:window.innerWidth})
        })
        return ()=> {
            window.removeEventListener('resize', ()=> {
                setDimension({height: window.innerHeight, width:window.innerWidth})
            })
        }
    },[])
    return dimension
}