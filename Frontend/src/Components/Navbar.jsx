import { useContext, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Context } from '../store/context';

function Navbar() {

    const {isLogin,setUserData,setIsLogin,disconnectSocket} = useContext(Context);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear('id');
        setIsLogin(false);
        setUserData(null);
        navigate('/login');
        disconnectSocket();
    }

    return (
        <div className='flex justify-between px-10 py-2'>
            <div>
                <h2 className='p-2' onClick={() => navigate('/')}>LOGO</h2>
            </div>
            <div className='flex gap-10'>
                {isLogin ?
                    <>
                        <div onClick={() => navigate('/profile')} className='hover:cursor-pointer hover:bg-amber-500 p-2 rounded bg-blue-400'>Profile</div>
                        <div onClick={logout} className='hover:cursor-pointer hover:bg-amber-500 p-2 rounded bg-blue-400'>Logout</div>
                    </>
                    :
                        <div onClick={() => navigate('/login')} className='hover:cursor-pointer hover:bg-amber-500 p-2 rounded bg-blue-400'>Login</div>
                    }
            </div>
        </div>
    )
}

export default Navbar