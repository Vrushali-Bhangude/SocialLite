import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const getCurrentUser = () => {
    const dispatch = useDispatch()
    
   useEffect(()=>{
    const fetchCurrentUser = async () =>{
        try {
            const  res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(res.data))
        } catch (error) {
            console.error("Error fetching current user:", error)
        }
    }
    fetchCurrentUser()
   },[])
}

export default getCurrentUser