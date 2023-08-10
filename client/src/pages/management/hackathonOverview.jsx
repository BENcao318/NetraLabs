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
    serverAPI
      .post('/hackathons/list', auth.user)
      .then((response) => {
        console.log(response.data.message2)
        setHackathonList(response.data.message2)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="mt-36 flex flex-wrap gap-12 items-center">
        {hackathonList.length === 0 && (
          <div>
            <h3>You haven't created any hackathons yet.</h3>
            <CreateAHackathonCard />
          </div>
        )}
        {hackathonList.length !== 0 &&
          hackathonList.map((hackathon, key) => (
            <ul key={key} className="h-full">
              <HackathonInfoCard hackathon={hackathon} />
            </ul>
          ))}
        <div className="h-full">
          <CreateAHackathonCard />
        </div>
      </div>
    </>
  )
}
