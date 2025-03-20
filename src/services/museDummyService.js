import { WS_URL } from "../config/config";
import { sendDummyData } from "./museDummyData";

export function connectWebSocket(wsRef, setWsStatus) {
  if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
    console.log("⚠️ WebSocket already connected");
    return;
  }

  wsRef.current = new WebSocket(WS_URL);

  wsRef.current.onopen = () => {
    console.log("✅ Dummy WebSocket connected");
    setWsStatus(true);
  };

  wsRef.current.onerror = (error) => console.error("❌ WebSocket error:", error);

  wsRef.current.onclose = () => {
    console.log("🔴 WebSocket closed");
    setWsStatus(false);
  };

  // Send dummy data every second
  setInterval(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      sendDummyData(wsRef.current);
    }
  }, 1000);
}
