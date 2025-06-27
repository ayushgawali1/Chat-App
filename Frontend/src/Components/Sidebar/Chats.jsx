import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/context';
import axios from 'axios';

function Chats({setSelectedChat}) {

  const [chats, setChats] = useState([]);

  const { Backend_URL } = useContext(Context);

  const getAllChats = async () => {
    try {
      const responce = await axios.post(`${Backend_URL}/chat/get-chats`, {
        userId: localStorage.getItem('id')
      });
      setChats(responce.data);
      console.log(responce.data);
    } catch (error) {
      console.log("Error in getAllUser", error.message);
    }
  }

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className='mt-4 overflow-auto h-[588px] pb-2'>
      <ul className='flex flex-col gap-4'>
        {chats.map((item) => {
          if (item.isGroupChat) {
            return <span key={item._id} onClick={() => setSelectedChat(item)} className='bg-amber-500 py-1 flex gap-x-10' >{item.name}</span>;
          } else {
            const otherUser = item.users.find(u => u._id !== localStorage.getItem('id'));
            const data = { _id: otherUser._id, name: otherUser.name, chatId: item._id };
            return (
              <li className='flex items-center gap-3 ps-3 hover:bg-gray-900 py-2 me-3' key={otherUser._id} onClick={() => setSelectedChat(data)}>
                <img
                  className='h-10 rounded-full'
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  alt=""
                />
                <span className='flex flex-col gap-0.5 justify-center w-full me-6'>
                  <span className='flex justify-between '>
                    <p className=''>{otherUser.name}</p>
                    <p className='text-sm self-end'>Time</p>
                  </span>
                  <p className='text-sm/4'>Latest Message</p>
                </span>
              </li>
            );
          }
        })}
        {/* <>
          {chats.map((item) => {
            if (item.isGroupChat) {
              return <span key={item._id} onClick={() => setSelectedChat(item)} className='bg-amber-500 py-1 flex gap-x-10' >{item.name}</span>;
            } else {
              const otherUser = item.users.find(u => u._id !== localStorage.getItem('id'));
              const data = { _id: otherUser._id, name: otherUser.name, chatId: item._id };
              return (
                <li className='flex items-center gap-3 ps-3 ' key={otherUser._id} onClick={() => setSelectedChat(data)}>
                  <img
                    className='h-10 rounded-full'
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    alt=""
                  />
                  <span className='flex flex-col gap-0.5 justify-center w-full me-6'>
                    <span className='flex justify-between '>
                      <p className=''>{otherUser.name}</p>
                      <p className='text-sm self-end'>Time</p>
                    </span>
                    <p className='text-sm/4'>Latest Message</p>
                  </span>
                </li>
              );
            }
          })}
          {chats.map((item) => {
            if (item.isGroupChat) {
              return <span key={item._id} onClick={() => setSelectedChat(item)} className='bg-amber-500 py-1 flex gap-x-10' >{item.name}</span>;
            } else {
              const otherUser = item.users.find(u => u._id !== localStorage.getItem('id'));
              const data = { _id: otherUser._id, name: otherUser.name, chatId: item._id };
              return (
                <li className='flex items-center gap-3 ps-3 ' key={otherUser._id} onClick={() => setSelectedChat(data)}>
                  <img
                    className='h-10 rounded-full'
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    alt=""
                  />
                  <span className='flex flex-col gap-0.5 justify-center w-full me-6'>
                    <span className='flex justify-between '>
                      <p className=''>{otherUser.name}</p>
                      <p className='text-sm self-end'>Time</p>
                    </span>
                    <p className='text-sm/4'>Latest Message</p>
                  </span>
                </li>
              );
            }
          })}
          {chats.map((item) => {
            if (item.isGroupChat) {
              return <span key={item._id} onClick={() => setSelectedChat(item)} className='bg-amber-500 py-1 flex gap-x-10' >{item.name}</span>;
            } else {
              const otherUser = item.users.find(u => u._id !== localStorage.getItem('id'));
              const data = { _id: otherUser._id, name: otherUser.name, chatId: item._id };
              return (
                <li className='flex items-center gap-3 ps-3 ' key={otherUser._id} onClick={() => setSelectedChat(data)}>
                  <img
                    className='h-10 rounded-full'
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                    alt=""
                  />
                  <span className='flex flex-col gap-0.5 justify-center w-full me-6'>
                    <span className='flex justify-between '>
                      <p className=''>{otherUser.name}</p>
                      <p className='text-sm self-end'>Time</p>
                    </span>
                    <p className='text-sm/4'>Latest Message</p>
                  </span>
                </li>
              );
            }
          })}
        </> */}
      </ul>
    </div>
  )
}

export default Chats