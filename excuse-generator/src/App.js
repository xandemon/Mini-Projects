import "./App.css";
import { useState } from "react";
// import { Job } from "./learning concepts/Job";
// import { planets } from "./learning concepts/planets";

function App() {
  const [excuse, setExcuse] = useState("");
  function getExcuse(reason) {
    fetch(`https://excuser-three.vercel.app/v1/excuse/${reason}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExcuse(data[0].excuse);
      });
  }
  return (
    <div className="App">
      <h1>Generate An Excuse</h1>
      <button onClick={() => getExcuse("party")}>Party</button>
      <button onClick={() => getExcuse("family")}>Family</button>
      <button onClick={() => getExcuse("office")}>Office</button>
      <div>{excuse}</div>
    </div>
  );
}

export default App;
