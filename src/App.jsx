import { MuseClient } from "muse-js";
import { useEffect, useState } from "react";

function App() {
  const muse = new MuseClient();
  const [status, setStatus] = useState(false);

  const onConnectButtonClick = async () => {
    await muse.connect();
    muse.start();
  };

  useEffect(() => {
    muse.connectionStatus.subscribe((newStatus) => {
      console.log(newStatus);
    });
    return () => {
      muse.disconnect();
    };
  }, []);

  return (
    <div>
      <button onClick={onConnectButtonClick}>Connect</button>
    </div>
  );
}

export default App;
