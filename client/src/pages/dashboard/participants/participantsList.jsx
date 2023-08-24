import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ProjectInfoCard } from '../../../components/projectInfoCard'
import { UserInfoCard } from 'components/userInfoCard'

export const ParticipantsList = () => {
  const [userList, setUserList] = useState([])

  const getUserList = useCallback(() => {
    serverAPI
      .get('/users/participant-list')
      .then((response) => {
        setUserList(response.data.message2)
      })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    getUserList()
  }, [setUserList])

  return (
    <>
      <div className="text-center mt-6 bg-teal-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6 className="uppercase">Participants</h6>
      </div>
      <div className=" mt-16 mx-auto h-full w-full grid lg:grid-cols-1  gap-6">
        {Array.isArray(userList) &&
          userList.length !== 0 &&
          userList.map((userData, key) => (
            <ul key={key}>
              <UserInfoCard userData={userData} />
            </ul>
          ))}
      </div>
    </>
  )
}
