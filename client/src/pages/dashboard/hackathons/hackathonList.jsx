import React, { useContext, useEffect } from 'react'
import { LaunchedHackathonInfoCard } from '../../../components/launchedHackathonInfoCard'
import { hackathonListContext } from '../../../context/hackathonListContext'

export const HackathonList = () => {
  const { hackathonList } = useContext(hackathonListContext)

  return (
    <>
      <div className="text-center mt-6 bg-orange-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6>Explore the hackathons powered by NetraLabs</h6>
      </div>
      <div className=" mt-16 mx-auto h-full max-w-[70rem] grid lg:grid-cols-2  gap-6">
        {Array.isArray(hackathonList) &&
          hackathonList.length !== 0 &&
          hackathonList.map((hackathon, key) => (
            <ul key={key}>
              <LaunchedHackathonInfoCard
                hackathon={hackathon}
                navigation={'hackathon'}
              />
            </ul>
          ))}
      </div>
      {(hackathonList === null || hackathonList.length === 0) && (
        <div className="text-center w-full flex flex-col justify-center">
          <h1 className="text-2xl">No available hackacthon right now.</h1>
          <h1 className="text-2xl">Pelase check again.</h1>
        </div>
      )}
    </>
  )
}
