import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserInfoCard } from 'components/userInfoCard'
import { Checkbox, Typography } from '@material-tailwind/react'
import { setConfig } from 'dompurify'
import { AcademicCapIcon } from '@heroicons/react/24/solid'

export const ParticipantsList = () => {
  const [userList, setUserList] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  const getUserList = useCallback(() => {
    serverAPI
      .get('/users/participant-list')
      .then((response) => {
        setUserList(response.data.message2)
      })
      .catch((err) => console.log(err))
  }, [setUserList])

  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  useEffect(() => {
    const newFilteredUsers = userList.filter((user) => {
      if (selectedRoles.length === 0) {
        return true // Show all users if no roles are selected
      }
      return selectedRoles.includes(user.role)
    })
    setFilteredUsers(newFilteredUsers)
  }, [selectedRoles, setSelectedRoles])

  useEffect(() => {
    getUserList()
  }, [setUserList])

  const roles = [
    'Full-stack developer',
    'Front-end developer',
    'Back-end developer',
    'UI Designer',
    'Data Scientist',
    'Product Manager',
    'Business Manager',
  ]

  return (
    <>
      <div className="text-center mt-6 bg-teal-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6 className="uppercase">Participants</h6>
      </div>
      <div className=" mt-16 mx-auto h-full w-full flex justify-center">
        <div className="flex-col mr-10">
          <h1 className="mb-3 font-bold ">FILTERS: </h1>
          <div>
            <div className="flex gap-1 items-center">
              <AcademicCapIcon className="h-5 w-5 text-teal-600" />
              <h1 className=" text-teal-600">Roles</h1>
            </div>
            <div className="flex flex-col mt-2">
              {roles.map((role) => (
                <div className="w-[12rem]" key={role}>
                  <Checkbox
                    id="ripple-on"
                    label={role}
                    ripple={true}
                    value={role}
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2  gap-6">
          {Array.isArray(filteredUsers) &&
            filteredUsers.length !== 0 &&
            filteredUsers.map((userData, key) => (
              <ul key={key}>
                <UserInfoCard userData={userData} />
              </ul>
            ))}
        </div>
      </div>
    </>
  )
}
