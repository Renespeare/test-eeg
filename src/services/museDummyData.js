export const generateDummyData = (type) => {
  switch (type) {
    case "eeg":
      return { channel1: Math.random(), channel2: Math.random(), timestamp: Date.now() };
    case "accelerometer":
      return { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 };
    case "gyroscope":
      return { x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360 };
    case "telemetry":
      return { battery: Math.random() * 100, temperature: 36 + Math.random() };
    case "ppg":
      return { red: Math.random() * 100, infrared: Math.random() * 100, green: Math.random() * 100 };
    case "event_marker":
      return { event: "Blink", timestamp: Date.now() };
    default:
      return {};
  }
};

export const sendDummyData = (ws) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  const types = ["eeg", "accelerometer", "gyroscope", "telemetry", "ppg", "event_marker"];
  types.forEach((type) => {
    const data = generateDummyData(type);
    ws.send(JSON.stringify({ type, data }));
  });

  console.log("Sent dummy data!");
};
