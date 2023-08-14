import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import React from 'react'
import { convertDateString } from '../helpers/util'
import serverAPI from '../hooks/useAxios'
import { toast } from 'react-toastify'

export const HackathonLaunchDialog = ({
  open,
  handleOpen,
  hackathon,
  setLaunched,
}) => {
  const handleSubmit = () => {
    serverAPI
      .post('/hackathons/launch', hackathon)
      .then((res) => {
        if (res) {
          handleOpen()
          toast.success(`${hackathon.name} is launched! 🚀🚀🚀 `, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setLaunched(true)
        }
      })
      .catch((err) => {
        console.log(err)
        handleOpen()
        toast.error(`Error launching hackthon. Please try again!`, {
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
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Launching Hackathon</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <h6 className="font-semibold text-xl mb-2 h-6 text-center">
            {hackathon.name}
          </h6>
          <div className="flex gap-4 mx-auto">
            <div>Time zone:</div>
            <div className="font-serif">{hackathon.time_zone.label}</div>
          </div>
          <div className="flex gap-4 mx-auto">
            <div>Start time:</div>
            <div className="font-serif">
              {convertDateString(hackathon.start_time)}
            </div>
          </div>
          <div className="flex gap-4 mx-auto">
            <div>End time:</div>
            <div className="font-serif">
              {convertDateString(hackathon.deadline)}
            </div>
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
