import axios from "axios";
import { useContext } from "react";
import { Context } from "../store/context";
import { useEffect } from "react";
import { useState } from "react";

function Chatting({ selectedUser }) {

  const [text, setText] = useState('');

  const { Backend_URL, socket, onlineUserSocketId, chatMessages, setChatMessages } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = text;
    try {
      const response = await axios.post(`${Backend_URL}/message/send-message`,
        {
          receiverId: selectedUser._id,
          msg: msg
        },
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
      const socketIdArray = onlineUserSocketId.filter((obj) => {
        const userId = Object.keys(obj)[0];
        if (userId == selectedUser._id) {
          return obj[userId]
        }
      });
      const socketId = socketIdArray[0][selectedUser._id];
      const sender = localStorage.getItem('id');
      const receiver = selectedUser._id;
      const id = response.data.newMessage._id;
      socket.emit("message", { message: msg, socketId, sender, receiver, id });
    } catch (error) {
      console.log("Error in handleSubmit(Send message)", error);
    }
  }

  const getMessage = async () => {
    try {
      const responce = await axios.get(`${Backend_URL}/message/get-message`, {
        headers: { token: localStorage.getItem('id') },
        params: { receiverId: selectedUser._id }
      })
      setChatMessages(responce.data);
    } catch (error) {
      console.log("Error in getMessage");
    }
  }


  useEffect(() => {
    getMessage();
  }, [selectedUser])

  return (
    <div className='bg-blue-600'>
      {/* Top */}
      <div className='bg-emerald-950 flex flex-col'>
        <span>{selectedUser.name}</span>
        <span> {onlineUserSocketId.some(item => item[selectedUser._id] != null) ? "Online" : "Offline" }</span>
      </div>


      {/* messages */}
      <div>
        {console.log(chatMessages)}
        {chatMessages.map((data) => {
          if (data.sender == localStorage.getItem('id')) {
            return (
              <div key={data._id} className="chat chat-end">
                <div className="chat-bubble">{data.message}</div>
              </div>
            )
          }
          else {
            if (data.receiver == selectedUser._id || data.sender == selectedUser._id) {
              return (
                <div key={data._id} className="chat chat-start">
                  <div className="chat-bubble">{data.message}</div>
                </div>
              )
            }
          }
        })}
      </div>


      {/* sender */}
      <div>
        <form onSubmit={handleSubmit} >
          <input type="text" className='border-2 border-white' value={text} onChange={(e) => setText(e.target.value)} />
          <button className='bg-green-950 p-1 px-2 hover:cursor-pointer'>Send</button>
        </form>
      </div>


    </div>
  )
}

export default Chatting