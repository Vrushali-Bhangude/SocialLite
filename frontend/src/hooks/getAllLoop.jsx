import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoopData } from '../redux/loopSlice'

const getAllLoop = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchLoop = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/loop/getAll`, { withCredentials: true })
                dispatch(setLoopData(res.data))
            } catch (error) {
                console.error("Error fetching all loop:", error)
            }
        }
        fetchLoop()
    }, [dispatch, userData])
}

export default getAllLoop