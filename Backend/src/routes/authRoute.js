import express from "express";
import { getUser, getUsers, login, signup, UpdateProfileImage } from "../controller/authController.js";
import upload from '../middleware/upload.js';


const authRoute = express.Router();


authRoute.get("/",(req,res)=>{
    res.send("<h1>Auth Working</h1>");
})

authRoute.post("/login",login);
authRoute.post("/signup",signup);
authRoute.post("/user",getUser);
authRoute.post('/get-users',getUsers);
authRoute.post('/update-user-profile-img',upload.single('image'),UpdateProfileImage)


export default authRoute;


