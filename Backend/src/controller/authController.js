import userModule from "../modules/user.js";
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs';

// Signup
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModule.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });
        const newUser = new userModule({ name, email, password });
        await newUser.save();
        res.status(201).json({ msg: 'User created', userData: newUser });
    } catch (error) {
        console.log("Error in SignUp ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModule.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = (password === user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        res.status(201).json({ msg: 'Successfully Login', userData: user });

    } catch (error) {
        console.log("Error in login ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

// Get User 
export const getUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModule.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(201).json({ userData: user });
    } catch (error) {
        console.log("Error in getUser ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

export const getUsers = async (req, res) => {
    const { name, id } = req.body;
    try {
        const users = await userModule.find({
            name: new RegExp(`^${name}`, 'i'),  // name = input value (e.g., "b")
            _id: { $ne: id }
        });
        res.status(201).json(users);
    } catch (error) {
        console.log("Error in getUsers ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}


// Update profile Image

export const UpdateProfileImage = async (req, res) => {
    const { id } = req.body;
    try {

        let user = await userModule.findById(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });


        let result = '';

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'chat_images'
            });
            fs.unlinkSync(req.file.path);
        }

        user = await userModule.findByIdAndUpdate(
            id,                          // The document _id
            { $set: { profileImage: result.secure_url } }, // Update object
            { new: true }                  // Options (return the updated document)
        );

        res.status(201).json({ userData: user });

    } catch (error) {
        console.log("Error in getUsers ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}