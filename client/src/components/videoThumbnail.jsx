import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serverAPI from 'hooks/useAxios'

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  useEffect(() => {
    // Function to get the video thumbnail URL
    const getVideoThumbnail = async () => {
      try {
        if (videoUrl.includes('youtube.com')) {
          const data = {
            videoUrl,
          }
          // For Youtube Videos
          serverAPI
            .post('/projects/get-youtube-thumbnail', data)
            .then((response) => {
              const { thumbnailUrl } = response.data

              setThumbnailUrl(thumbnailUrl)
            })
            .catch((error) => {
              console.error('Fetch error:', error)
            })
        } else if (videoUrl.includes('vimeo.com')) {
          // For Vimeo videos
          const videoId = videoUrl.split('/').pop()
          const response = await axios.get(
            `https://vimeo.com/api/v2/video/${videoId}.json`
          )
          const vimeoThumbnailUrl = response.data[0].thumbnail_large
          setThumbnailUrl(vimeoThumbnailUrl)
        }
      } catch (error) {
        console.error('Error fetching video thumbnail:', error)
      }
    }

    getVideoThumbnail()
  }, [videoUrl])

  return (
    <div className="flex justify-center">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width="320"
          height="180"
          onError={(e) => {
            console.error('Error loading image:', e)
          }}
        />
      )}
    </div>
  )
}

export default VideoThumbnail
