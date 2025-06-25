import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Context } from '../store/context';
import { useNavigate } from 'react-router-dom';

function AddFriend() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const { Backend_URL } = useContext(Context);

    const getAllUser = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        try {
            const responce = await axios.post(`${Backend_URL}/auth/get-users`, {
                name: name,
                id: localStorage.getItem('id')
            });
            setUsers(responce.data);
        } catch (error) {
            console.log("Error in search user");
        }
    }

    const handleOnclick =  async(item) => {
        const userId = localStorage.getItem('id');
        try {
            const responce = await axios.post(`${Backend_URL}/chat/create-chat`,{
                userId,
                user:item
            });
            navigate('/');
            
        } catch (error) {
            console.log("Error in HandleClick of AddFriend");
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-gray-950 flex flex-col gap-5'>
                <div>
                    <form className=' p-2' onSubmit={(e) => getAllUser(e)}>
                        <input type="text" className='border-2' />
                        <button className='bg-amber-500 hover:bg-amber-400'>Search</button>
                    </form>
                </div>
                <div>
                    <ul className='flex flex-col gap-2'>
                        {
                            users.map((item) => (
                                <li key={item._id} className='flex justify-between px-2'>
                                    <span>{item.name}</span>
                                    <button onClick={() => handleOnclick(item)} className='border border-amber-500 px-1'>
                                        Chat
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AddFriend