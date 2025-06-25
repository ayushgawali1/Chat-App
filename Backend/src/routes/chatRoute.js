import express from "express";
import { authMiddleware } from "../middleware/authMiddleware .js";
import { createChats, getChats , createGroupChat } from "../controller/chatController.js";

const chatRoute = express.Router();


chatRoute.get("/",(req,res)=>{
    res.send("<h1>Message Working</h1>");
})

chatRoute.post('/get-chats',getChats);
chatRoute.post('/create-chat',createChats);
chatRoute.post('/create-group-chat',createGroupChat);



export default chatRoute;


