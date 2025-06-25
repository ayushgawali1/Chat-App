import express from "express";
import { getUser, getUsers, login, signup } from "../controller/authController.js";

const authRoute = express.Router();


authRoute.get("/",(req,res)=>{
    res.send("<h1>Auth Working</h1>");
})

authRoute.post("/login",login);
authRoute.post("/signup",signup);
authRoute.post("/user",getUser);
authRoute.post('/get-users',getUsers);


export default authRoute;


