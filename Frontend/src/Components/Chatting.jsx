import axios from "axios";
import { useContext } from "react";
import { Context } from "../store/context";
import { useEffect } from "react";
import Header from "./Chatting/Header";
import Messages from "./Chatting/Messages";
import Sending from "./Chatting/Sending";

function Chatting({ selectedChat }) {

  const { Backend_URL, socket, onlineUserSocketId, chatMessages, setChatMessages } = useContext(Context);

  const getMessage = async () => {
    try {
      const responce = await axios.get(`${Backend_URL}/message/get-message`, {
        headers: { token: localStorage.getItem('id') },
        params: { chatId: selectedChat.chatId }
      })
      setChatMessages(responce.data);
    } catch (error) {
      console.log("Error in getMessage");
    }
  }

  useEffect(() => {
    getMessage();
  }, [selectedChat])

  return (
    <div className='h-full flex flex-col'>
      {/* Top */}
      <Header selectedChat={selectedChat} />
      <hr />
      <div className="flex flex-col h-full justify-between">
        {/* messages */}
        <Messages chatMessages={chatMessages} selectedChat={selectedChat} />
        {/* sender */}
        <Sending setChatMessages={setChatMessages} selectedChat={selectedChat} />
      </div>
    </div>
  )
}

export default Chatting