import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { authContext } from 'context/authContext'
import serverAPI from 'hooks/useAxios'
import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export const InvitationNotificationDialog = ({
  open,
  handleOpen,
  notification,
  setNotifications,
}) => {
  const { auth } = useContext(authContext)

  const onSubmit = () => {
    const joinData = {
      userId: auth.user.id,
      invitationId: notification.invitationId,
    }

    serverAPI
      .post('/users/join-a-project', joinData)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setNotifications([])
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
    handleOpen()
  }

  const onIgnore = () => {
    const data = {
      userId: auth.user.id,
      invitationId: notification.invitationId,
    }

    serverAPI
      .post('/users/igonre-an-invitation', data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    handleOpen()
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader className="flex justify-center uppercase">
          Invitation
        </DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div className="text-center">
            <h1 className="text-lg text-gray-900">
              {notification.inviterFirstName} {notification.inviterLastName}{' '}
              asked you join the project team
            </h1>
            <p className="text-xs mt-2 text-gray-800">
              Click the JOIN THE TEAM button if agree to join
            </p>
          </div>
          <div className="mt-6">
            {/* <div className="">
              <h1>Project Name: </h1>
              <p>{notification.projectName}</p>
            </div> */}
            <table className=" text-left border-separate [border-spacing:0.75rem]">
              <tbody className="">
                <tr>
                  <td>
                    <h1 className="text-sm font-medium text-black font-roboto ">
                      Project:
                    </h1>
                  </td>
                  <td>
                    <p className="text-sm text-gray-600 font-normal font-roboto break-words overflow-hidden cursor-pointer hover:underline">
                      {notification.projectName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1
                      color="blue-gray"
                      className="text-sm font-medium text-black font-roboto "
                    >
                      Hackathon:
                    </h1>
                  </td>
                  <td>
                    <p className="text-sm text-gray-600 font-normal font-roboto break-words overflow-hidden cursor-pointer hover:underline">
                      {notification.hackathonName}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button variant="gradient" color="green" onClick={onSubmit}>
            <span>Join the team</span>
          </Button>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={onIgnore}
          >
            <span>ignore</span>
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
