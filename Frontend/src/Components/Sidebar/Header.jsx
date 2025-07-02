import { IoCreateOutline } from "react-icons/io5";
import NewChats from "./NewChats";
import { useState } from "react";

function Header({setSelectedChat,setChats,chats}) {

    const [showNewChat, setShowNewChat] = useState(false);

    return (
        <div className='flex items-center justify-between px-4 mt-1 py-1'>
            <span className='font-bold text-2xl'>Chats</span>
            <div className='flex relative'>
                <span
                    onClick={() => setShowNewChat((prev) => !prev)}
                    className='font-semibold z-10 hover:bg-gray-800 cursor-pointer ps-2.5 pe-2 pt-1.5 pb-2 rounded'
                >
                    <IoCreateOutline className='text-xl' />
                </span>
                {showNewChat && <NewChats chats={chats} setChats={setChats} setShowNewChat={setShowNewChat} setSelectedChat={setSelectedChat}  />}
            </div>
        </div>
    )
}

export default Header