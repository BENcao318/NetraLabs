import React, { useContext, useEffect, useState } from 'react'
import serverAPI from '../../../hooks/useAxios'
import { LaunchedHackathonInfoCard } from '../../../components/launchedHackathonInfoCard'
import { hackathonListContext } from '../../../context/hackathonListContext'
import { authContext } from '../../../context/authContext'

export const HackathonList = () => {
  const { hackathonList, setHackathonList } = useContext(hackathonListContext)
  const { auth } = useContext(authContext)

  useEffect(() => {
    const userData = { userEmail: auth.user.email }
    if (userData) {
      serverAPI
        .post('/hackathons/launched-hackathons', userData)
        .then((response) => {
          setHackathonList(response.data.message2)
        })
    }
  }, [setHackathonList, hackathonList, auth])

  return (
    <>
      <div className="text-center mt-6 bg-orange-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6>Explore the hackathons powered by NetraLabs</h6>
      </div>
      <div className=" mt-16 mx-auto h-full max-w-[70rem] grid lg:grid-cols-2  gap-6">
        {Array.isArray(hackathonList) && hackathonList.length !== 0 ? (
          hackathonList.map((hackathon, key) => (
            <ul key={key}>
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
