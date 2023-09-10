import { authContext } from "context/authContext"
import serverAPI from "hooks/useAxios"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { ProjectInfoCard } from "../../../components/projectInfoCard"

export const ProjectList = () => {
  const { auth } = useContext(authContext)
  const [projectList, setProjectList] = useState([])

  const getProjectList = useCallback(() => {
    const userData = {
      userId: auth.user.id,
    }

    serverAPI
      .post("/projects/list", userData)
      .then((response) => {
        setProjectList(response.data.message2)
      })
      .catch((err) => console.log(err))
  }, [projectList])

  useEffect(() => {
    getProjectList()
  }, [setProjectList])

  return (
    <>
      <div className=" mt-6 h-full w-full rounded-lg bg-green-600 py-4 text-center text-2xl font-bold text-white">
        <h6 className="uppercase">Your projects</h6>
      </div>
      <div className=" mx-auto mt-16 grid h-full w-full gap-6  lg:grid-cols-1">
        {Array.isArray(projectList) && projectList.length !== 0 ? (
          projectList.map((project, key) => (
            <ul key={key}>
              <ProjectInfoCard projectData={project} />
            </ul>
          ))
        ) : (
          <div className="flex h-full w-full flex-col justify-center text-center">
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
