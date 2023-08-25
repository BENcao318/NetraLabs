import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { UserProfileImg } from '../../components/userProfileImg'
import serverAPI from '../../hooks/useAxios'
import { authContext } from '../../context/authContext'
import { UploadAvatar } from '../../components/uploadAvatar'
import { ToastContainer, toast } from 'react-toastify'
import { CheckboxList } from '../../components/checkboxList'
import options from '../../data/options.json'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'

export const Profile = () => {
  const { auth, setAuth } = useContext(authContext)
  const [selectedSpecialtyItem, setSelectedSpecialtyItem] = useState('')
  const [openAvatarEditor, setOpenAvatarEditor] = useState(false)
  const [preview, setPreview] = useState(null)
  const [avatarImg, setAvatarImg] = useState(null)
  const animatedComponents = makeAnimated()

  const schema = yup.object().shape({
    firstName: yup.string().required('Enter first name'),
    lastName: yup.string().required('Enter last name'),
    techStack: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required('Please select a tag.'),
          label: yup.string().required('Please select a tag.'),
        })
      )
      .required(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleOpenAvatarEditor = () => setOpenAvatarEditor(!openAvatarEditor)
  const handleConfirmAvatarEditor = () => {
    setAvatarImg(preview)
    handleOpenAvatarEditor()
  }

  const navigate = useNavigate()

  const onSubmit = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: avatarImg ? avatarImg : auth.user.avatar,
      role: selectedSpecialtyItem,
      skills: data.techStack,
    }

    serverAPI.post('/users/update-user-data', userData).then((response) => {
      if (response.data.success) {
        setAuth((prev) => ({
          ...prev,
          user: response.data.userData,
        }))
        toast.success(`Success! Updated user data😊`, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    })
  }

  const removeAvatar = () => {
    setAvatarImg(null)
    const user = { ...auth.user, avatar: null }
    setAuth((prev) => ({
      ...prev,
      user,
    }))
  }

  const onCancel = () => {
    serverAPI.get('/me').then((response) => {
      if (response.data.success) {
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          isLoggedIn: true,
          user: response.data.user,
        }))
      } else {
        navigate('/auth/sign-in')
      }
    })
    navigate('/dashboard/hackathons')
  }

  const checkboxList = [
    { value: 'Full-stack developer', label: 'Full-stack developer' },
    { value: 'Front-end developer', label: 'Front-end developer' },
    { value: 'Back-end developer', label: 'Back-end developer' },
    { value: 'UI Designer', label: 'UI Designer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'Business Manager', label: 'Business Manager' },
  ]

  useEffect(() => {
    if (auth.user) {
      setValue('firstName', auth.user.firstName)
      setValue('lastName', auth.user.lastName)
      setSelectedSpecialtyItem(auth.user.role)
      setValue('techStack', auth.user.skills)
    }
  }, [auth.user])

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
            {!avatarImg &&
              (auth.user.avatar ? (
                <img className="w-20 h-20" src={auth.user.avatar} />
              ) : (
                <UserProfileImg
                  firstName={auth.user.firstName}
                  lastName={auth.user.lastName}
                  width={20}
                  height={20}
                  textSize={'xl'}
                />
              ))}
            {avatarImg && <img className="w-20 h-20" src={avatarImg} />}
            <div className="flex flex-col justify-between items-center h-full gap-6">
              <a
                onClick={handleOpenAvatarEditor}
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

        <div className="flex flex-col mt-6">
          <h1 className="text-lg font-medium dark:text-white mb-2">
            Your Specialties
          </h1>
          <div>
            <CheckboxList
              list={checkboxList}
              selectedItem={selectedSpecialtyItem}
              setSelectedItem={setSelectedSpecialtyItem}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-6">
          <h1 className="text-lg font-medium dark:text-white">Tech stack</h1>
          <label
            htmlFor="techStack"
            className="text-sm text-gray-600 italic block"
          >
            What languages, frameworks, databases are you good at?
          </label>
          <Controller
            name="techStack"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  isMulti
                  options={options}
                  placeholder="Select tags..."
                  components={animatedComponents}
                  className="w-full max-w-[40rem]"
                />
                <p className="mt-2 text-red-600">
                  {errors.techStack && "Can't be blank"}
                </p>
              </>
            )}
          />
        </div>
      </div>

      <div className="flex mx-auto items-center gap-6 mt-12 w-full justify-center">
        <Button
          type="submit"
          className="w-20 self-center"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <a
          className="font-medium text-red-600 hover:underline cursor-pointer text-center"
          onClick={onCancel}
        >
          Cancel
        </a>
      </div>

      <Dialog open={openAvatarEditor} handler={handleOpenAvatarEditor}>
        <DialogHeader>Set and Upload your customized avatar.</DialogHeader>
        <DialogBody divider>
          <UploadAvatar setPreview={setPreview} preview={preview} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenAvatarEditor}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmAvatarEditor}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={3600}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}
