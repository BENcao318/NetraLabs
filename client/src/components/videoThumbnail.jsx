import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  useEffect(() => {
    // Function to get the video thumbnail URL
    const getVideoThumbnail = async () => {
      try {
        if (videoUrl.includes('youtube.com')) {
          // For YouTube videos
          const videoId = videoUrl.split('v=')[1]
          const response = await axios.get(
            // `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_YOUTUBE_API_KEY&part=snippet`
            'http://img.youtube.com/vi/Fflq_SAkCU8/0.jpg'
          )
          const youtubeThumbnailUrl =
            response.data.items[0].snippet.thumbnails.medium.url
          setThumbnailUrl(youtubeThumbnailUrl)
        } else if (videoUrl.includes('vimeo.com')) {
          // For Vimeo videos
          const videoId = videoUrl.split('/').pop()
          const response = await axios.get(
            `https://vimeo.com/api/v2/video/${'524933864'}.json`
          )
          const vimeoThumbnailUrl = response.data[0].thumbnail_medium
          setThumbnailUrl(vimeoThumbnailUrl)
        }
      } catch (error) {
        console.error('Error fetching video thumbnail:', error)
      }
    }

    getVideoThumbnail()
  }, [videoUrl])

  return (
    <div className="w-full h-full">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width="320"
          height="180"
        />
      )}
    </div>
  )
}

export default VideoThumbnail
