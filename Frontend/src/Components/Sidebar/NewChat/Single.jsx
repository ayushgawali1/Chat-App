import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaUsers } from "react-icons/fa6";
import { useState } from 'react';
import axios from 'axios';
import { Context } from '../../../store/context';

function Single({handleSearch,searchValue, setSearchValue,otherUsers,setShowNewChat}) {

    const {Backend_URL} = useContext(Context)

    const handleClick = async (data) => {
        const userId = localStorage.getItem('id');
        try {
            const responce = await axios.post(`${Backend_URL}/chat/create-chat`, {
                userId,
                user: data
            });
            console.log(responce.data);
            // setSelectedChat(responce.data);
            setShowNewChat(false);
        } catch (error) {
            console.log("Error in HandleClick of AddFriend",error);
        }
    }

    return (
        <div className="p-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className='text-xl font-semibold'>New Chat</h3>
                <span onClick={() => setShowNewChat(false)} className="cursor-pointer" ><RxCross1 /></span>
            </div>
            <span className='flex items-center justify-center border-2 rounded'>
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    type="text"
                    placeholder='Search name and email'
                    className='focus-visible:outline-none px-2'
                />
                <span
                    onClick={handleSearch}
                    className='me-2 cursor-pointer'
                >
                    <FaSearch />
                </span>
            </span>
            <ul className='flex flex-col gap-2'>
                <li onClick={() => setIsCreatingGroup(true)} className='hover:bg-red-700 bg-gray-600 flex items-center gap-4 ps-2 py-1 rounded'>
                    <span className='bg-gray-700 p-3 rounded-full'><FaUsers /></span>
                    <p className='font-medium'>New Group</p>
                </li>
                <span className="ps-1 font-semibold">Members</span>
                {otherUsers.map((item) => (
                    <li
                        onClick={() => handleClick(item)}
                        key={item._id}
                        className="flex items-center gap-5 bg-gray-600 ps-2 py-1 rounded"
                    >
                        <img
                            className="h-9 rounded-full"
                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            alt=""
                        />
                        <p className="font-semibold">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Single