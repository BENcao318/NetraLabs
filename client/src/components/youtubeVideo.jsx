import React, { useState } from 'react'
import YouTube from 'react-youtube'

export const YoutubeVideo = ({ videoId }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const onPlayerError = (error) => {
    setErrorMessage(
      'Error loading Youtube video. Please check the url and try again.'
    )
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <>
      <div>
        <div>{errorMessage && <div className="">{errorMessage}</div>}</div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onError={onPlayerError}
        />
      </div>
    </>
  )
}
