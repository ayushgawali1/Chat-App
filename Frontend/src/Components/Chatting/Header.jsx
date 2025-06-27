import React from 'react'

function Header({ selectedChat }) {
  return (
    <div className='flex gap-4 py-1 items-center pb-1.5 ps-5'>
      <img className='h-10 w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s" alt="" />
      <div className='flex flex-col justify-center'>
        <span>{selectedChat.name}</span>
        <span className='text-sm/5'>Offline</span>
        {/* <span> {onlineUserSocketId.some(item => item[selectedChat._id] != null) ? "Online" : "Offline"}</span> */}
      </div>
    </div>
  )
}

export default Header