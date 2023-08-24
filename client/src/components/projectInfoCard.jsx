import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from '@material-tailwind/react'
import {
  calculateDaysForHackathon,
  calculateTotalPrize,
  convertStartTimeAndDeadlineToStringForInfoCard,
} from '../helpers/util'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/authContext'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { BuildingOffice2Icon } from '@heroicons/react/24/solid'
import { TrophyIcon } from '@heroicons/react/24/solid'
import { GlobeAltIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import blueprintImage from 'img/blueprintImage.png'

export const ProjectInfoCard = ({ projectData }) => {
  const { auth } = useContext(authContext)
  const navigate = useNavigate()
  const [progressStatus, setProgressStatus] = useState('')
  const { project, hackathon } = projectData
  const [projectStatus, setProjectStatus] = useState('Not Submitted')

  const onClick = () => {
    navigate(`/dashboard/projects/edit-project/?data=${project.id}`)
  }

  useEffect(() => {
    if (hackathon) {
      setProgressStatus(
        calculateDaysForHackathon(
          hackathon.start_time,
          hackathon.deadline,
          auth.timeZone ? auth.timeZone : projectData.hackathon.time_zone.value
        )
      )
    }
  }, [hackathon, setProgressStatus])

  return (
    <>
      <Card
        className="max-w-[44rem] h-full flex hover:shadow-xl cursor-pointer  break-all rounded-xl mx-auto group "
        onClick={onClick}
      >
        <div className="flex items-center">
          <div className="w-2 rounded-l-xl h-full bg-green-600 invisible group-hover:visible flex items-center justify-center"></div>
          <CardBody className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col grow justify-center w-full mr-6">
              <img
                src={blueprintImage}
                alt="Blueprint Image"
                className="w-[16rem] mx-auto"
              />
              <Typography
                color="blue-gray"
                className="text-center text-lg font-bold mt-1"
              >
                {project.name}
              </Typography>
              <Chip
                color={projectStatus !== 'Not Submitted' ? 'green' : 'gray'}
                size="sm"
                value={projectStatus}
                icon={
                  <span
                    className={`mx-auto mt-1.5 block h-2 w-2 rounded-full ${
                      projectStatus !== 'Not Submitted'
                        ? 'bg-green-900'
                        : 'bg-gray-900'
                    } content-['']`}
                  />
                }
                className="w-[8rem] mx-auto my-auto flex items-center"
              />
            </div>

            <div className="flex flex-col grow my-auto mt-6 lg:mt-0 w-[20rem]">
              <Typography
                color="blue-gray"
                className="text-center text-lg font-bold"
              >
                {hackathon.name}
              </Typography>

              <div className="mt-2 mb-4 border border-solid border-1 border-gray-200"></div>

              <div className="grid grid-rows-2 grid-flow-col gap-4">
                <div className="flex gap-2">
                  <MapPinIcon className="h-6 w-6 text-gray-600" />
                  <div>{hackathon.location}</div>
                </div>
                <div className="flex gap-2">
                  <CalendarDaysIcon className="h-6 w-6 text-gray-600" />
                  <div>
                    {convertStartTimeAndDeadlineToStringForInfoCard(
                      hackathon.start_time,
                      hackathon.deadline
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 border border-solid border-1 border-gray-200"></div>

              <div className=" flex justify-between gap-16 h-full mx-auto items-center mt-2">
                <Chip
                  color={
                    progressStatus !== 'hackathon has ended' ? 'green' : 'gray'
                  }
                  size="sm"
                  value={progressStatus}
                  icon={
                    <span
                      className={`mx-auto mt-1 block h-2 w-2 rounded-full ${
                        progressStatus !== 'hackathon has ended'
                          ? 'bg-green-900'
                          : 'bg-gray-900'
                      } content-['']`}
                    />
                  }
                />
              </div>
            </div>
          </CardBody>

          <div className="w-[2rem] rounded-r-xl h-full bg-green-600 invisible group-hover:visible flex items-center justify-center">
            <ChevronDoubleRightIcon className="h-6 w-6 text-white hidden group-hover:block group-hover:animate-bounce translate-x-6" />
          </div>
        </div>
      </Card>
    </>
  )
}
