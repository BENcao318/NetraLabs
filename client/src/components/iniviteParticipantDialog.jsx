import React, { useContext, useState } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import serverAPI from '../hooks/useAxios'
import { ToastContainer, toast } from 'react-toastify'
import { authContext } from 'context/authContext'
import { ProjectInvitationCard } from './projectInvitationCard'

export const IniviteParticipantDialog = ({
  open,
  handleOpen,
  user,
  projectList,
}) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const { auth } = useContext(authContext)

  const onSubmit = () => {
    if (selectedProject) {
      const invitationData = {
        projectId: selectedProject,
        participantId: user.id,
        userId: auth.user.id,
      }

      serverAPI
        .post('/projects/invite-participant', invitationData)
        .then((response) => {
          if (response.data.success) {
            toast.success(
              `An invitation has been successfully sent to ${user.firstName} ${user.lastName}`,
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
            handleOpen()
          } else {
            toast.warning(response.data.message, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
            console.log(response.data.success)
            console.log('first')
          }
          setSelectedProject(null)
        })
        .catch((err) => {
          console.log(err.message)
          toast.error(err.message, {
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
  }

  return (
    <Dialog open={open} handler={handleOpen} size="xl">
      <DialogHeader>Choose a project to invite</DialogHeader>
      <DialogBody divider className="max-h-[36rem] w-full overflow-auto">
        <div className="mx-auto h-full w-full flex flex-wrap gap-6 justify-center">
          {Array.isArray(projectList) && projectList.length !== 0 ? (
            projectList.map((project, key) => (
              <ul key={key}>
                <ProjectInvitationCard
                  projectData={project}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              </ul>
            ))
          ) : (
            <div className="text-center h-full w-full flex flex-col justify-center">
              <h1 className="text-2xl">You haven't created a team yet.</h1>
              <h1 className="text-2xl">
                Pelase go to your project and create a new team.
              </h1>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => {
            setSelectedProject(null)
            handleOpen()
          }}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onSubmit}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
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
    </Dialog>
  )
}
