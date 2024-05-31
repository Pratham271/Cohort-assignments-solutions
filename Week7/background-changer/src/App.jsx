import { useCallback, useMemo, useState } from 'react'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Initial background color

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };


  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      <h1>Background Changer</h1>
      <button onClick={() => changeBackgroundColor('#ff0000')}>Red</button>
      <button onClick={() => changeBackgroundColor('#00ff00')}>Green</button>
      <button onClick={() => changeBackgroundColor('#0000ff')}>Blue</button>
      <button onClick={() => changeBackgroundColor('#ffffff')}>Default</button>
    </div>
  )
}

export default App
