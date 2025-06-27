import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/context';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IoNotifications } from "react-icons/io5";


function Navbar() {

    const { userData, setUserData, disconnectSocket } = useContext(Context);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear('id');
        setUserData(null);
        navigate('/login-signup');
        disconnectSocket();
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-10">
            <div className="flex-1">
                <span onClick={() => navigate('/')} className="btn btn-ghost text-xl">Chat App</span>
            </div>
            <div className="flex gap-8 items-center justify-center">
                {userData &&
                    <>
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                                <span className="badge badge-xs badge-primary indicator-item rounded-full py-2">1</span>
                            </div>
                        </button>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <MenuItem>
                                    <span
                                        onClick={() => navigate('/profile')}
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Profile
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Settings
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                    >
                                        Logout
                                    </span>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar