import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'
import React from 'react'
import { convertDateString } from '../helpers/util'
import { Link } from 'react-router-dom'

export const HackathonInfoCard = ({ hackathon }) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const TABLE_ROWS = [
    {
      name: 'Tagline:',
      content: hackathon.tagline,
    },
    {
      name: 'Email:',
      content: hackathon.manager_email,
    },
    {
      name: 'Time zone:',
      content: Object.values(JSON.parse(hackathon.time_zone))[0],
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

  return (
    <>
      <Card className="w-[36rem] flex flex-col outline outline-2 outline-offset-2 outline-gray-600 hover:shadow-xl">
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
          <table className="w-full min-w-max table-auto text-left">
            <tbody>
              {TABLE_ROWS.map(({ name, content }, index) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

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
                        className="font-normal font-serif text-md"
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
            <Button className="rounded-lg">Preview</Button>
            <a className="font-medium text-blue-600 hover:underline cursor-pointer text-center">
              Edit
            </a>
          </div>

          <Button className="rounded-full bg-orange-300 hover:-translate-y-1 text-gray-800 font-semibold">
            Launch
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
