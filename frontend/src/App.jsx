import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (response) => {
      setMessages((state) => [...state, response]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      from: "You",
      body: message,
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-800 ">
      <form onSubmit={handleSubmit} className="flex w-2/4 justify-end">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Name"
          className="w-full p-2 border-2 border-gray-500 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
      <ul className="flex flex-col bg-slate-700 w-2/4 p-4 rounded-md">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`w-max p-3 border-2 border-gray-500 rounded-md text-white mt-4 ${msg.from === "You" ? "bg-blue-500 self-start" : "bg-green-500 self-end"}`}
          >
            <div className="text-sm text-slate-300">{msg.from}: </div>
            {msg.from}: {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
