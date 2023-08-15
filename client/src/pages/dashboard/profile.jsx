import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { UserProfileImg } from '../../components/userProfileImg'
import serverAPI from '../../hooks/useAxios'
import { authContext } from '../../context/authContext'

export const Profile = () => {
  const [user, setUser] = useState(null)
  const { auth } = useContext(authContext)

  const schema = yup.object().shape({
    firstName: yup.string().required('Enter first name'),
    lastName: yup.string().required('Enter last name'),
    // story: yup.string().required(),
    // techStack: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       value: yup.string().required('Please select a tag.'),
    //       label: yup.string().required('Please select a tag.'),
    //     })
    //   )
    //   .required(),
    // videoUrl: yup
    //   .string()
    //   .url('Invalid URL format.')
    //   .required('Please enter website'),
    // repositoryUrl: yup
    //   .string()
    //   .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     'Enter correct url!'
    //   ),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const navigate = useNavigate()

  const onSubmit = (data) => {
    // console.log(data)
    const name = {
      firstName: 'Ben',
      lastName: 'Cao',
    }
    serverAPI.post('/users/create-photo', name).then((response) => {
      setUser(response.data.message2)
      // console.log('first')
    })
  }

  const replaceAvatar = () => {}
  const removeAvatar = () => {}

  // console.log(user.data)

  return (
    <>
      <div className="flex flex-col w-[60rem] mx-auto h-full mt-16">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <div className="border border-solid border-1 border-gray-200 mt-6"></div>
        <div className="flex w-full gap-20 mt-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium dark:text-white">First name</h1>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-md 
          focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue-800"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium dark:text-white">Last name</h1>
            <input
              {...register('lastName')}
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-md 
          focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue-800"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <h1 className="text-lg font-medium dark:text-white mb-2">Avatar</h1>
          <div className="flex gap-6 items-center">
            {auth.user.avatar ? (
              <img
                className="w-20 h-20"
                src={`data:image/png;base64,${btoa(
                  String.fromCharCode(...auth.user.avatar.data)
                )}`}
              />
            ) : (
              <UserProfileImg
                firstName={auth.user.firstName}
                lastName={auth.user.lastName}
                width={20}
                height={20}
              />
            )}
            <div className="flex flex-col justify-between items-center h-full gap-6">
              <a
                onClick={replaceAvatar}
                className="font-semibold  dark:text-blue-600 text-blue-600 cursor-pointer"
              >
                Replace Avatar
              </a>
              <a
                onClick={removeAvatar}
                className="  dark:text-blue-600 text-blue-600 cursor-pointer"
              >
                Remove Avatar
              </a>
            </div>
          </div>
        </div>

        <div className="flex mx-auto items-center gap-12 mt-36">
          <Button
            type="submit"
            className="w-20 self-center"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <a
            className="font-medium text-red-600 hover:underline cursor-pointer text-center"
            onClick={() => navigate('/dashboard/hackathons')}
          >
            Cancel
          </a>
        </div>
      </div>
    </>
  )
}
