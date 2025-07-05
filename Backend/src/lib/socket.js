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

let hashSocket = {};

io.on('connection', (socket) => {

  const { userId } = socket.handshake.auth;

  hashSocket[userId] = socket.id;

  socket.on("get-all-sockets", () => {
    // const allSocketIds = Array.from(io.sockets.sockets.keys());

    // OR broadcast to everyone:
    io.emit("all-sockets", hashSocket);
  });

  socket.on("message", ({ message, socketId, sender, receiver, id, image, chatId }) => {
    io.to(socketId).emit("send-message", { message, sender, receiver, _id: id, image, chatId });
  });

  socket.on('sidebar-user', ({ socketId, chatData }) => {
    io.to(socketId).emit("get-newly-added-sidebar-user",chatData);
  })

  socket.on("disconnect", () => {
    delete hashSocket[userId];
    io.emit("all-sockets", hashSocket);
  })
});


export { app, server, io }