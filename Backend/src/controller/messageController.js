import MessageModule from "../modules/message.js";
import userModule from "../modules/user.js";


export const getAllUser = async (req, res) => {
    try {
        const users = await userModule.find({ _id: { $ne: req.userId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getAllUser ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const { receiverId, msg } = req.body;

        const newMessage = new MessageModule({
            sender: senderId,
            receiver: receiverId,
            message: msg,
        });

        await newMessage.save();
        res.status(201).json({ msg: 'Message Send', newMessage });

    } catch (error) {
        console.log("Error in sendMessage ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}


export const getMessage = async (req, res) => {

    try {
        const senderId = req.userId;
        const { receiverId } = req.query;

        const messages = await MessageModule.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ createdAt: 1 }); // ascending order

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}
