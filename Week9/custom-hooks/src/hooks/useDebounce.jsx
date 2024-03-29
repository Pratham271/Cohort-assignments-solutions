import { useEffect, useState } from "react";

export default function useDebounce(inputValue,delay){
    const [debounceValue,setDebounceValue] = useState(inputValue)
    
    useEffect(()=> {
        const timerId = setTimeout(()=> {
            setDebounceValue(inputValue)
        },delay)

        return ()=> {
            clearInterval(timerId)
        }
    },[inputValue,delay])
    return debounceValue;
}