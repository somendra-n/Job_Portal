import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='bg-black text-white max-w-8xl mx-auto my-0 p-5'>
            <h1 className='text-4xl font-bold my-10 text-center'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {
                    allJobs.length <= 0 
                        ? <span className='text-gray-400'>No Job Available</span> 
                        : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
}

export default LatestJobs;
