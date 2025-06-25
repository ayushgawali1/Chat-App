import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGroupChat:{type:Boolean,default:false},
  name:{type:String,required:false},
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message",required:false },
});

const ChatModule = mongoose.model('Chat', ChatSchema);

export default ChatModule
