import React, { useRef, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import dp from '../assets/dp.png'
import axios from 'axios';
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';


const EditProfile = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setFrontnedImage] = useState(userData.profileImage || dp)
    const [backendImage, setBacknedImage] = useState(null)
    const [name, setName] = useState(userData.user.name || "")
    const [userName, setUserName] = useState(userData.user.userName || "")
    const [bio, setBio] = useState(userData.user.bio || "")
    const [profession, setProfession] = useState(userData.user.profession || "")
    const [gender, setGender] = useState(userData.user.gender || "")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBacknedImage(file)
        setFrontnedImage(URL.createObjectURL(file))
    }

   const handleEditProfile = async () => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("userName", userName);
        formData.append("bio", bio);
        formData.append("profession", profession);
        formData.append("gender", gender);

        if (backendImage) {
            formData.append("profileImage", backendImage);
        }

        const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/user/editprofile`,
            formData,
            { withCredentials: true }
        );

        dispatch(setProfileData(result.data));
        dispatch(setUserData(result.data));
        toast.success("Profile Updated Successfully!!");
        navigate(`/profile/${userData?.user?.userName}`);
    } catch (error) {
        const message = error.response?.data?.message || "Failed to Update Profile";
        toast.error(message);
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] '>
                <div className='w-full h-[80px] flex fixed left-[20px] items-center gap-[20px] px-[20px]'>
                    <MdOutlineKeyboardBackspace className='text-white w-[25px] cursor-pointer h-[25px]' onClick={() => navigate(`/profile/${userData?.user?.userName}`)} />
                    <h1 className='text-white font-semibold text-[20px]'>Edit Profile</h1>
                </div>

                <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden mt-[80px] md:mt-[40px]" onClick={() => imageInput.current.click()}>
                    <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage} />
                    <img src={frontendImage} alt="Profile"
                        className="w-full h-full object-cover" />
                </div>

                <div className='text-blue-500 text-centre text-[14px] font-semibold cursor-pointer' onClick={() => imageInput.current.click()}>
                    Change Your Profile Picture
                </div>

                <input type="text" className='w-[90%] max-w-[500px] h-[50px] bg-[#0a1010] border-2 border-gray-700 rounded-xl text-white font-semibold px-[10px] outline-none' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} value={name} />
                <input type="text" className='w-[90%] max-w-[500px] h-[50px] bg-[#0a1010] border-2 border-gray-700 rounded-xl text-white font-semibold px-[20px] outline-none' placeholder='Enter User-Name' onChange={(e) => setUserName(e.target.value)} value={userName} />
                <input type="text" className='w-[90%] max-w-[500px] h-[50px] bg-[#0a1010] border-2 border-gray-700 rounded-xl text-white font-semibold px-[20px] outline-none' placeholder='Bio' onChange={(e) => setBio(e.target.value)} value={bio}         maxLength={100} />
                <input type="text" className='w-[90%] max-w-[500px] h-[50px] bg-[#0a1010] border-2 border-gray-700 rounded-xl text-white font-semibold px-[20px] outline-none' placeholder='Profession' onChange={(e) => setProfession(e.target.value)} value={profession} />
                <input type="text" className='w-[90%] max-w-[500px] h-[50px] bg-[#0a1010] border-2 border-gray-700 rounded-xl text-white font-semibold px-[20px] outline-none' placeholder='Gender' onChange={(e) => setGender(e.target.value)} value={gender} />

                <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] cursor-pointer rounded-xl mb-[30px]'
                    onClick={(handleEditProfile)} >
                    {loading ? <ClipLoader size={30} color='black' /> : "Save Profile"}
                </button>
            </div>
        </>
    )
}

export default EditProfile