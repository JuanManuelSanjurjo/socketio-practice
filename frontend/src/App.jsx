import io from "socket.io-client";
import "./App.css";
import { useState } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
  };
  const handleasd = useCallback(() => {
    console.log("asd");
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <button onClick={handleasd}>asd</button>
      </div>
    </>
  );
}

export default App;
