import express from "express";
import { getAllUser, getMessage, sendMessage } from "../controller/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware .js";
import upload from '../middleware/upload.js';

const messageRoute = express.Router();


messageRoute.get("/",(req,res)=>{
    res.send("<h1>Message Working</h1>");
})

messageRoute.get('/get-all-user',authMiddleware,getAllUser);

messageRoute.get('/get-message',authMiddleware,getMessage);

messageRoute.post('/send-message',authMiddleware,upload.single('image'),sendMessage);


export default messageRoute;


