import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ProjectInfoCard } from '../../../components/projectInfoCard'

export const ProjectList = () => {
  const { auth } = useContext(authContext)
  const [projectList, setProjectList] = useState([])

  const getProjectList = useCallback(() => {
    const userData = {
      userId: auth.user.id,
    }

    serverAPI
      .post('/projects/list', userData)
      .then((response) => {
        setProjectList(response.data.message2)
      })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    getProjectList()
  }, [setProjectList])

  return (
    <>
      <div className="text-center mt-6 bg-green-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6 className="uppercase">Your projects</h6>
      </div>
      <div className=" mt-16 mx-auto h-full w-full grid lg:grid-cols-1  gap-6">
        {Array.isArray(projectList) && projectList.length !== 0 ? (
          projectList.map((project, key) => (
            <ul key={key}>
              <ProjectInfoCard projectData={project} />
            </ul>
          ))
        ) : (
          <div className="text-center h-full w-full flex flex-col justify-center">
            <h1 className="text-2xl">You haven't created any projects yet.</h1>
            <h1 className="text-2xl">
              Pelase go to Hackathons page and create a new project.
            </h1>
          </div>
        )}
      </div>
    </>
  )
}
