import React from 'react'
import { MdHome } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { RxVideo } from "react-icons/rx";
import { FaRegSquarePlus } from "react-icons/fa6";
import dp from '../assets/dp.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
    const navigate = useNavigate();
    const {userData} = useSelector((state)=>state.user)
  return (
    <>
      <div className='w-[90%] lg:w-[40%] h-[50px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-2xl shadow-2xl shadow-[#000000] z-[100] '>
        <div  onClick={()=>navigate('/')} ><MdHome  className='text-white cursor-pointer w-[25px] h-[25px]'/></div>
        <div  ><IoSearchSharp className='text-white w-[25px] cursor-pointer h-[25px]' /></div>
        <div onClick={()=>navigate("/upload")} ><FaRegSquarePlus className='text-white w-[23px] cursor-pointer h-[23px]' /></div>
        <div  ><RxVideo className='text-white w-[25px] cursor-pointer h-[25px]' /></div>
        <div className="w-[40px] h-[40px] border-2 border-black rounded-full  cursor-pointer overflow-hidden" onClick={()=>{ navigate(`/profile/${userData?.user?.userName}`) }}>
          <img
            src={userData?.user?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default Nav