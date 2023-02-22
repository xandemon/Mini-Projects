import "./App.css";
import { useCounter } from "./useCounter";
// import { useState } from "react";
// import { Job } from "./learning concepts/Job";
// import { planets } from "./learning concepts/planets";

function App() {
  const [counter, incCounter, decCounter, resCounter] = useCounter(100);
  return (
    <div className="App">
      <button onClick={incCounter}>Increase</button>
      <button onClick={decCounter}>Decrease</button>
      <button onClick={resCounter}>Reset</button>
      <p>Counter: {counter}</p>
    </div>
  );
}

export default App;
