import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { convertDateString } from '../helpers/util'
import { Link, useNavigate } from 'react-router-dom'
import { HackathonPreview } from './hackathonPreview'
import { HackathonLaunchDialog } from './hackathonLaunchDialog'

export const HackathonInfoCard = ({ hackathon }) => {
  const [openHackathonPreview, setOpenHackathonPreview] = useState(false)
  const [openLaunchDialog, setOpenLaunchDialog] = useState(false)
  const [launched, setLaunched] = useState(false)

  const handleOpenHackathonPreview = () =>
    setOpenHackathonPreview(!openHackathonPreview)
  const handleOpenLaunchDialog = () => setOpenLaunchDialog(!openLaunchDialog)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const TABLE_ROWS = [
    // {
    //   name: 'Tagline:',
    //   content: hackathon.tagline,
    // },
    {
      name: 'Email:',
      content: hackathon.manager_email,
    },
    {
      name: 'Time zone:',
      content: Object.values(hackathon.time_zone)[0],
    },
    {
      name: 'Start time:',
      content: convertDateString(hackathon.start_time, options),
    },
    {
      name: 'Deadline:',
      content: convertDateString(hackathon.deadline, options),
    },
  ]

  const navigate = useNavigate()

  const onClick = () => {
    navigate(
      `/dashboard/hackathon/update/?data=${encodeURIComponent(
        JSON.stringify(hackathon)
      )}`
    )
  }

  useEffect(() => {
    setLaunched(hackathon.launched)
  }, [setLaunched, hackathon])

  return (
    <>
      <Card className="w-[30rem] flex flex-col outline outline-2 outline-offset-2 outline-gray-600 hover:shadow-xl break-all">
        <CardBody className="flex flex-col">
          <div>
            <Typography
              color="blue-gray"
              className="mb-2 text-center text-lg font-bold"
            >
              {hackathon.name}
            </Typography>
          </div>
          <div className="border border-solid border-1 border-gray-400"></div>
          <table className="w-full min-w-max text-left">
            <tbody>
              {TABLE_ROWS.map(({ name, content }, index) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50l'

                return (
                  <tr key={name} className="even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal font-roboto"
                      >
                        {content}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between mx-12">
          <div className="flex gap-6 items-center">
            <Button onClick={handleOpenHackathonPreview} className="rounded-lg">
              Preview
            </Button>
            <a
              className="font-medium text-blue-600 hover:underline cursor-pointer text-center"
              onClick={onClick}
            >
              Edit
            </a>
          </div>
          {launched ? (
            <div className="flex uppercase items-center font-bold text-green-600">
              launched
            </div>
          ) : (
            <Button
              className="rounded-full bg-orange-300 hover:-translate-y-1 text-gray-800 font-semibold"
              onClick={handleOpenLaunchDialog}
            >
              Launch
            </Button>
          )}
        </CardFooter>
      </Card>

      <HackathonPreview
        open={openHackathonPreview}
        handleOpen={handleOpenHackathonPreview}
        hackathon={hackathon}
      />
      <HackathonLaunchDialog
        open={openLaunchDialog}
        handleOpen={handleOpenLaunchDialog}
        hackathon={hackathon}
        setLaunched={setLaunched}
      />
    </>
  )
}
