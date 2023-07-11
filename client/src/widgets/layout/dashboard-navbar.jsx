import React from 'react'
import { setOpenSidenav, useThemeController } from '../../context'
import {
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
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export const DashboardNavbar = () => {
  const [controller, dispatch] = useThemeController()
  const { openSidenav } = controller

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
        <div>Deadline</div>
        <div className="flex items-center">
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign In
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Chris B
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 16 minutes ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  )
}
