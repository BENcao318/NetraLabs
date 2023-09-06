import { SubmittedProjectCard } from 'components/submittedProjectCard'
import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const SubmissionList = () => {
  const [submissionList, setSubmissionList] = useState([])
  const { auth } = useContext(authContext)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const hackathonId = queryParams.get('id')
  const hackathonName = queryParams.get('name')

  const getSubmissionList = useCallback(() => {
    const data = {
      userId: auth.user.id,
      hackathonId,
    }

    serverAPI
      .post('/hackathons/submissions', data)
      .then((response) => {
        setSubmissionList(response.data.message2)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setSubmissionList])

  console.log(submissionList)

  useEffect(() => {
    getSubmissionList()
  }, [getSubmissionList])

  return (
    <>
      <div className="text-center mt-6 bg-cyan-600 text-white font-bold text-2xl py-4 rounded-lg w-full h-full">
        <h6>
          Submissions for <span className="italic ml-3 ">{hackathonName}</span>
        </h6>
      </div>
      <div className=" mt-16 mx-auto h-full max-w-[70rem] grid lg:grid-cols-2  gap-6">
        {Array.isArray(submissionList) &&
          submissionList.length !== 0 &&
          submissionList.map((project) => (
            <ul key={project.id}>
              <SubmittedProjectCard project={project} />
            </ul>
          ))}
      </div>
    </>
  )
}
