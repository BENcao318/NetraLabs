import {
  Button,
  Card,
  CardBody,
  CardFooter,
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

export const SignUp = () => {
  const { setAuth } = useContext(authContext)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(16, 'Password cannot exceed more than 12 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(16, 'Password cannot exceed more than 12 characters')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      name: data.name,
      password: data.password,
    }

    serverAPI
      .post('/users/sign-on', userData)
      .then((response) => {
        if (response && response.data.success) {
          setAuth((prev) => ({
            ...prev,
            isLoggedIn: true,
            isLoading: false,
            user: response.data.user,
          }))
          navigate('/dashboard/hackathons')
          console.log('yes')
          // toast.success(`Signed in. Welcome! 😊`, {
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // })
        }
      })
      .catch((err) => {
        // Same email address already in database, signup failed and set error on submit form
        if (err && err.response.status === 403) {
          setError('email', {
            type: 'manual',
            message: err.response.data.message,
          })
        }
      })
    // reset();
  }

  return (
    <>
      <img
        src="https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxMTE4Mjc2fA&force=true&w=1920"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[36rem] -translate-y-2/4 -translate-x-2/4 p-6">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h5" color="blue-gray">
                Sign Up
              </Typography>
              <Typography className="mb-2">
                To join conferences or participate in new hackathons, please
                fill out the registration form.
              </Typography>
              <Input
                type="text"
                label="Name"
                size="lg"
                error={errors.name === undefined ? false : true}
                {...register('name')}
              />
              <p
                className={`-mt-2 text-red-600 ml-2 ${
                  errors.name ? 'block' : 'hidden'
                }`}
              >
                {errors.name?.message}
              </p>
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
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                error={errors.confirmPassword === undefined ? false : true}
                {...register('confirmPassword')}
              />
              <p
                className={`-mt-2  text-red-600 ml-2 ${
                  errors.confirmPassword ? 'block' : 'hidden'
                }`}
              >
                {errors.confirmPassword?.message}
              </p>
            </CardBody>

            <CardFooter className="pt-0">
              <Button fullWidth className="bg-orange-600 text-sm" type="submit">
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign In
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </form>
        //todo add pagination for account profile
      </div>
    </>
  )
}
