import React, { useEffect, useRef, useState } from 'react'
import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import dp from '../assets/dp.png'
import FollowButton from './FollowButton'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegComment } from "react-icons/fa";
import axios from 'axios';
import { setLoopData } from '../redux/loopSlice';

const LoopCard = ({ loop }) => {
  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [showHeart, setShowHeart] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")

  const { userData } = useSelector((state) => state.user)
  const { loopData } = useSelector((state) => state.loop)
  const commentRef = useRef()
  const dispatch = useDispatch()

  const handleLIkeOnClick = () => {
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 6000)
    { !loop.likes?.includes(userData._id) ? handleLike() : null }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      const percent = (video.currentTime / video.duration) * 100
      setProgress(percent)
    }
  }

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }

  }

  const handleLike = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/loop/like/${loop._id}`, { withCredentials: true })
      const updatedLoop = result.data
      const updatedLoops = loopData.map(p =>
        p._id === loop._id
          ? { ...p, likes: updatedLoop.likes }
          : p
      )

      dispatch(setLoopData(updatedLoops))
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async () => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/loop/comment/${loop._id}`, { message }, { withCredentials: true })
      const updatedLoop = result.data

      const updatedLoops = loopData.map(p =>
        p._id === loop._id
          ? { ...p, comments: updatedLoop.comments }
          : p
      )
      setMessage("")
      dispatch(setLoopData(updatedLoops))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowComment(false)
      }
    }
    if (showComment) {
      document.addEventListener("mousedown", handleClickOutSide)
    } else {
      document.removeEventListener("mousedown", handleClickOutSide)

    }
  }, [showComment])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current
      if (entry.isIntersecting) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }, { threshold: 0.6 })
    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative overflow-hidden '   >

        {showHeart == true &&
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50'>
            <FaHeart className='w-[100px] h-[100px]  text-red-600 drop-shadow-2xl' />
          </div>
        }

        <div ref={commentRef} className={` z-[200] bottom-0 w-full absolute h-[500px] p-[10px] rounded-t-4xl bg-[#0e1718] transform transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment ? "translate-y-0" : "translate-y-full"}`}>
          <h1 className='text-white text-[20px] text-center font-semibold'>Comments</h1>
           {/* Comments List */}
            <div className="w-full max-h-[350px] overflow-y-auto rounded-lg shadow-inner  px-2 py-2">
              {loop.comments?.length > 0 ? (
                loop.comments.map((com, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 py-2 px-1 rounded hover:bg-gray-700 transition-all duration-200"
                  >
                    {/* Profile Image */}
                    <div className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={com?.author?.profileImage || dp}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Comment Text */}
                    <div className="flex flex-col">
                      <span className="text-sm md:text-[14px] text-white font-medium">
                        {com?.author?.name || "Anonymous"}
                      </span>
                      <p className="text-white text-sm md:text-[13px] leading-snug">
                        {com.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-[18px] text-center py-4">No comments yet</p>
              )}
            </div>
          <div className=" fixed bottom-0 w-full flex flex-col gap-4 pb-4">
            <div className="w-full flex items-center gap-2 px-4">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded-full overflow-hidden cursor-pointer">
                <img
               src={userData?.user?.profileImage || dp}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                className="flex-1 px-2 py-1 border-b-2 border-gray-400 outline-none text-sm md:text-[14px] text-white"
                placeholder="Write a comment..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
             {message && 
              <button
                className="p-1 hover:text-blue-500 transition-colors text-white"
                onClick={handleComment}
              >
                <MdSend className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
              </button>}
          </div>
          </div>
        </div>

        <video ref={videoRef} loop autoPlay muted src={loop?.media} className='w-full max-h-[100vh]' onClick={handleClick} onTimeUpdate={handleTimeUpdate} onDoubleClick={handleLIkeOnClick} />

        <div className='absolute bottom-0  w-full h-[3px] bg-gray-900'>
          <div className='w-[200px] h-full bg-white transition-all duration-200 ease-linear'
            style={{ width: `${progress}%` }} >
          </div>

          <div className='w-full absolute h-[100px] bottom-[10px] p-[10px] flex flex-col '>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] border-2 border-black rounded-full overflow-hidden cursor-pointer">
                <img
                  src={loop?.author?.profileImage || dp}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="font-semibold text-[15px] md:text-[18px] text-white truncate font-semibold max-w-[150px] md:max-w-[200px]">
                {loop.author?.userName || "Unknown User"}
              </div>

              <FollowButton targetUserId={loop.author?._id} tailwind={"px-[10px] py-[2px] text-white border-2 border-white rounded-xl cursor-pointer"} />
            </div>

            <div className='text-white p-[10px]'>
              {loop.caption}
            </div>

            <div className='absolute right-0 flex flex-col gap-[20px] text-white bottom-[150px] justify-centre px-[10px]'>
              <div className='flex flex-col items-center cursor-pointer '>
                <div onClick={handleLike}>
                  {loop.likes?.includes(userData?.user._id) ? (
                    <FaHeart className='w-[25px] h-[25px] cursor-pointer text-red-600' />
                  ) : (
                    <FaRegHeart className='w-[25px] h-[25px] cursor-pointer' />
                  )}
                </div>
                <div > {loop.likes.length} </div>

                <div></div>
              </div>
              <div className='flex flex-col items-center cursor-pointer '>
                <div onClick={() => setShowComment(true)} >
                  <FaRegComment className='w-[25px] h-[25px] cursor-pointer' />
                </div>
                <div > {loop.comments?.length} </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default LoopCard