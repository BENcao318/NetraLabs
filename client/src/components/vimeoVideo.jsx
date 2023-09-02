import React, { useState } from 'react'
import Vimeo from '@u-wave/react-vimeo'

export const VimeoVideo = ({ videoId }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const onPlayerError = (error) => {
    setErrorMessage(
      'Error loading Vimeo video. Please check the url and try again.'
    )
  }
  console.log('vimeo video', videoId)
  return (
    <>
      <div>
        <div>{errorMessage && <div className="">{errorMessage}</div>}</div>
        <Vimeo
          video={videoId}
          height={'390'}
          width={'640'}
          autoplay={false}
          onError={onPlayerError}
        />
      </div>
    </>
  )
}
