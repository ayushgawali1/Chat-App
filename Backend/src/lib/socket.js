import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let hashSocket = [];

io.on('connection', (socket) => {
  console.log('a user connected  ', socket.id);

  // const { userId } = socket.handshake.query;
  const { userId } = socket.handshake.auth;
  console.log(userId);
  
  // hashSocket[userId] = socket.id;
  hashSocket.push({ [userId]: socket.id });

  socket.on("get-all-sockets", () => {
    // const allSocketIds = Array.from(io.sockets.sockets.keys());

    // OR broadcast to everyone:
    io.emit("all-sockets", hashSocket);
  });

  socket.on("message", ({message,socketId,sender,receiver,id}) => {
    console.log("Mesage",socket.id);
    io.to(socketId).emit("send-message",{message,sender,receiver,_id:id});
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    // io.emit("all-sockets", Array.from(io.sockets.sockets.keys()));
    hashSocket = hashSocket.filter(obj => {
      const value = Object.values(obj)[0];
      return value !== socket.id;
    });
    io.emit("all-sockets", hashSocket);
  })
});


export { app, server, io }