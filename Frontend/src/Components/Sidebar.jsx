import {useState} from 'react'
import Header from './Sidebar/Header';
import Chats from './Sidebar/Chats';
import { useNavigate } from 'react-router-dom';


function Sidebar({ setSelectedChat , selectedChat }) {

    const navigate = useNavigate();

    const [chats, setChats] = useState([]);

    return (
        <div className='flex flex-col'>
            <Header setSelectedChat={setSelectedChat} setChats={setChats} chats={chats} />


            <Chats selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} />


            {/* <div className='mb-10'>
                <span onClick={() => navigate('/create-group')} className='mt-5 p-10 bg-gray-950 w-full text-center'>Create Group</span>
            </div> */}
        </div>
    )
}

export default Sidebar