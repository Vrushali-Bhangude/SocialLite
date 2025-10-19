import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeOff } from "react-icons/io";


const VideoPlayer = ({media}) => {
    const videoTag = useRef()
    const [mute, setMute] = useState(false)
    const [ isPlay, setIsPlay] = useState(true)
   

    const handleClick = ()=>{
        if(isPlay){
            videoTag.current.pause()
            setIsPlay(false)
        }else{
            videoTag.current.play()
            setIsPlay(true)
        }
    }
  return (
   <>
      <div className='h-[100%] relative  cursor-pointer max-w-full rounded-xl overflow-hidden'> 
          <video ref={videoTag} src={media} autoPlay loop muted={mute} className='h-[100%] cursor-pointer w-full object-cover rounded-xl' onClick={handleClick}  />
          <div>
            { !mute? <IoMdVolumeHigh className='w-[20px] h-[20px] text-white font-semibold' onClick={()=> setMute(prev=>!prev)} /> 
            :<IoMdVolumeOff  className='w-[20px] h-[20px] text-white font-semibold' />}
          </div>
      </div>
   </>
  )
}

export default VideoPlayer