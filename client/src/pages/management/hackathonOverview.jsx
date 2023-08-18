import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/authContext'
import serverAPI from '../../hooks/useAxios'
import { HackathonInfoCard } from '../../components/hackathonInfoCard'
import { CreateAHackathonCard } from '../../components/createAHackathonCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hackathonListContext } from '../../context/hackathonListContext'

export const HackathonOverview = () => {
  const { auth, setAuth } = useContext(authContext)
  const { hackathonList, setHackathonList } = useContext(hackathonListContext)

  useEffect(() => {
    getHackathonList()
  }, [setHackathonList, auth])

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
            <h3 className="text-center text-2xl">
              You haven't created any hackathons yet.
            </h3>
          </div>
        )}
        {hackathonList.length !== 0 &&
          hackathonList.map((hackathon, key) => (
            <ul key={key} className="h-full">
              <HackathonInfoCard
                hackathon={hackathon}
                hackathonList={hackathonList}
              />
            </ul>
          ))}
        <div className="h-full">
          <CreateAHackathonCard />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3600}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}
