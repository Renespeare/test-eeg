import { useRef, useState } from "react";
import { connectWebSocket } from "../services/museDummyService";

export default function DummyComponent() {
  const wsRef = useRef(null);
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h2>Muse Dummy Data Streaming</h2>
      <p>WebSocket Status: {status ? "Connected" : "Disconnected"}</p>


      <button onClick={() => connectWebSocket(wsRef, setStatus)} disabled={status}>
        {status ? "Connected" : "Connect to Dummy Muse and WebSocket"}
      </button>

    </div>
  );
}
