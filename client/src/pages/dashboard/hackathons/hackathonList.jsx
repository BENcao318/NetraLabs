import React, { useEffect, useState } from 'react'
import serverAPI from '../../../hooks/useAxios'
import { LaunchedHackathonInfoCard } from '../../../components/launchedHackathonInfoCard'

export const HackathonList = () => {
  const [hackathonList, setHackathonList] = useState(null)

  useEffect(() => {
    serverAPI.get('/hackathons/launched-hackathons').then((response) => {
      console.log('message2: ', response.data.message2)
      setHackathonList(response.data.message2)
    })
  }, [setHackathonList])

  return (
    <>
      <div className="text-center mt-6 bg-orange-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6>Explore the hackathons powered by NetraLabs</h6>
      </div>
      <div className="flex flex-wrap gap-6 mt-16 mx-auto w-full h-full">
        {Array.isArray(hackathonList) && hackathonList.length !== 0 ? (
          hackathonList.map((hackathon, key) => (
            <ul key={key} className="mx-auto">
              <LaunchedHackathonInfoCard hackathon={hackathon} />
            </ul>
          ))
        ) : (
          <div className="text-center h-full w-full flex flex-col justify-center">
            <h1 className="text-2xl">No available hackacthon right now.</h1>
            <h1 className="text-2xl">Pelase check again.</h1>
          </div>
        )}
      </div>
    </>
  )
}
