import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/context';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Sidebar({ setSeletedUser, setIsUserSelected }) {

    const naviagate = useNavigate();

    const { Backend_URL } = useContext(Context);


    const [chats, setChats] = useState([]);


    const selectUser = (data) => {
        setIsUserSelected(true);
        setSeletedUser(data);
    }


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
    }, [])

    return (
        <div className='bg-red-700 flex flex-col gap-4'>
            <div>
                <div className='flex justify-between items-center mt-2'>
                    <span>Contact</span>
                    <span onClick={() => naviagate('/search')} className='bg-cyan-800 p-2 rounded-full' ><FaSearch /></span>
                </div>

                <span className='flex'>
                    <input type="checkbox" />
                    <p>Show online user</p>
                </span>
            </div>

            <div className='flex flex-col gap-2'>

                {chats.map((item) => {
                    if (item.isGroupChat) {
                        return <span key={item._id} onClick={() => selectUser(item)} className='bg-amber-500 py-1 flex gap-x-10' >{item.name}</span>;
                    } else {
                        const otherUser = item.users.find(u => u._id !== localStorage.getItem('id'));
                        const data = { _id: otherUser._id, name: otherUser.name, chatId: item._id };
                        return <span onClick={() => selectUser(data)} className='bg-amber-500 py-1 flex gap-x-10' key={otherUser._id}>{otherUser.name}</span>;
                    }
                })}

            </div>

            <div className='w-full flex'>
                <span onClick={() => naviagate('/create-group')} className='mt-5 bg-gray-950 w-full text-center'>Create Group</span>
            </div>
        </div>
    )
}

export default Sidebar