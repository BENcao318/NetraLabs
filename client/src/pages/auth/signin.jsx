import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import serverAPI from '../../hooks/useAxios'
import { authContext } from '../../context/authContext'

export const SignIn = () => {
  const { setAuth } = useContext(authContext)
  const navigate = useNavigate()
  //todo Add forget password feature.

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    serverAPI.post('/users/sign-in', data).then((response) => {
      if (!response.data.success) {
        setError('email', {
          type: 'manual',
          message: response.data.message2,
        })
      } else {
        console.log(response.data.user)
        setAuth((prev) => ({
          ...prev,
          isLoggedIn: true,
          user: response.data.user,
        }))
        navigate('/dashboard ')
        // toast.success(`Signed in. Welcome! 😊`, {
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // })
      }
    })
    // reset();
  }

  const adminSignIn = () => {
    const data = {
      email: 'benc.netrascale@gmail.com',
      password: 'admin123',
    }
    serverAPI.post('/users/sign-in', data).then((response) => {
      if (!response.data.success) {
        setError('email', {
          type: 'manual',
          message: response.data.message2,
        })
      } else {
        console.log(response.data.user)
        setAuth((prev) => ({
          ...prev,
          isLoggedIn: true,
          user: response.data.user,
        }))
        navigate('/dashboard ')
        // toast.success(`Signed in. Welcome! 😊`, {
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // })
      }
    })
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 ">
            <CardHeader
              variant="gradient"
              className="flex justify-center gap-2 py-6 px-6 bg-gray-800"
            >
              <Avatar src={'../img/brandImg.png'} size="sm" />
              <Typography variant="h4" color={'white'} className=" text-center">
                {'NetraLabs'}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                size="lg"
                error={errors.email === undefined ? false : true}
                {...register('email')}
              />
              <p
                className={`-mt-2  text-red-600 ml-2 ${
                  errors.email ? 'block' : 'hidden'
                }`}
              >
                {errors.email?.message}
              </p>
              <Input
                type="password"
                label="Password"
                size="lg"
                error={errors.password === undefined ? false : true}
                {...register('password')}
              />
              <p
                className={`-mt-2  text-red-600 ml-2 ${
                  errors.password ? 'block' : 'hidden'
                }`}
              >
                {errors.password?.message}
              </p>
            </CardBody>
            <CardFooter className="pt-0">
              <Button fullWidth className="bg-orange-600 text-sm" type="submit">
                Sign In
              </Button>
              {/* <Button
                fullWidth
                className="bg-orange-600 text-sm"
                onClick={adminSignIn}
              >
                Admin Sign In
              </Button> */}
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}
