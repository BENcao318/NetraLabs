import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserInfoCard } from 'components/userInfoCard'
import { Checkbox } from '@material-tailwind/react'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { AcademicCapIcon } from '@heroicons/react/24/solid'

export const ParticipantsList = () => {
  const [userList, setUserList] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const { auth } = useContext(authContext)
  const [projectList, setProjectList] = useState([])

  const getUserList = useCallback(() => {
    serverAPI
      .get('/users/participant-list')
      .then((response) => {
        setUserList(response.data.message2)
      })
      .catch((err) => console.log(err))
  }, [setUserList])

  const getProjectList = useCallback(() => {
    const userData = {
      userId: auth.user.id,
    }

    serverAPI
      .post('/projects/invitation-list', userData)
      .then((response) => {
        setProjectList(response.data.message2)
      })
      .catch((err) => console.log(err))
  }, [setProjectList, auth.user.id, projectList])

  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }
  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  useEffect(() => {
    const usersFilteredWithRoles = userList.filter((user) => {
      if (selectedRoles.length === 0) {
        return true // Show all users if no roles are selected
      }

      return selectedRoles.includes(user.role)
    })
    const newFilteredUsers = usersFilteredWithRoles.filter((user) => {
      if (selectedSkills.length === 0) {
        return true // Show all users if no roles are selected
      }
      const userSkills = user.skills.map((skill) => skill.label)
      console.log('selectedSkills', selectedRoles)
      return selectedSkills.some((item) => userSkills.includes(item))
    })
    setFilteredUsers(newFilteredUsers)
  }, [
    userList,
    setUserList,
    selectedRoles,
    setSelectedRoles,
    setSelectedSkills,
    selectedSkills,
  ])

  useEffect(() => {
    getProjectList()
  }, [setProjectList, getProjectList])

  useEffect(() => {
    getUserList()
  }, [setUserList, getUserList])

  const roles = [
    'Full-stack developer',
    'Front-end developer',
    'Back-end developer',
    'UI Designer',
    'Data Scientist',
    'Product Manager',
    'Business Manager',
  ]

  const skills = [
    'JavaScript',
    'C#',
    'Ruby',
    'React',
    'Python',
    'Java',
    'Vue.js',
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

          <div className="mt-2">
            <div className="flex gap-1 items-center">
              <WrenchScrewdriverIcon className="h-4 w-4 text-teal-600" />
              <h1 className=" text-teal-600">Skills</h1>
            </div>
            <div className="flex flex-col mt-2">
              {skills.map((skill) => (
                <div className="w-[12rem]" key={skill}>
                  <Checkbox
                    id="ripple-on"
                    label={skill}
                    ripple={true}
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {filteredUsers.length !== 0 ? (
          <div className="grid lg:grid-cols-2 gap-6 h-full">
            {filteredUsers.map((userData, key) => (
              <ul key={key}>
                <UserInfoCard userData={userData} projectList={projectList} />
              </ul>
            ))}
          </div>
        ) : (
          <div className="lg:min-w-[53.5rem] min-w-[26rem] text-center flex h-full justify-center items-center font-bold text-xl">
            No available user
          </div>
        )}
      </div>
    </>
  )
}
