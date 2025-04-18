import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-black py-10'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-900 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold text-white'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-700 pl-3 rounded-full items-center gap-4 mx-auto bg-gray-900'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent text-white placeholder-gray-400'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
