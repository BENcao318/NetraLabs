import { PlusCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { Button, Card, Typography } from '@material-tailwind/react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const CreateAHackathonCard = () => {
  const navigate = useNavigate()

  const directToCreationPage = () => {
    navigate('/dashboard/hackathon/new')
  }

  return (
    <>
      <Card
        className="w-[30rem] min-h-[20rem] flex flex-col outline outline-2 outline-offset-2 outline-gray-600 hover:shadow-xl hover:scale-105 items-center justify-center group cursor-pointer hover:bg-orange-50 "
        onClick={directToCreationPage}
      >
        <PlusCircleIcon className="w-16 h-16 text-gray-600 group-hover:text-gray-800" />
        <Typography className="font-semibold text-gray-600 uppercase text-3xl  group-hover:text-gray-800">
          Create A Hackathon
        </Typography>
      </Card>
    </>
  )
}
