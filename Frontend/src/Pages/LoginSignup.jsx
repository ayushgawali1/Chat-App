import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Context } from '../store/context';
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

function LoginSignup() {

    const { Backend_URL, setUserData } = useContext(Context);

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = isLogin ? 'login' : 'signup';
        try {
            const responce = await axios.post(`${Backend_URL}/auth/${value}`, formData);
            toast.success(responce.data.msg);
            localStorage.setItem('id', responce.data.userData._id);
            setUserData(responce.data.userData);
            navigate('/');
        } catch (error) {
            console.log("Error in handleSubmit of LoginSignup", error);
            toast.error(error.response?.data.msg);
        }
    }



    return (
        <div className="flex h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    {isLogin ? "Login to your account" : "Create an Account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {!isLogin &&
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e)}
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    }


                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                required
                                autoComplete="off"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium">
                                Password
                            </label>
                            <div className="text-sm">
                                <a className="font-semibold text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                                required
                                autoComplete="off"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    {isLogin ? "Don't" : "Alredy"} have an account .{' '}
                    <span onClick={() => setIsLogin((prev) => !prev)} className="font-semibold text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                        {isLogin ? "Sign up" : "Sign in"}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginSignup