const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors'); //middleware used to resolve cors issues in socket.io
const {Server} = require('socket.io');
app.use(cors());

const server = http.createServer(app);

    const io = new Server(server,{ //connecting socket.io server with express server
        cors:{ //settings for cors
            origin: "http://localhost:3000", //react calls our server
            methods: ['GET','POST'],
        },
    });

    //socket.io implementation
    io.on("connection",(socket)=>{
        console.log(`User Connected: ${socket.id}`);

        socket.on("join_room",(data)=>{ //when someone joins a room; data is passed through frontend
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
            
        })

        socket.on("send_message",(data)=>{
            socket.to(data.room).emit("receive_message",data); //sending your text to the room for others to receive
        });

        socket.on("disconnect",()=>{
            console.log(`User Disconnected: ${socket.id}`);
        });
    });
    
server.listen(3001,()=>{
    console.log('server running');
});