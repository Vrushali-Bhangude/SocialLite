import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import dp from '../assets/dp.png'
import { setProfileData, setUserData } from '../redux/userSlice';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Nav from '../components/Nav';


const Profile = () => {
    const { userName } = useParams();
    const dispatch = useDispatch();
    const { profileData, userData } = useSelector((state) => state.user)
    const navigate = useNavigate();

    const handleProfile = async () => {
        try {
            const result = await axios(`${import.meta.env.VITE_SERVER_URL}/api/user/getProfile/${userName}`, { withCredentials: true })
            if (result.data?.user) {
                dispatch(setProfileData(result.data.user))
            }

        } catch (error) {
            console.log("Error in getting profile data", error)
        }
    }

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/signout`, { withCredentials: true });
            toast.success("Logout Sucessfully !!")
            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile();
    }, [userName, dispatch])
    return (
        <>
            <div className='w-full min-h-screen bg-black'>
                <div className=' w-full h-[80px] flex justify-between items-center px-[30px] text-white'>
                    <div onClick={()=>navigate("/")}>
                        <MdOutlineKeyboardBackspace className='text-white w-[25px] cursor-pointer h-[25px]' />
                    </div>
                    <div className='font-semibold  text-[20px]'>
                        {profileData?.userName}
                    </div>
                    <div className='font-semibold cursor-pointer text-[14px] md:text-[18px] text-blue-500' onClick={handleLogOut}>
                        Log Out
                    </div>
                </div>

                <div className='w-full h-[120px] flex items-start gap-[20px] lg:gap-[50px] px-[10px] justify-center'>
                    <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                        <img
                            src={profileData?.profileImage || dp}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className='font-semibold text-[20px] text-white'>{profileData?.name}</div>
                        <div className='text-[17px] text-[#ffffffe8]' >{profileData?.profession || "New User"}</div>
                        <div className='text-[12px] md:text-[16px] text-[#ffffffe8] md:w-[300px]'>{profileData?.bio}</div>
                    </div>
                </div>

                <div className='w-full h-[100px] flex items-centre gap-[40px] md:gap-[60px] px-[20%] justify-center text-white'>
                    <div>
                        <div className='text-white text-[20px] md:text-[24px] font-semibold'> {profileData?.posts?.length}</div>
                        <div className='text-[16px] md:text-[18px]'>Posts</div>
                    </div>

                    <div>
                        <div className='flex items-center justify-center gap-[20px]'>
                            <div>
                                <div className='flex relative'>
                                    <div className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-[40px] h-[40px] absolute border-2 border-black rounded-full cursor-pointer overflow-hidden left-[9px]">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-[40px] h-[40px] absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-white text-[18px] md:text-[24px] font-semibold'>
                                {profileData?.followers?.length}
                            </div>
                        </div>

                        <div className='text-[16px] md:text-[18px]'>Followeres</div>
                    </div>

                    <div>
                        <div className='flex items-center justify-center gap-[20px]'>
                            <div>
                                <div className='flex relative'>
                                    <div className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-[40px] h-[40px] absolute border-2 border-black rounded-full cursor-pointer overflow-hidden left-[9px]">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-[40px] h-[40px] absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                        <img
                                            src={profileData?.profileImage || dp}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-white text-[18px] md:text-[24px] font-semibold'>
                                {profileData?.following?.length}
                            </div>
                        </div>

                        <div className='text-[16px] md:text-[18px]'>Following</div>
                    </div>
                </div>

                <div className='w-full h-[50px] flex justify-center items-center gap-[20px]'>
                    {profileData?._id == userData?.user?._id &&
                        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-xl' onClick={()=>navigate("/edit-profile")}>
                            Edit Profile
                        </button>
                    }
                    {profileData?._id != userData?.user?._id && 
                         
                         <>
                         <button className='px-[10px] min-w-[100px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-xl'>
                            Follow
                        </button>
                        <button className='px-[10px] min-w-[100px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-xl'>
                            Messgae
                        </button>
                         </>
                    }

                </div>

               <div className='w-full min-h-[100vh] flex justify-center'>
                 <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[10px] bg-white relative gap-[20px] mt-[20px]'>
                     <Nav/>
                 </div>

               </div>

            </div>
        </>
    )
}

export default Profile