import { FaSearch } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../store/context";
import Single from "./NewChat/Single";

function NewChats({chats, setShowNewChat, setSelectedChat , setChats }) {

    const { Backend_URL } = useContext(Context);

    const [searchValue, setSearchValue] = useState('');
    const [otherUsers, setOtherUsers] = useState([]);

    const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    const [addedUsers, setAddedUsers] = useState([]);
    const [addedUsersId, setAddedUsersID] = useState([]);

    const handleSearch = async () => {
        try {
            const responce = await axios.post(`${Backend_URL}/auth/get-users`, {
                name: searchValue,
                id: localStorage.getItem('id')
            });
            setOtherUsers(responce.data);
        } catch (error) {
            console.log("Error in handleSearch", error);
        }
    }


    return (
        <div className='absolute bg-gray-800 top-10 rounded-md z-10'>
            {isCreatingGroup ?
                <div className="p-2 flex flex-col gap-3">
                    <div className="flex items-center">
                        <span onClick={() => setIsCreatingGroup(false)} className="cursor-pointer" ><IoArrowBack /></span>
                        <h3 className='text-xl font-semibold ps-'>New Group</h3>
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
                    <div className="flex">
                        {addedUsers.map((list) =>
                            <div className="badge badge-primary">
                                {list.name}
                                <span onClick={() => {
                                    setAddedUsers((prev) => prev.filter((item) => item._id != list._id));
                                    setAddedUsersID((prev) => prev.filter((item) => item != list._id))
                                }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    &times;
                                </span>
                            </div>
                        )}
                    </div>
                    <ul className='flex flex-col gap-2'>
                        <span className="ps-1 font-semibold">Users</span>
                        {otherUsers.map((item) => (
                            <li
                                onClick={() => { setAddedUsers((prev) => [...prev, item]), setAddedUsersID((prev) => [...prev, item._id]) }}
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
                :
                <Single chats={chats} setChats={setChats} setSelectedChat={setSelectedChat} otherUsers={otherUsers} setShowNewChat={setShowNewChat} handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />
            }
        </div>
    )
}

export default NewChats