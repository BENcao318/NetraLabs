import { Card, CardBody, Typography } from '@material-tailwind/react'
import React from 'react'
import VideoThumbnail from './videoThumbnail'
import { useNavigate } from 'react-router-dom'

export const SubmittedProjectCard = ({ project }) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/dashboard/projects/view-project/?data=${project.id}`)
  }

  return (
    <>
      <Card
        className="max-w-[26rem] lg:max-w-[44rem] h-full flex hover:shadow-xl cursor-pointer  break-all rounded-xl mx-auto group w-fit"
        onClick={onClick}
      >
        <CardBody className="flex flex-col">
          <VideoThumbnail videoUrl={project.video_url} className="w-full " />

          <div className="w-full mt-2">
            <Typography
              color="blue-gray"
              className="text-center text-lg font-bold"
            >
              {project.name}
            </Typography>
            {project.tagline && (
              <Typography
                color="blue-gray"
                className="text-center text-lg font-bold"
              >
                {project.tagline}
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
