import { Dialog } from '@material-tailwind/react'
import * as DOMPurify from 'dompurify'
import React from 'react'
import { PlayVideo } from './playVideo'

export const ProjectPreviewDialog = ({ open, handleOpen, projectPreview }) => {
  console.log(projectPreview)
  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="h-full overflow-auto"
        size="xl"
      >
        <div className="p-6 h-full mt-16 flex flex-col gap-4 mx-auto max-w-6xl divide-y divide-gray-400">
          <div className="text-center">
            <h6 className="font-semibold text-3xl h-6 mb-6">
              {projectPreview.name}
            </h6>
            <p className="text-lg mt-3">{projectPreview.pitch}</p>
          </div>
          <div className="py-6 mt-2">
            <h6 className="font-semibold text-3xl h-6 mb-6 ">Video</h6>
            <PlayVideo videoUrl={projectPreview.videoUrl} />
          </div>

          <div className="py-6 -mb-6">
            <h1 className="uppercase text-2xl font-mono tracking-wide	font-bold">
              Story
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(projectPreview.story),
              }}
              className="text-lg flex flex-col py-6"
            />
          </div>
          <div className="py-6">
            <h1 className="uppercase text-xl font-mono tracking-wide	font-bold">
              Tech Stack:
            </h1>
            <div className="flex gap-3 mt-2">
              {projectPreview.techStack.map((tech) => {
                return (
                  <div className="px-2 py-1 bg-blue-600 rounded-lg text-white font-medium">
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
                href={projectPreview.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {projectPreview.repositoryUrl}
              </a>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
