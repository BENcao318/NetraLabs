import React, { useContext, useState } from 'react'
import { setOpenSidenav, useThemeController } from '../../context/themeContext'
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react'
import {
  Bars3Icon,
  BellIcon,
  ClockIcon,
  UserCircleIcon,
  PowerIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/authContext'
import { UserProfileImg } from '../../components/userProfileImg'

export const DashboardNavbar = () => {
  const [controller, dispatch] = useThemeController()
  const { openSidenav } = controller
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { auth } = useContext(authContext)

  console.log(auth)

  const closeProfileMenu = () => setIsProfileMenuOpen(false)

  const goToMyProfile = () => {
    navigate('/dashboard/profile')
    closeProfileMenu()
  }

  const signout = () => {
    console.log('signout')
  }

  const profileMenuItems = [
    {
      label: 'My Profile',
      icon: Cog6ToothIcon,
      action: goToMyProfile,
    },
    {
      label: 'Sign Out',
      icon: PowerIcon,
      action: signout,
    },
  ]

  return (
    <Navbar
      color="transparent"
      variant="gradient"
      className="sticky top rounded-lg transition-all px-0 py-0"
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
        <div className="flex items-center">
          <Menu
            open={isProfileMenuOpen}
            handler={setIsProfileMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto ring-1 ring-gray-300"
              >
                {auth.user.avatar ? (
                  <img className="w-12 h-12 mr-6" src={auth.user.avatar} />
                ) : (
                  <UserProfileImg
                    firstName={auth.user.firstName}
                    lastName={auth.user.lastName}
                    width={8}
                    height={8}
                  />
                )}

                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isProfileMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              {profileMenuItems.map(({ label, icon, action }, key) => {
                const isLastItem = key === profileMenuItems.length - 1
                return (
                  <MenuItem
                    key={label}
                    onClick={action}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                        : ''
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? 'red' : 'inherit'}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  )
}
