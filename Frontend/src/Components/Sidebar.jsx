import Header from './Sidebar/Header';
import Chats from './Sidebar/Chats';
import { useNavigate } from 'react-router-dom';


function Sidebar({ setSelectedChat }) {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col'>
            <Header setSelectedChat={setSelectedChat} />


            <Chats setSelectedChat={setSelectedChat} />


            {/* <div className='mb-10'>
                <span onClick={() => navigate('/create-group')} className='mt-5 p-10 bg-gray-950 w-full text-center'>Create Group</span>
            </div> */}
        </div>
    )
}

export default Sidebar