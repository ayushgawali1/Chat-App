import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Chatting from '../Components/Chatting';
import NonChatting from './NonChatting';

function Home() {

  const [isUserSelected,setIsUserSelected] = useState(false);
  const [selectedUser,setSeletedUser] = useState(null);

  return (
    <div className='flex items-center justify-center'>
      <div className='flex'>
        {/* sidebar */}
        <Sidebar setSeletedUser={setSeletedUser} setIsUserSelected={setIsUserSelected} />
        {/* ChatBar */}
        {!isUserSelected ? <NonChatting /> : <Chatting selectedUser={selectedUser} /> }
      </div>
    </div>
  )
}

export default Home