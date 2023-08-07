import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/authContext'
import serverAPI from '../../hooks/useAxios'
import { HackathonInfoCard } from '../../components/hackathonInfoCard'
import { CreateAHackathonCard } from '../../components/createAHackathonCard'

export const HackathonOverview = () => {
  const { auth, setAuth } = useContext(authContext)
  const [hackathonList, setHackathonList] = useState([])

  useEffect(() => {
    console.log(auth.user)
    getHackathonList()
    console.log(hackathonList)
  }, [auth, setHackathonList])

  const getHackathonList = () => {
    serverAPI.post('/hackathons/list', auth.user).then((response) => {
      setHackathonList(response.data.message2)
    })
  }

  return (
    <>
      <div className="mt-36 flex mx-36 w-[60rem] mx-auto">
        {hackathonList.length === 0 && (
          <div>
            <h3>You haven't created any hackathons yet.</h3>
            <CreateAHackathonCard />
          </div>
        )}
        {hackathonList.length !== 0 &&
          hackathonList.map((hackathon, key) => (
            <ul key={key} className="mb-4 flex gap-12 items-center">
              <HackathonInfoCard hackathon={hackathon} />
              <CreateAHackathonCard />
            </ul>
          ))}
      </div>
    </>
  )
}
