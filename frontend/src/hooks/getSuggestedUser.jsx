import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers } from '../redux/userSlice.js'


const getsuggestedUsers = () => {
    const dispatch = useDispatch()
    const {userdata} = useSelector((state)=>state.user)
   useEffect(()=>{
    const fetchCurrentUser = async () =>{
        try {
            const  res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/suggested`,{withCredentials:true})
            dispatch(setSuggestedUsers(res.data))
        } catch (error) {
            console.error("Error fetching current user:", error)
        }
    }
    fetchCurrentUser()
   },[userdata])
}

export default getsuggestedUsers