import React, { useContext } from 'react'
import { Context } from '../store/context'
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';

function Profile() {

    const { userData, Backend_URL, setUserData } = useContext(Context);

    const handleChange = async (e) => {
        const id = localStorage.getItem("id");
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append('id', id);
        try {
            const responce = await axios.post(`${Backend_URL}/auth/update-user-profile-img`, formData);
            toast.success("Profile Updated");
            setUserData(responce.data);
        } catch (error) {
            console.log("Error in Profile ", error);
            toast.error(error.message);
        }
    }


    return (
        <div className='mt-10 flex items-center justify-center'>
            <div className='bg-gray-900 px-5 py-4 rounded-md flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-2xl font-semibold'>Profile</h1>
                    <h6 className=''>Your Profile Information</h6>
                </div>
                <div className='flex flex-col items-center justify-center gap-1 my-3'>
                    <span className='flex flex-col items-center justify-center relative'>
                        <span className='absolute bottom-0 right-0 flex items-end'>
                            <span className="relative inline-block w-9 h-9 rounded-full bg-black hover:bg-gray-700 my-1 cursor-pointer">
                                <span className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center text-white">
                                    <CiCamera />
                                </span>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="file"
                                    className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer z-10"
                                />
                            </span>
                        </span>
                        <img className='h-40 w-40 rounded-full' src={userData.userData.profileImage} alt="" />
                    </span>
                    <p className='text-sm'>Click the camera icon to update the image</p>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex flex-col justify-center gap-1'>
                        <span className='flex items-center gap-1 text-white/70 ps-0.5'>
                            <CiUser />
                            <p className='text-sm '>Name</p>
                        </span>
                        <span className='w-full px-3    py-1.5 text-amber-500 rounded-md border-1 border-white'>{userData.userData.name}</span>
                    </div>
                    <div className='flex flex-col justify-center gap-1'>
                        <span className='flex items-center gap-1 text-white/70 ps-0.5'>
                            <MdOutlineEmail />
                            <p className='text-sm '>Email</p>
                        </span>
                        <span className='w-full px-3  py-1.5 text-amber-500 rounded-md border-1 border-white'>{userData.userData.email}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-10 px-5 '>
                    <h4>Account Information</h4>
                    <div className='text-yellow-500'>
                        <span className='flex justify-between gap-x-36'>
                            <p>Member Science  </p>
                            <p>2024-23-32</p>
                        </span>
                        <hr className='mt-1 border border-white' />
                    </div>
                    <span className='flex mt-4 justify-between text-yellow-500'>
                        <p>Account Status</p>
                        <p className='text-green-500' >Active</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Profile