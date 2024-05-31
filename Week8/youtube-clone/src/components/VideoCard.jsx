import React from 'react'

const VideoCard = ({title,image,thumbImage,author,views,timestamp}) => {
  return (
    <div className='p-4'>
        <img src={image} alt="" className='rounded-xl'/>
        <div className='grid grid-cols-12  text-black items-center '>
            <div className='col-span-1'>
                <img src={thumbImage} alt="" className='rounded-[100%] w-10 h-10 md:w-28 md:h-8'/>
            </div>
            <div className='col-span-11 text-white ml-4'>
                <div>
                   {title}
                </div>
                <div className='col-span-11 text-gray-500 text-sm'>
                    {author}
                </div>
                <div className='col-span-11 text-gray-500 text-sm'>
                    {views} | {timestamp}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default VideoCard
