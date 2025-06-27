import React from 'react'
import { HiOutlineChatAlt } from "react-icons/hi";


function NonChatting() {
  return (
    <div className='flex items-center pt-50 justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-2xl'><HiOutlineChatAlt size={100} /></span>
          <h4 className='text-6xl font-semibold'>Chat App</h4>
        </div>
        <p className='text-lg'>Select an User or Group to Start Chatting</p>
      </div>
    </div>
  )
}

export default NonChatting