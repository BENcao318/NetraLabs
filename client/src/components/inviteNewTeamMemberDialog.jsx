import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import React, { useContext } from 'react'
import { convertDateString } from '../helpers/util'
import serverAPI from '../hooks/useAxios'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authContext } from 'context/authContext'

export const InviteNewTeamMemberDialog = ({
  open,
  handleOpen,
  project,
  setProject,
}) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email form')
      .required('Email is required'),
  })

  const { auth } = useContext(authContext)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    console.log(data)
    serverAPI.post('/projects/invite-new-member', data).then((response) => {
      console.log(response.data)
    })

    handleOpen()
    reset()
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Invite a new team member</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div>
            <label
              htmlFor="email"
              className="text-sm text-gray-600 italic block"
            >
              Enter the email address, and we will send an invite to the person.
            </label>
            <input
              {...register('email')}
              type="text"
              id="email"
              className="mt-2 w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
            focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
