import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFollow } from '../redux/userSlice'

const FollowButton = ({ targetUserId, tailwind}) => {
const following = useSelector(state => state.user.following)
    const isFollowing = following?.includes(targetUserId)
    const dispatch = useDispatch()
    const handleFollow = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/follow/${targetUserId}`, { withCredentials: true });
           
            dispatch(toggleFollow(targetUserId))
        } catch (error) {
          console.log(error)
        }
    }
    return (
        <>
            <button className={tailwind} onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
            </button>
            
        </>
    )
}

export default FollowButton