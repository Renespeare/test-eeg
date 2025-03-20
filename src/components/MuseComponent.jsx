import { useRef, useState } from "react";
import { connectMuse } from "../services/museService";
import { MuseClient } from "muse-js";

export default function MuseComponent() {
  const museRef = useRef(new MuseClient());
  const wsRef = useRef(null);
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h2>Muse Real Data Streaming</h2>
      <button onClick={() => connectMuse(museRef, setStatus, wsRef)} disabled={status}>
        {status ? "Connected" : "Connect to Muse"}
      </button>
    </div>
  );
}
