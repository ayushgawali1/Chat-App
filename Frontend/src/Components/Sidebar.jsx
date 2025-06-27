import Header from './Sidebar/Header';
import Chats from './Sidebar/Chats';



function Sidebar({ setSelectedChat }) {
    return (
        <div className='flex flex-col'>
            <Header setSelectedChat={setSelectedChat} />


            <Chats setSelectedChat={setSelectedChat} />


            {/* <div className='w-full flex'>
                <span onClick={() => naviagate('/create-group')} className='mt-5 bg-gray-950 w-full text-center'>Create Group</span>
            </div> */}
        </div>
    )
}

export default Sidebar