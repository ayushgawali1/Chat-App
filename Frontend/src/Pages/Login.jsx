import React, { useContext } from 'react'
import { Context } from '../store/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {Backend_URL,setUserData,setIsLogin,connectSocket,socket} = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const password = e.target[1].value;
    try {
      const responce = await axios.post(`${Backend_URL}/auth/login`, { userName, password });
      localStorage.setItem('id', responce.data.data._id);
      setUserData(responce.data.data);
      setIsLogin(true);
      navigate('/');
      socket.auth = {userId:responce.data.data._id}
      connectSocket();
    } catch (error) {
      console.log("Error in handleSubmit of Login",error.message);
    }
  }

  return (
    <div className=' h-screen flex items-center justify-center'>
      <div className='bg-black p-6 flex flex-col gap-4'>
        <h2>Login</h2>
        <p>Welcome Back</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input type="text" placeholder='user-nane' className='border-2 border-white p-2 rounded' />
          <input type="text" placeholder='password' className='border-2 border-white p-2 rounded' />
          <button type='submit' className='bg-green-600 rounded py-2 hover:bg-green-800'>Submit</button>
        </form>
        <p>Don't have an account . <span className='text-blue-500 underline hover:cursor-pointer'> Login </span></p>
      </div>
    </div>
  )
}

export default Login