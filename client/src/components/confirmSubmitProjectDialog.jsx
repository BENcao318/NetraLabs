import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import serverAPI from 'hooks/useAxios'
import React from 'react'
import { toast } from 'react-toastify'

export const ConfirmSubmitProjectDialog = ({
  open,
  handleOpen,
  projectId,
  auth,
  setProject,
}) => {
  const onSubmit = () => {
    console.log('onSubmit')
    console.log('onSubmit', projectId)
    const data = {
      userId: auth.user.id,
      projectId,
    }

    console.log(data)
    serverAPI.post('/projects/submit', data).then((response) => {
      if (response.data.success) {
        handleOpen()
        toast.success(`Your project is submitted. Good luck! 😊 `, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setProject((prev) => {
          return { ...prev, submitted: true }
        })
      } else {
        toast.warning(
          `Error submitting project. Please try again! ${response.data.message}`,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        )
      }
    })
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Submit this project</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div>
            <h1>Project will be visible to others once submitted</h1>
            <h1>You can still edit project after submission</h1>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
