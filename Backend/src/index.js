import express from "express";
import authRoute from "./routes/authRoute.js";
import connectDB from "./lib/db.js";
import cors from "cors";
import messageRoute from "./routes/messageRoute.js";
import { app,server } from "./lib/socket.js";


const PORT = 5000;

app.use(express.json());
app.use(cors())

connectDB();

app.get("/",(req,res)=>{
    res.send("<h1>Server Running</h1>")
})


app.use("/auth",authRoute);
app.use("/message",messageRoute);


server.listen(PORT,()=>{
    console.log(`Server runniung on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})