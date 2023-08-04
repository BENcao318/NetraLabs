import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div>
      landingPage
      <Button>Signin</Button>
      <Link to="/auth/sign-in">
        <Typography
          as="span"
          variant="small"
          color="blue"
          className="ml-1 font-bold"
        >
          Sign in
        </Typography>
      </Link>
    </div>
  )
}
