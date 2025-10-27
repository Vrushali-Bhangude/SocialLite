import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoopCard from '../components/LoopCard.jsx';

const Loops = () => {
  const navigate = useNavigate()
  const {loopData} = useSelector((state)=>state.loop)
  return (
    <>
      <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center'>
        <div className='w-full h-[80px] flex fixed left-[20px] items-center gap-[20px] px-[20px] fixed top-[10px] left-[20px] z-[100]'>
          <MdOutlineKeyboardBackspace className='text-white w-[25px] cursor-pointer h-[25px]' onClick={() => navigate("/")} />
          <h1 className='text-white font-semibold text-[20px]'>Loops</h1>
        </div>

      <div className='h-[100vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide'>
         {loopData?.map((loop,index)=>(
           <div className='h-screen snap-start' key={loop._id || index} >
            <LoopCard loop={loop}/>
           </div>
         ))}
      </div>
      </div>
    </>
  )
}

export default Loops