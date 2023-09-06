import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
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

export const LaunchedHackathonInfoCard = ({ hackathon, navigation }) => {
  const { auth } = useContext(authContext)
  const navigate = useNavigate()
  const [progressStatus, setProgressStatus] = useState('')

  const onClick = () => {
    if (navigation === 'hackathon') {
      navigate(`/dashboard/hackathons/detail/?data=${hackathon.id}`)
    } else if (navigation === 'submissions') {
      navigate(
        `/dashboard/submissions/list/?id=${hackathon.id}&name=${hackathon.name}`
      )
    }
  }

  useEffect(() => {
    if (hackathon) {
      setProgressStatus(
        calculateDaysForHackathon(
          hackathon.start_time,
          hackathon.deadline,
          auth.timeZone ? auth.timeZone : hackathon.time_zone.value
        )
      )
    }
  }, [hackathon, setProgressStatus])

  return (
    <>
      <Card
        className="w-[30rem] h-full flex flex-col hover:shadow-xl cursor-pointer border hover:border-t-4 hover:border-green-600 hover:border-b-8  break-all rounded-md"
        onClick={onClick}
      >
        <CardBody className="flex flex-col">
          <div>
            <Typography
              color="blue-gray"
              className="text-center text-lg font-bold"
            >
              {hackathon.name}
            </Typography>
          </div>
          <div className="mt-2 mb-4 border border-solid border-1 border-gray-200"></div>

          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex gap-2">
              <TrophyIcon className="h-6 w-6 text-gray-600" />
              <div>{`$ ${calculateTotalPrize(
                hackathon.prizes
              )} in prizes`}</div>
            </div>
            <div className="flex gap-2">
              <GlobeAltIcon className="h-6 w-6 text-gray-600" />
              <div>{hackathon.time_zone.value}</div>
            </div>
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
        </CardBody>
        <CardFooter className="pt-0 flex justify-between gap-16 h-full mx-auto px-12 items-center -my-2">
          <Chip
            color={progressStatus !== 'hackathon has ended' ? 'green' : 'gray'}
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

          <div className="flex gap-2">
            <BuildingOffice2Icon className="h-6 w-6 text-gray-500" />
            <p>{hackathon.company}</p>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
