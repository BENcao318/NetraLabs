import React, { useEffect, useState } from 'react'
import { YoutubeVideo } from './youtubeVideo'
import { VimeoVideo } from './vimeoVideo'

export const PlayVideo = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState('')
  const [website, setWebsite] = useState('')

  useEffect(() => {
    if (videoUrl.includes('youtube.com')) {
      setWebsite('youtube')
      const videoId = new URL(videoUrl).searchParams.get('v')
      setVideoId(videoId)
    } else if (videoUrl.includes('vimeo.com')) {
      setWebsite('vimeo')
      const videoId = videoUrl.split('/').pop()
      setVideoId(videoId)
    }
  }, [videoUrl, setWebsite, setVideoId])

  return (
    <>
      <div className="flex w-full justify-center">
        {website === 'youtube' && <YoutubeVideo videoId={videoId} />}
        {website === 'vimeo' && <VimeoVideo videoId={videoId} />}
      </div>
    </>
  )
}
