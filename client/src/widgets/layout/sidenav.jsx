import React, { useContext, useEffect, useState } from 'react'
import { setOpenSidenav, useThemeController } from '../../context/themeContext'
import { Link, NavLink } from 'react-router-dom'
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { authContext } from '../../context/authContext'
import { CubeTransparentIcon } from '@heroicons/react/24/solid'
import netrachainImg from '../../img/NetraChain.png'

export const Sidenav = ({ brandImg, brandName, routes }) => {
  const [controller, dispatch] = useThemeController()
  const { sidenavColor, sidenavType, openSidenav } = controller
  const [dashboardLayout, setDashboardLayout] = useState('userDashboard')
  const { auth } = useContext(authContext)
  const [open, setOpen] = useState(0)
  const [openAlert, setOpenAlert] = useState(true)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  useEffect(() => {
    setDashboardLayout(auth.user.isAdmin ? 'adminDashboard' : 'userDashboard')
  }, [auth])

  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-blue-gray-800 to-blue-gray-900',
    white: 'bg-white shadow-lg',
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-40 h-100vh w-72 transition-transform duration-300 xl:translate-x-0 flex flex-col justify-between`}
    >
      <div
        className={`relative border-b ${
          sidenavType === 'dark' ? 'border-white/20' : 'border-blue-gray-50'
        } mt-4`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h4"
            color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {pages.map(
              ({ icon, name, path }) =>
                layout === dashboardLayout && (
                  <li key={name}>
                    <NavLink to={`/${'dashboard'}${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? 'gradient' : 'text'}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === 'dark'
                              ? 'white'
                              : 'blue-gray'
                          }
                          className="flex items-center gap-4 px-4 capitalize rounded-full"
                          fullWidth
                        >
                          <div
                            className={
                              isActive ? 'text-orange-600' : 'text-white'
                            }
                          >
                            {icon}
                          </div>
                          <Typography
                            color={isActive ? 'orange' : 'white'}
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        ))}
      </div>
      <Card className="mt-auto mx-4 mb-4">
        <CardBody className="flex flex-col">
          <a href="https://www.netrascale.com/">
            <img src={netrachainImg} className="w-3/4 h-3/4 mx-auto" />
          </a>
          <Typography variant="h6" className="mb-1 mt-2 text-center">
            Join NetraChain for more
          </Typography>
          <Typography variant="small" className="font-normal opacity-80">
            We empower you with game-changing R&D projects, hackathons, design
            thinking labs and global connections that drive innovation, while
            genuinely acknowledging and addressing the challenges you encounter.
          </Typography>
          <div className="mt-4 flex mx-auto">
            <Typography
              as="a"
              href="https://www.netrascale.com/"
              variant="small"
              className="font-medium"
            >
              Go to NetraChain
            </Typography>
          </div>
        </CardBody>
      </Card>
    </aside>
  )
}
