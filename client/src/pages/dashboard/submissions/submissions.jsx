import { LaunchedHackathonInfoCard } from 'components/launchedHackathonInfoCard'
import VideoThumbnail from 'components/videoThumbnail'
import { VimeoVideo } from 'components/vimeoVideo'
import { YoutubeVideo } from 'components/youtubeVideo'
import { hackathonListContext } from 'context/hackathonListContext'
import React, { useContext } from 'react'

export const Submissions = () => {
  const { hackathonList } = useContext(hackathonListContext)

  return (
    <>
      <div className="text-center mt-6 bg-indigo-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6>Select a hackathon to view all submissions</h6>
      </div>
      <div className=" mt-16 mx-auto h-full max-w-[70rem] grid lg:grid-cols-2  gap-6">
        {Array.isArray(hackathonList) &&
          hackathonList.length !== 0 &&
          hackathonList.map((hackathon, key) => (
            <ul key={key}>
              <LaunchedHackathonInfoCard
                hackathon={hackathon}
                navigation={'submissions'}
              />
            </ul>
          ))}
      </div>
      {(hackathonList === null || hackathonList.length === 0) && (
        <div className="text-center w-full flex flex-col justify-center">
          <h1 className="text-2xl">No available hackacthon yet.</h1>
          <h1 className="text-2xl">Pelase check again.</h1>
        </div>
      )}
    </>
  )
}
