import { PlayVideo } from 'components/playVideo'
import serverAPI from 'hooks/useAxios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as DOMPurify from 'dompurify'

export const ViewSubmittedProject = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const projectId = queryParams.get('data')
  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }
  const [project, setProject] = useState(null)

  useEffect(() => {
    const projectData = {
      projectId: projectId,
    }
    serverAPI
      .post('/projects/get-submitted-project', projectData)
      .then((response) => {
        setProject(response.data.message2)
      })
      .catch((err) => console.log(err.message))
  }, [setProject, projectId])

  return (
    <>
      {project && (
        <div className="p-6 h-full mt-16 flex flex-col gap-4 mx-auto max-w-6xl divide-y divide-gray-400">
          <div className="text-center">
            <h6 className="font-semibold text-3xl h-6 mb-6">{project.name}</h6>
            <p className="text-lg mt-3">{project.pitch}</p>
          </div>
          <div className="py-6 mt-2">
            <h6 className="font-semibold text-3xl h-6 mb-6 ">Video</h6>
            <PlayVideo videoUrl={project.video_url} />
          </div>

          <div className="py-6 -mb-6">
            <h1 className="uppercase text-2xl font-mono tracking-wide	font-bold">
              Story
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(project.story),
              }}
              className="text-lg flex flex-col py-6"
            />
          </div>
          <div className="py-6">
            <h1 className="uppercase text-xl font-mono tracking-wide	font-bold">
              Tech Stack:
            </h1>
            <div className="flex gap-3 mt-2">
              {project.tech_stack.map((tech) => {
                return (
                  <div
                    className="px-2 py-1 bg-blue-600 rounded-lg text-white font-medium"
                    key={tech}
                  >
                    {tech.label}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="py-6">
            <h1 className="uppercase text-xl font-mono tracking-wide	font-bold">
              Repo link:
            </h1>
            <div className="flex gap-3 mt-2">
              <a
                href={project.repository_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.repository_url}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
