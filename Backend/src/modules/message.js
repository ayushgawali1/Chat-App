import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default:null
    },
    message: {
      type: String,
    },
    image:{
      type: String,
      default:'',
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
    }
  },
  { timestamps: true }
);

const MessageModule = mongoose.model('Message', messageSchema);

export default MessageModule;