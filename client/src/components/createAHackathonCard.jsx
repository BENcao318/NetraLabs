import { PlusCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const CreateAHackathonCard = () => {
  return (
    <>
      <NavLink to={'/dashboard/hackathon/new'}>
        <Button
          className="flex items-center gap-4 px-4 capitalize rounded-full bg-orange-600"
          fullWidth
        >
          <PlusCircleIcon className="w-6 h-6 text-gray-800" />
          <Typography className="font-semibold text-gray-800 uppercase">
            Create A Hackathon
          </Typography>
        </Button>
      </NavLink>
    </>
  )
}
