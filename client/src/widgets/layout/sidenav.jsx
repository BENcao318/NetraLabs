import React from 'react'
import { setOpenSidenav, useThemeController } from '../../context/themeContext'
import { Link, NavLink } from 'react-router-dom'
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const Sidenav = ({ brandImg, brandName, routes }) => {
  const [controller, dispatch] = useThemeController()
  const { sidenavColor, sidenavType, openSidenav } = controller
  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-blue-gray-800 to-blue-gray-900',
    white: 'bg-white shadow-lg',
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 h-100vh w-72 transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === 'dark' ? 'border-white/20' : 'border-blue-gray-50'
        }`}
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
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
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
                        className={isActive ? 'text-orange-600' : 'text-white'}
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
            ))}
          </ul>
        ))}
      </div>
    </aside>
  )
}
