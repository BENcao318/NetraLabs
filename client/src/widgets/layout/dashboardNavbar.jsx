import React, { useCallback, useContext, useEffect, useState } from "react"
import { setOpenSidenav, useThemeController } from "../../context/themeContext"
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react"
import {
  Bars3Icon,
  BellIcon,
  ClockIcon,
  PowerIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../context/authContext"
import { UserProfileImg } from "../../components/userProfileImg"
import serverAPI from "../../hooks/useAxios"
import { InvitationNotificationDialog } from "components/invitationNotificationDialog"
import { timeAgo } from "helpers/util"

export const DashboardNavbar = () => {
  const [controller, dispatch] = useThemeController()
  const { openSidenav } = controller
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const { auth, setAuth } = useContext(authContext)
  const [
    openInvitationNotificationDialog,
    setOpenInvitationNotificationDialog,
  ] = useState(false)
  const [notification, setNotification] = useState(null)

  const closeProfileMenu = () => setIsProfileMenuOpen(false)

  const goToMyProfile = () => {
    navigate("/dashboard/profile")
    closeProfileMenu()
  }

  const signout = () => {
    serverAPI.get("/users/sign-out").then((response) => {
      if (response.data.success) {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          isLoggedIn: false,
          user: {},
        }))
        navigate("/")
      }
    })
  }

  const getNotificationList = useCallback(() => {
    if (auth.user && auth.user.email) {
      const userData = {
        userEmail: auth.user.email,
      }
      serverAPI
        .post("/users/notifications", userData)
        .then((response) => {
          if (response.data.success) {
            setNotifications((prev) => [...response.data.message2])
          }
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [auth.user.id])

  useEffect(() => {
    getNotificationList()
  }, [getNotificationList])

  const onClick = (data) => {
    setNotification(data)
    handleOpenInvitationNotificationDialog()
  }

  const handleOpenInvitationNotificationDialog = () =>
    setOpenInvitationNotificationDialog(!openInvitationNotificationDialog)

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: Cog6ToothIcon,
      action: goToMyProfile,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      action: signout,
    },
  ]

  return (
    <>
      <Navbar
        color="transparent"
        variant="gradient"
        className="top sticky rounded-lg px-0 py-0 transition-all"
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
              <Bars3Icon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
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
                  className="flex items-center gap-1 rounded-full py-1 pl-1 pr-2 ring-1 ring-gray-300 lg:ml-auto"
                >
                  {auth.user.avatar ? (
                    <img
                      className="mr-6 h-12 w-12"
                      src={auth.user.avatar}
                      alt="Avatar"
                    />
                  ) : (
                    <UserProfileImg
                      firstName={auth.user.firstName}
                      lastName={auth.user.lastName}
                      width={8}
                      height={8}
                      textSize={"lg"}
                    />
                  )}

                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
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
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `h-4 w-4 ${
                          isLastItem ? "text-red-500" : ""
                        }`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Menu>

            <div className="ml-6">
              <Menu>
                <MenuHandler>
                  <IconButton variant="text" color="blue-gray">
                    {notifications.length !== 0 &&
                      notifications.find(
                        (notification) => notification.viewed === false
                      ) && (
                        <span className="relative flex h-2 w-2  translate-x-4 translate-y-1">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                        </span>
                      )}

                    <BellIcon className="h-6 w-6 text-blue-gray-500" />
                  </IconButton>
                </MenuHandler>
                <MenuList className="w-max border-0">
                  {notifications.length !== 0 &&
                    notifications.map((notification) => {
                      return (
                        <MenuItem
                          className="flex items-center gap-3"
                          key={notification.invitationId}
                          onClick={() => onClick(notification)}
                        >
                          <div className="-mr-6">
                            {notification.inviterAvatar ? (
                              <img
                                className="h-8 w-8"
                                src={notification.inviterAvatar}
                              />
                            ) : (
                              <UserProfileImg
                                firstName={notification.inviterFirstName}
                                lastName={notification.inviterLastName}
                                width={8}
                                height={8}
                                textSize={"lg"}
                              />
                            )}
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-1 font-normal"
                            >
                              <strong>New Invitation</strong> from{" "}
                              {notification.inviterFirstName}{" "}
                              {notification.inviterLastName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center gap-1 text-xs font-normal opacity-60"
                            >
                              <ClockIcon className="h-3.5 w-3.5" />{" "}
                              {timeAgo(notification.createdAt)}
                            </Typography>
                          </div>
                        </MenuItem>
                      )
                    })}
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </Navbar>
      {notification && (
        <InvitationNotificationDialog
          open={openInvitationNotificationDialog}
          handleOpen={handleOpenInvitationNotificationDialog}
          notification={notification}
          setNotifications={setNotifications}
        />
      )}
    </>
  )
}
