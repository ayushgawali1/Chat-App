import { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { Context } from "../../store/context";
import { CiImageOn } from "react-icons/ci";



function Sending({ selectedChat, setChatMessages }) {


  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const { Backend_URL, socket, onlineUserSocketId } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = text;
    const formData = new FormData();
    if (selectedChat.isGroupChat) {
      console.log("Group Chat");
      const receiverIds = selectedChat.receiverId.map(user => user._id);
      receiverIds.forEach((id, index) => formData.append(`receiver[${index}]`, id));
    }
    else {
      console.log("Single Chat");
      formData.append("receiverId", selectedChat.receiverId);
    }
    formData.append("chatId", selectedChat.chatId);
    formData.append("msg", text);
    if (file) {
      formData.append("image", file); // "image" matches Multer field name
    }
    try {
      const response = await axios.post(`${Backend_URL}/message/send-message`,
        formData,
        {
          headers: {
            token: localStorage.getItem('id')
          }
        }
      );
      setChatMessages((prev) => [
        ...prev,
        response.data.newMessage
      ]);
      setText('');
      setFile(null);
      const socketId = onlineUserSocketId[selectedChat.receiverId];
      const sender = localStorage.getItem('id');
      const receiver = selectedChat.receiverId;
      const id = response.data.newMessage._id;
      console.log(response.data);
      
      socket.emit("message", { message: msg, socketId, sender, receiver, id, image: response.data.newMessage.image ,chatId:response.data.newMessage.chatId });

    } catch (error) {
      console.log("Error in handleSubmit(Send message)", error);
    }
  }

  return (
    <div className="w-full bg-black/20 mb-1 relative">
      {file && <div className="absolute bottom-13 left-3">
        <img src={URL.createObjectURL(file)} className="h-50" alt="" />
      </div>
      }

      <form onSubmit={handleSubmit} className="flex px-4 gap-4 items-center justify-center" >
        <input
          type="text"
          placeholder="Type your message"
          className='outline-none py-3 px-2 w-full'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span className="relative inline-block w-9 h-9 rounded hover:bg-gray-700 my-1 cursor-pointer">
          <span className=" absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center text-white">
            <CiImageOn />
          </span>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer z-10"
          />
        </span>
        <button className='hover:bg-gray-800 m-2 p-2 ps-2.5 rounded hover:cursor-pointer'><IoSend /></button>
      </form>
    </div>
  )
}

export default Sending