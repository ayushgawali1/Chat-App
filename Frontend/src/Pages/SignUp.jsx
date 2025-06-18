import React, { useContext } from 'react'
import { Context } from '../store/context';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const {Backend_URL,setUserData,setIsLogin,connectSocket} = useContext(Context);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const userName = e.target[1].value;
        const password = e.target[2].value;
        try {
            const responce = await axios.post(`${Backend_URL}/auth/signup`,{name,userName,password});
            localStorage.setItem('id',responce.data.data._id);
            setUserData(responce.data.data);
            setIsLogin(true);
            navigate('/');
            socket.auth = {userId:responce.data.data._id}
            connectSocket();
        } catch (error) {
            console.log("Error in handleSubmit of Sign Up");
        }
    }

  return (
    <div className=' h-screen flex items-center justify-center'>
        <div className='bg-black p-6 flex flex-col gap-4'>
            <h2>Sign Up</h2>
            <p>Create Account</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input type="text" placeholder='Name' className='border-2 border-white p-2 rounded' />
                <input type="text" placeholder='user-nane' className='border-2 border-white p-2 rounded'/>
                <input type="text" placeholder='password' className='border-2 border-white p-2 rounded' />
                <button type='submit' className='bg-green-600 rounded py-2 hover:bg-green-800'>Submit</button>
            </form>
            <p>Alredy have an account . <span className='text-blue-500 underline hover:cursor-pointer'>Sign Up</span></p>
        </div>
    </div>
  )
}

export default SignUp