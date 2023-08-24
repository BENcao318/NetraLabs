import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { convertDateString } from '../helpers/util'
import serverAPI from '../hooks/useAxios'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authContext } from 'context/authContext'
import { ProjectInvitationCard } from './projectInvitationCard'

export const IniviteParticipantDialog = ({ open, handleOpen, user }) => {
  const { auth } = useContext(authContext)
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectList, setProjectList] = useState([])

  const getProjectList = useCallback(() => {
    const userData = {
      userEmail: auth.user.email,
    }

    serverAPI
      .post('/projects/list', userData)
      .then((response) => {
        setProjectList(response.data.message2)
      })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    getProjectList()
  }, [setProjectList])

  const onSubmit = () => {
    if (selectedProject) {
      const invitationData = {
        projectId: selectedProject,
        participantId: user.id,
        userEmail: auth.user.email,
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
          toast.error(`Error creating team. Please try again!`, {
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
              <h1 className="text-2xl">
                You haven't created any projects yet.
              </h1>
              <h1 className="text-2xl">
                Pelase go to Hackathons page and create a new project.
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
