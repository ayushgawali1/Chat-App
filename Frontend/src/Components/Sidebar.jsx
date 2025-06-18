import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/context';
import axios from 'axios';

function Sidebar({ setSeletedUser, setIsUserSelected }) {

    const { Backend_URL, onlineUserSocketId } = useContext(Context);

    const [users, setUsers] = useState([]);
    const [onlineUser, setOnlineUser] = useState([]);
    const [showOnlineUser, setShowOnlineUser] = useState(false);

    const handleShowOnlineUser = () => {
        setShowOnlineUser((prev) => !prev);
        const arr = users.filter((data) => {
            const isOnline = onlineUserSocketId.some(item => item[data._id] != null);

            return (isOnline && data);
        })
        setOnlineUser(arr);
    }

    const selectUser = (data) => {
        setIsUserSelected(true);
        setSeletedUser(data);
    }

    const getAllUser = async () => {
        try {
            const responce = await axios.get(`${Backend_URL}/message/get-all-user`, { headers: { token: localStorage.getItem('id') } });
            setUsers(responce.data);
        } catch (error) {
            console.log("Error in getAllUser", error.message);
        }
    }

    useEffect(() => {
        getAllUser();
    }, [])

    return (
        <div className='bg-red-700 flex flex-col gap-4'>
            <div>
                <span>Contact</span>
                <span className='flex'>
                    <input type="checkbox" onClick={handleShowOnlineUser} />
                    <p>Show online user {showOnlineUser}</p>
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                {showOnlineUser ?
                    onlineUser.map((data) => (
                        <span
                            onClick={() => selectUser(data)}
                            key={data._id}
                            className='bg-amber-500 py-1 flex gap-x-10'
                        >
                            {data.name}
                        </span>
                    ))
                    :
                    users.map((data) => {
                        // Check if the user is online
                        const isOnline = onlineUserSocketId.some(item => item[data._id] != null);

                        return (
                            <span
                                onClick={() => selectUser(data)}
                                key={data._id}
                                className='bg-amber-500 py-1 flex gap-x-10'
                            >
                                {data.name}
                                {isOnline && (
                                    <span className="badge badge-xs badge-success indicator-item"></span>
                                )}
                            </span>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default Sidebar