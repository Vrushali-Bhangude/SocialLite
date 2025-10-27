import React from 'react'
import { useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaRegSquarePlus } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setStoryData } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';


const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState(null)
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("")
    const mediaInput = useRef()
    const dispatch = useDispatch()
    const { postData } = useSelector(state => state.post)
    const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)


    const handleMedia = (e) => {
        const file = e.target.files[0]
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post/upload`, formData, { withCredentials: true });
            setLoading(false)
            toast.success("Post uploaded successfully 🎉");
            dispatch(setPostData([...postData, result.data]))
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload post ❌");
            setLoading(false)
        }
    };

    const uploadStory = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("mediaType", mediaType);
            formData.append("media", backendMedia);
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/story/upload`, formData, { withCredentials: true });
            setLoading(false)
            toast.success("Story uploaded successfully 🎊");
            dispatch(setStoryData([...storyData,result.data]))
             navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload story ⚠️");
            setLoading(false)
        }
    };

    const uploadLoop = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("media", backendMedia);
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/loop/upload`, formData, { withCredentials: true });
            setLoading(false)
            toast.success("Loop uploaded successfully 🔁");
            dispatch(setLoopData([...[loopData,result.data]]))
             navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload loop 🚫");
            setLoading(false)
        }
    };


    const handleUpload = () => {
        if (uploadType == "post")
            uploadPost()
        else if (uploadType == "story")
            uploadStory()
        else
            uploadLoop()
    }

    return (
        <>
            <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] '>
                <div className='w-full h-[80px] flex  items-center gap-[20px] px-[20px]'>
                    <MdOutlineKeyboardBackspace className='text-white w-[25px] cursor-pointer h-[25px]' onClick={() => navigate("/")} />
                    <h1 className='text-white font-semibold text-[20px]'>Upload Media</h1>
                </div>

                <div className='w-[80%] max-w-[500px] h-[50px] bg-white rounded-xl flex justify-around items-center gap-[10px]' >
                    <div className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[25%] h-[80%] flex justify-center items-center text-[18px] cursor-pointer hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black rounded-full`} onClick={() => setUploadType("post")}>Post</div>
                    <div className={`${uploadType == "story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[25%] h-[80%] flex justify-center items-center text-[18px] cursor-pointer hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black rounded-full`} onClick={() => setUploadType("story")}>Story</div>
                    <div className={`${uploadType == "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[25%] h-[80%] flex justify-center items-center text-[18px] cursor-pointer hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-black rounded-full`} onClick={() => setUploadType("loop")}>Loop</div>
                </div>

                {!frontendMedia && <div className='w-[65%] md:w-[35%] max-w[500px] h-[200px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]' onClick={() => mediaInput.current.click()}>
                    <input type="file" accept={uploadType=="loop"? "video/*" : ""} hidden ref={mediaInput} onChange={handleMedia} />

                    <FaRegSquarePlus className='text-white w-[23px] cursor-pointer h-[23px]' />
                    <div className='text-white font-semibold'>   upload {uploadType}</div>

                </div>}

                {frontendMedia &&
                    <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center gap-[8px] mt-[10vh] rounded-2xl'>
                        {mediaType == "image" && <div className='w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  rounded-2xl'>
                            <img src={frontendMedia} alt="" className=" h-[100%] object-cover rounded-2xl" />
                            {uploadType != "story" && <input type="text" className='w-full border-b-gray-400 border-b-1 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                        </div>}

                        {mediaType == "video" && <div className='w-[100%] max-w-[1200px] h-[350px]  flex flex-col items-center justify-center  rounded-xl'>
                            <VideoPlayer media={frontendMedia} />
                            {uploadType != "story" && <input type="text" className='w-full border-b-gray-400 border-b-1 outline-none px-[10px] py-[5px] text-white mt-[20px]' placeholder='write caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                        </div>}


                    </div>}

                {frontendMedia && <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[40px] bg-white mt-[50px] cursor-pointer rounded-xl mb-[20px]' onClick={handleUpload} disabled={loading}>
                    {loading ? (<ClipLoader size={30} color="black" />) : (<> Upload {uploadType}</>)}
                </button>}
            </div>
        </>
    )
}

export default Upload