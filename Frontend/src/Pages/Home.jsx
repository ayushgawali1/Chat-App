import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Chatting from '../Components/Chatting';
import NonChatting from '../Components/NonChatting';

function Home() {

  const [selectedChat,setSelectedChat] = useState(null);


  return (
    <div className='flex w-full h-full'>

      {/* sidebar */}
      <div className='w-1/3'>
        <Sidebar setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
      </div>

      <hr className='border-1 h-full' />

      {/* ChatBar */}
      <div className=' w-full'>
        {!selectedChat ? <NonChatting /> : <Chatting selectedChat={selectedChat} />}
      </div>

    </div>
  )
}

export default Home