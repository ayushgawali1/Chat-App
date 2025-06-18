import React, { useContext } from 'react'
import { Context } from '../store/context'

function Profile() {

    const { userData } = useContext(Context);

    console.log(userData);
    

    return (
        <div className='mt-50 flex items-center justify-center'>
            <div>
                <div>Name : {userData?.name}</div>
                <div>UserName : {userData?.userName}</div>
            </div>
        </div>
    )
}

export default Profile