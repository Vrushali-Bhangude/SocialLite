import React, { useState, useRef, useEffect } from 'react'
import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io'

const VideoPlayer = ({ media, postId, currentPlaying, setCurrentPlaying, hasAudio = false }) => {
    const videoRef = useRef()
    const containerRef = useRef()
    const [mute, setMute] = useState(true)
    const [isPlay, setIsPlay] = useState(false)

    const handleClick = () => {
        if (isPlay) {
            videoRef.current.pause()
            setIsPlay(false)
        } else {
            videoRef.current.play()
            setIsPlay(true)
            setCurrentPlaying(postId)
        }
    }

    const handleMuteToggle = () => {
        setMute(prev => !prev)
        if (!mute) setCurrentPlaying(postId)
    }

    // IntersectionObserver for scroll-based auto play & auto-unmute
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Play muted first (browser allows this)
                    videoRef.current.muted = true
                    videoRef.current.play()
                    setIsPlay(true)
                    setCurrentPlaying(postId)

                    // Auto unmute after slight delay if video has audio
                    if (hasAudio) {
                        setTimeout(() => {
                            try {
                                videoRef.current.muted = false
                                setMute(false)
                            } catch (err) {
                                console.log('Autoplay with sound blocked', err)
                            }
                        }, 200) // 200ms delay
                    }
                } else {
                    videoRef.current.pause()
                    videoRef.current.currentTime = 0
                    setIsPlay(false)
                    videoRef.current.muted = true
                    setMute(true)
                }
            },
            { threshold: 0.6 }
        )

        if (containerRef.current) observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [postId, hasAudio, setCurrentPlaying])

    // Sync mute with currentPlaying
    useEffect(() => {
        if (currentPlaying === postId) {
            videoRef.current.muted = mute
        } else {
            videoRef.current.muted = true
        }
    }, [currentPlaying, mute, postId])

    return (
        <div ref={containerRef} className='relative w-full rounded-xl overflow-hidden'>
            <video
                ref={videoRef}
                src={media}
                loop
                muted={mute}
                className='w-full h-auto object-cover cursor-pointer'
                onClick={handleClick}
            />

            <div className='absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded-full'>
                {mute ? (
                    <IoMdVolumeOff className='w-6 h-6 text-white cursor-pointer' onClick={handleMuteToggle} />
                ) : (
                    <IoMdVolumeHigh className='w-6 h-6 text-white cursor-pointer' onClick={handleMuteToggle} />
                )}
            </div>
        </div>
    )
}

export default VideoPlayer
