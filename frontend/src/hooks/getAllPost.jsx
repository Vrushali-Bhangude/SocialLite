import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'

const getAllPost = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user)
   useEffect(()=>{
    const fetchPost = async () =>{
        try {
            const  res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/post/getAll`,{withCredentials:true})
            dispatch(setPostData(res.data))
        } catch (error) {
            console.error("Error fetching all post:", error)
        }
    }
    fetchPost()
   },[dispatch, userData])
}

export default getAllPost