import React, { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import StoryCard from './StoryCard'
import dp from '../assets/dp.png'
import Nav from './Nav'
import Post from './Post'
import { useSelector } from 'react-redux'

const Feed = () => {
    const { postData } = useSelector((state) => state.post)
    const [currentPlaying, setCurrentPlaying] = useState(null)

    return (
        <>
            <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto '>
                <div className='w-full h-16 border-b-2 border-gray-900 flex justify-between items-center px-5 lg:hidden'>
                    <h1 className='text-white text-xl'>Sociallight</h1>
                    <div>
                        <FaRegHeart className='text-white' />
                    </div>
                </div>

                <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
                    <StoryCard ProfileImage={dp} userName={"vrushuuuuuuuuuuuuuuuuuuuuu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                    <StoryCard ProfileImage={dp} userName={"vrushu"} />
                </div>
                <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40[px] bg-white rounded-t-[40px] relative pb-[120px] '>
                    <Nav />

                    {postData && postData.map((post, index) => (
                        <Post
                            post={post}
                            key={index}
                            postId={post._id} 
                            currentPlaying={currentPlaying} 
                            setCurrentPlaying={setCurrentPlaying} 
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Feed