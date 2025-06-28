import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        default:'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
    }
}, { timestamps: true });

const userModule = mongoose.model('User', userSchema);

export default userModule