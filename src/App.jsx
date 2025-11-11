// import { useState } from 'react'
// import './App.css'
// import Register from './components/Register'
// import Login from './components/Login';
// import TodoList from './components/TodoList';
// function App() {
//     const [page, setPage] = useState(localStorage.getItem('token') ? 'todos' : 'login');
// console.log(import.meta.env.VITE_BASE_URL) // "123"
// console.log(import.meta.env.DB_PASSWORD) // undefined
//   return (

// <>
// {page === 'login' && <div><Login/></div>
// }

// {page === 'todos' && <div><TodoList/></div>}
// </>
//   )
// }

// export default App
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearChat } from "./features/chatSlice";

const socket = io("http://localhost:5000"); // backend URL

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (text.trim() === "" || username.trim() === "") return;
    const msgData = {
      username,
      text,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", msgData);
    setText("");
  };

  return (
    <div>
      <h2>Live Chat</h2>

      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ height: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "5px", marginTop: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.username}:</b> {msg.text}{" "}
            <small>({msg.time})</small>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => dispatch(clearChat())}>Clear Chat</button>
      </div>
    </div>
  );
};

export default App;
