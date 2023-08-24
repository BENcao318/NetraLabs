import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import React from 'react'

export const ConfirmSubmitProjectDialog = ({ open, handleOpen }) => {
  const onSubmit = () => {
    console.log('onSubmit')
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
