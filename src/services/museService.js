import { WS_URL } from "../config/config";

export async function connectMuse(museRef, setStatus, wsRef) {
  try {
    // enable ppg
    museRef.current.enablePpg = true;

    await museRef.current.connect();
    await museRef.current.start();
    setStatus(true);
    console.log("✅ Muse device connected");

    // Establish WebSocket connection
    connectWebSocket(wsRef, setStatus);

    // Subscribe to different Muse data streams
    museRef.current.eegReadings.subscribe((data) => sendToWebSocket(wsRef, "eeg", data));
    museRef.current.accelerometerData.subscribe((data) => sendToWebSocket(wsRef, "accelerometer", data));
    museRef.current.gyroscopeData.subscribe((data) => sendToWebSocket(wsRef, "gyroscope", data));
    museRef.current.telemetryData.subscribe((data) => sendToWebSocket(wsRef, "telemetry", data));
    museRef.current.ppgReadings.subscribe((data) => sendToWebSocket(wsRef, "ppg", data));
    museRef.current.eventMarkers.subscribe((data) => sendToWebSocket(wsRef, "event_marker", data));
  } catch (error) {
    console.error("❌ Error connecting to Muse:", error);
  }
}

function connectWebSocket(wsRef, setStatus) {
  wsRef.current = new WebSocket(WS_URL);

  wsRef.current.onopen = () => {
    console.log("✅ WebSocket connected");
    setStatus(true);
  };

  wsRef.current.onerror = (error) => console.error("❌ WebSocket error:", error);

  wsRef.current.onclose = () => {
    console.log("🔴 WebSocket closed");
    setStatus(false);
  };
}

function sendToWebSocket(wsRef, type, data) {
  if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
    wsRef.current.send(JSON.stringify({ type, data }));
  }
}
