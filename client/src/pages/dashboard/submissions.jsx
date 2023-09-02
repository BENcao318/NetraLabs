import VideoThumbnail from 'components/videoThumbnail'
import { VimeoVideo } from 'components/vimeoVideo'
import { YoutubeVideo } from 'components/youtubeVideo'
import React from 'react'

export const Submissions = () => {
  return (
    <div className="flex justify-center p-6 h-screen">
      <div className="text-bold text-2xl self-center ">Submissions1</div>
      <VideoThumbnail
        videoUrl={
          'https://www.youtube.com/watch?v=Fflq_SAkCU8&ab_channel=FIBA-TheBasketballChannel'
        }
      />
      <YoutubeVideo />
      <VimeoVideo />

      <img
        alt={
          'https://www.youtube.com/watch?v=Fflq_SAkCU8&ab_channel=FIBA-TheBasketballChannel'
        }
        src={'https://img.youtube.com/vi/Fflq_SAkCU8/0.jpg'}
        className="w-full h-60"
      />
      <img
        alt={
          'https://www.youtube.com/watch?v=Fflq_SAkCU8&ab_channel=FIBA-TheBasketballChannel'
        }
        src={'https://vumbnail.com/707117326.jpg'}
        className="w-full h-60"
      />
    </div>
  )
}

// https://img.youtube.com/vi/Fflq_SAkCU8/0.jpg
