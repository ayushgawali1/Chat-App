import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Context } from '../store/context';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [groupName,setGroupName] = useState('');
  const [addedUsers, setAddedUsers] = useState([]);
  const [addedUsersId, setAddedUsersID] = useState([]);

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

  const handleOnclick = async () => {
    const userId = localStorage.getItem('id');
    try {
      const responce = await axios.post(`${Backend_URL}/chat/create-group-chat`,{
        userId,
        membersId : addedUsersId , 
        groupName : groupName
      });
      navigate('/');
      
    } catch (error) {
      console.log("Error in HandleClick of AddFriend");
    }
  }


  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-gray-950 flex flex-col gap-5 items-center justify-center'>
        <div className='flex flex-col gap-4'>
          <h2>Create Grout Chat</h2>
          <span>
            <input type="text" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder='Group Name' className='border-2 px-2' />
          </span>
        </div>
        <div>
          <form className=' p-2' onSubmit={(e) => getAllUser(e)}>
            <input type="text" placeholder='Search Member' className='border-2 px-2' />
            <button className='bg-amber-500 hover:bg-amber-400'>Search</button>
          </form>
        </div>
        <div>
          {addedUsers.map((list) =>
            <div className="badge badge-primary">
              {list.name}
              <span onClick={()=>{setAddedUsers((prev)=>prev.filter((item)=>item._id!=list._id)) ; setAddedUsersID((prev)=>prev.filter((item)=>item!=list._id)) }} style={{ cursor: 'pointer' }}>
                &times;
              </span>
            </div>
          )}
        </div>
        <div>
          <ul className='flex flex-col gap-2'>
            {
              users.map((item) => (
                <li key={item._id} className='flex justify-between px-2'>
                  <span>{item.name}</span>
                  <button onClick={() => {setAddedUsers((prev) => [...prev, item]),setAddedUsersID((prev) => [...prev, item._id])}} className='border border-amber-500 px-1'>
                    ADD
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='bg-orange-950 flex justify-center'>
          <button onClick={handleOnclick}>Create Chat</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup