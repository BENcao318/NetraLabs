import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'
import React from 'react'

export const HackathonInfoCard = ({ hackathon }) => {
  return (
    <>
      <Card className="w-96">
        <CardBody>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-center"
          >
            {hackathon.name}
          </Typography>
          <Typography className="flex gap-4">
            <p className="font-semibold">Email: </p>
            <p>{hackathon.manager_email}</p>
          </Typography>
          <Typography className="flex gap-4">
            <p className="font-semibold">Time zone: </p>
            <p>{hackathon.time_zone}</p>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter>
      </Card>
    </>
  )
}
