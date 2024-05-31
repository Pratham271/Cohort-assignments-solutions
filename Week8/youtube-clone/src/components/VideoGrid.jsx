import React from 'react'
import VideoCard from './VideoCard'
import { VIDEOS } from '../Videos'

const VideoGrid = () => {
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      {
        VIDEOS.map((video,index)=> (
            <div key={index}>
                <VideoCard 
                title={video.title}
                image={video.image}
                thumbImage={video.thumbImage}
                author={video.author}
                views={video.views}
                timestamp={video.timestamp}/>
            </div>
        ))
      }
    </div>
  )
}

export default VideoGrid
