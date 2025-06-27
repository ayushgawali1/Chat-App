import ChatModule from "../modules/chat.js";

export const getChats = async (req, res) => {
    const { userId } = req.body;
    try {
        const chats = await ChatModule.find({ users: userId })
            .populate('users', 'name _id');

        res.status(200).json(chats);
    } catch (error) {
        console.log("Error in getChats ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

export const createChats = async (req, res) => {
    const { userId, user } = req.body;
    try {
        const chat = await ChatModule.findOne({
            users: { $all: [user._id, userId] },
        });

        if (chat) return res.status(200).json(chat);

        const newChat = await ChatModule.create({
            users: [user._id, userId],
        });

        res.status(201).json(newChat);

    } catch (error) {
        console.log("Error in createChats ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}


export const createGroupChat = async(req,res) => {
    const { userId, membersId, groupName } = req.body;
    try {

        const members = [...membersId,userId];

        const newChat = await ChatModule.create({
            users:members,
            isGroupChat:true,
            name:groupName
        });

        res.status(201).json(newChat);

    } catch (error) {
        console.log("Error in createChats ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}
