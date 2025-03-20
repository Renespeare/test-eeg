import { useState } from "react";
import MuseComponent from "./components/MuseComponent";
import MuseDummyComponent from "./components/MuseDummyComponent";

export default function App() {
  const [useDummy, setUseDummy] = useState(true);

  return (
    <div>
      <h1>Muse Streaming App</h1>
      <button onClick={() => setUseDummy((prev) => !prev)}>
        Switch to {useDummy ? "Real" : "Dummy"} Mode
      </button>
      {useDummy ? <MuseDummyComponent /> : <MuseComponent />}
    </div>
  );
}
