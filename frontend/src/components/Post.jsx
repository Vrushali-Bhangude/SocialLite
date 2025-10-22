import React, { useState } from 'react'
import dp from '../assets/dp.png'
import VideoPlayer from './VideoPlayer'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { MdSend } from "react-icons/md";
import axios from 'axios';
import { setPostData } from '../redux/postSlice';
import { setUserData } from "../redux/userSlice"
import FollowButton from './FollowButton';


const Post = ({ post, postId, currentPlaying, setCurrentPlaying }) => {

    const { userData } = useSelector((state) => state.user)
    const { postData } = useSelector((state) => state.post)

    const [showComment, setShowComment] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const currentUser = userData?.user
    const userId = currentUser?._id
    const hasUserLiked = userId && post?.likes?.includes(userId)

    const handleLike = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/post/like/${post._id}`, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p =>
                p._id === post._id
                    ? { ...p, likes: updatedPost.likes }
                    : p
            )

            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async () => {
        try {
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post/comment/${post._id}`, { message }, { withCredentials: true })
            const updatedPost = result.data

            const updatedPosts = postData.map(p =>
                p._id === post._id
                    ? { ...p, comments: updatedPost.comments }
                    : p
            )

            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async () => {
        try {
            if (!userData) return;

            const savedPosts = userData.saved || [];
            const isSaved = savedPosts.includes(post._id);

            const updatedSaved = isSaved
                ? savedPosts.filter(id => id !== post._id)
                : [...savedPosts, post._id];

            dispatch(setUserData({ ...userData, saved: updatedSaved }));

            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/post/saved/${post._id}`,
                { withCredentials: true }
            );

            dispatch(setUserData({ ...userData, saved: res.data.saved }));
        } catch (error) {
            console.log("Save error:", error);
        }
    };

    return (
        <div className="w-[90%] md:w-[70%] lg:w-[60%] bg-white min-h-[450px] flex flex-col gap-4 items-center shadow-lg shadow-gray-400 rounded-2xl p-4 transition-transform hover:scale-[1.01] duration-300 mt-[10px]">

            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] border-2 border-black rounded-full overflow-hidden cursor-pointer">
                        <img
                            src={post?.author?.profileImage || dp}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="font-semibold text-[15px] md:text-[17px] text-gray-800 truncate max-w-[150px] md:max-w-[200px]">
                        {post?.author?.userName || "Unknown User"}
                    </div>
                </div>

                {userData.user._id != post.author._id &&
                    <FollowButton tailwind={"bg-black text-white px-4 md:px-5 py-2 rounded-xl text-[14px] md:text-[15px] hover:bg-gray-800 transition"} targetUserId={post.author._id} />
                }

            </div>


            {post?.media && (
                <div className="w-full flex items-center justify-center mt-2">
                    {post.mediaType === "image" && (
                        <img
                            src={post.media}
                            alt="Post content"
                            className="w-full max-h-[400px] object-cover rounded-2xl shadow-md"
                        />
                    )}

                    {post.mediaType === "video" && (
                        <div className="w-full flex justify-center rounded-2xl overflow-hidden shadow-md">
                            <VideoPlayer
                                media={post.media}
                                postId={postId}
                                currentPlaying={currentPlaying}
                                setCurrentPlaying={setCurrentPlaying}
                            />
                        </div>
                    )}
                </div>
            )}

            <div className='w-full h-[20px] flex justify-between items-center px-[20px] mt-[10px]'>
                <div className='flex justify-center items-center gap-[10px]'>
                    <div className='flex justify-center items-center gap-[5px]' >
                        {hasUserLiked ? (
                            <FaHeart className='w-[25px] h-[25px] cursor-pointer text-red-600' onClick={handleLike} />
                        ) : (
                            <FaRegHeart className='w-[25px] h-[25px] cursor-pointer' onClick={handleLike} />
                        )}
                        <span>{post?.likes?.length || 0}</span>

                    </div>

                    <div className='flex justify-center items-center gap-[5px]'>
                        <MdOutlineInsertComment className='w-[25px] h-[25px] cursor-pointer' onClick={() => setShowComment(prev => !prev)} />
                        <span>{post?.comments?.length || 0}</span>
                    </div>
                </div>
                <div onClick={handleSave}>
                    {(userData?.saved || []).includes(post._id) ? (
                        <GoBookmarkFill className="w-[25px] h-[25px] cursor-pointer text-black" />
                    ) : (
                        <MdOutlineBookmarkBorder className="w-[25px] h-[25px] cursor-pointer" />
                    )}
                </div>

            </div>

            {post.caption && (
                <div className="text-gray-900 text-[12px] md:text-[14px] font-semibold leading-snug italic max-w-xl mx-auto">
                    <span className="font-bold mr-1">
                        {post?.author?.userName || "Unknown User"}:
                    </span>
                    {post.caption.charAt(0).toUpperCase() + post.caption.slice(1).toLowerCase()}
                </div>
            )}


            {showComment && (
                <div className="w-full flex flex-col gap-4 pb-4">
                    {/* Comment Input */}
                    <div className="w-full flex items-center gap-2 px-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black rounded-full overflow-hidden cursor-pointer">
                            <img
                                src={post?.author?.profileImage || dp}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input
                            type="text"
                            className="flex-1 px-2 py-1 border-b-2 border-gray-400 outline-none text-sm md:text-[14px]"
                            placeholder="Write a comment..."
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button
                            className="p-1 hover:text-blue-500 transition-colors"
                            onClick={handleComment}
                        >
                            <MdSend className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="w-full max-h-[250px] overflow-y-auto rounded-lg shadow-inner bg-white px-2 py-2">
                        {post.comments?.length > 0 ? (
                            post.comments.map((com, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 py-2 px-1 rounded hover:bg-gray-100 transition-all duration-200"
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
                                        <span className="text-sm md:text-[14px] text-gray-800 font-medium">
                                            {com?.author?.name || "Anonymous"}
                                        </span>
                                        <p className="text-gray-600 text-sm md:text-[13px] leading-snug">
                                            {com.message}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm text-center py-4">No comments yet</p>
                        )}
                    </div>
                </div>
            )}

        </div>

    )
}

export default Post
