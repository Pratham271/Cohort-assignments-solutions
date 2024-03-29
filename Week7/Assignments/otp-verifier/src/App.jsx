import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);
  const [showOtp, setShowOtp] = useState(false)
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  function handleChange(e, index) {
    const value = e.target.value;
    const prevIndex = index - 1;
    const nextIndex = index + 1;

    if (value === '') {
      // If input is empty, move focus to the previous input
      if (prevIndex >= 0) {
        inputRefs.current[prevIndex].focus();
      }
    } else {
      setOtp(prevOtp => {
        // console.log(prevOtp)
        const newOtp = prevOtp.slice(0, index) + value 
        if (index < 3) {
          // Move focus to the next input if available
          inputRefs.current[nextIndex].focus();
        }
        return newOtp
      });
    }
    
  }

  return (
    <div style={{ width: "" }}>
      {[1, 2, 3, 4].map((_, index) => (
        <input
          key={index}
          type="text"
          style={{ width: "48px", height: "48px", marginRight: "10px", textAlign: "center", fontSize: "larger" }}
          maxLength={1} // Limit input length to 1 character
          ref={el => inputRefs.current[index] = el} // Store reference to input element
          onChange={(e) => handleChange(e, index)}
        />
      ))}
      <button onClick={()=> {
        if(otp.length==4) setShowOtp(true)
        setTimeout(()=> {
          setShowOtp(false)
      },2000)
      }}>Verify otp</button>
      {showOtp?<p>{otp}</p>:null}
    </div>
  );
}

export default App;
