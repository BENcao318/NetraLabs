import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import React from 'react'
import { convertDateString } from '../helpers/util'

export const HackathonLaunchDialog = ({ open, handleOpen, hackathon }) => {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Launching Hackathon</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <h6 className="font-semibold text-lg mb-2 h-6 text-center">
            {hackathon.name}
          </h6>
          <div className="flex gap-4 ">
            <div className="font-semibold">Time zone:</div>
            {hackathon.time_zone.label}
          </div>
          <div className="flex gap-4">
            <div className="font-semibold">Start time:</div>
            {convertDateString(hackathon.start_time)}
          </div>
          <div className="flex gap-4">
            <div className="font-semibold">End time:</div>
            {convertDateString(hackathon.deadline)}
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
