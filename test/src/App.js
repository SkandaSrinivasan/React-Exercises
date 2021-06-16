import React, {useState} from 'react';

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseOne = () => setCounter(counter+1);

  const resetToZero = () => setCounter(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseOne}>
        plus
      </button>
      <button onClick={resetToZero}> 
        zero
      </button>
    </div>
  )
}

export default App;
