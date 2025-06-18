import userModule from "../modules/user.js";

// Signup
export const signup = async (req, res) => {
    const { name, userName, password } = req.body;
    try {
        const existingUser = await userModule.findOne({ userName });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });
        const newUser = new userModule({ name, userName, password });
        await newUser.save();
        res.status(201).json({ msg: 'User created', data: newUser });
    } catch (error) {
        console.log("Error in SignUp ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}

// Login
export const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await userModule.findOne({ userName });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = (password === user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        res.status(201).json({ msg: 'Successfully Login', data: user });

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
        res.status(201).json(user);
    } catch (error) {
        console.log("Error in getUser ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}