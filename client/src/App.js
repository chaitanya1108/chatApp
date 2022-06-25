import './App.css';
import io, { Socket } from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001'); //similar to connecting our server with client

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false); //will show chat only when joined a room

  const joinRoom = ()=>{
    if(username !=="" && room !== ""){ //if no username or room name, we dont run
      socket.emit("join_room",room) //sending data(room) to server
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? //conditional operator which shows Chat only when showChat is true 
      (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && joinRoom()}}/>
          <input type="text" placeholder="Room ID" onChange={(e)=>{setRoom(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && joinRoom()}}/>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )
      :
      (
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
