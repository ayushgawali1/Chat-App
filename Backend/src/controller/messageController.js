import MessageModule from "../modules/message.js";
// import upload from '../middleware/upload.js';
import cloudinary from '../lib/cloudinary.js';
import fs from 'fs';

export const getAllUser = async (req, res) => {
}

export const sendMessage = async (req, res) => {
    
    try {
        const senderId = req.userId;
        const { receiverId, msg, chatId , isGroupChat } = req.body;

        let result = '';

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'chat_images'
            });
            fs.unlinkSync(req.file.path);
        }

        const newMessage = new MessageModule({
            sender: senderId,
            receiver: receiverId,
            message: msg,
            chatId,
            image: result.secure_url
        });

        await newMessage.save();
        res.status(201).json({ msg: 'Message Send', newMessage });

    } catch (error) {
        console.log("Error in sendMessage ", error);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}


export const getMessage = async (req, res) => {
    try {
        const { chatId } = req.query;

        const messages = await MessageModule.find({ chatId })

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}
