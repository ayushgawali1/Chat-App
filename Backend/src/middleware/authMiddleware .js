import userModule from "../modules/user.js";

export const authMiddleware  = async (req, res ,next) => {
    const  {token}   = req.headers;
    try {
        const user = await userModule.findById(token);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        req.userId = token ;
        next();
    } catch (error) {
        console.log("Error in authMiddleware ", error.message);
        res.status(500).json({ msg: 'Server Side Error' });
    }
}