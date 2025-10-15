import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import dp from '../assets/dp.png'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';

const LeftHome = () => {

    const { userData, suggestedUsers } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,  { withCredentials: true });
            toast.success("Logout Sucessfully !!")
            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
        }
    }
    return (
          <>
            <div className='w-[25%] min-h-[100vh] bg-black border-r-2 border-gray-900 hidden lg:block'>
                <div className='w-full h-16 border-b-2 border-gray-900 flex justify-between items-center px-5'>
                    <h1 className='text-white text-xl'>Sociallight</h1>
                    <div>
                        <FaRegHeart className='text-white' />
                    </div>
                </div>
                 <div className="flex items-center p-4 border-b-2 border-b-gray-900 py-[10px]">
                    <div className="w-full flex items-center justify-between">

                        {/* Profile Image */}
                        <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                            <img
                                src={userData.user.profileImage || dp}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col ml-3 flex-grow">
                            <div className="text-[14px] font-semibold text-white">
                                {userData?.user?.name}
                            </div>
                            <div className="text-[12px] text-gray-400">
                                @{userData?.user?.userName}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="text-[14px] text-blue-400 hover:text-blue-300 cursor-pointer" onClick={handleLogOut}>
                            Log Out
                        </div>

                    </div>
                </div>

                <div className='w-full flex flex-col gap-[20px] p-[20px]'>
                    <h1 className='text-white text-lg'>Suggested Users</h1>
                     {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>{
                         
                       return <OtherUser key={index} user={user} />
                     })}
                </div>

            </div>
        </>
    )
}

export default LeftHome