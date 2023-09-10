import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react"
import React, { useCallback, useContext } from "react"
import { convertDateString } from "../helpers/util"
import serverAPI from "../hooks/useAxios"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { authContext } from "context/authContext"

export const CreateNewTeamDialog = ({
  open,
  handleOpen,
  project,
  setProject,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required("A team name is needed to create your team"),
  })

  const { auth } = useContext(authContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    const teamData = {
      name: data.name,
      projectId: project.id,
      userEmail: auth.user.email,
    }

    serverAPI
      .post("/projects/create-new-team", teamData)
      .then((response) => {
        if (response) {
          handleOpen()
          toast.success(`${teamData.name} is created! 🚀🚀🚀 `, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          const newProject = { ...project, hasTeam: true }
          setProject(newProject)
        }
      })
      .catch((err) => {
        console.log(err)

        if (err.response.status === 400) {
          setError("name", {
            type: "manual",
            message: err.response.data.message,
          })
        } else {
          toast.error(`Error creating team. Please try again!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      })
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create a new team</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div>
            <label
              htmlFor="name"
              className="block text-sm italic text-gray-600"
            >
              Enter the name of your team.
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-white px-3 py-2 text-sm 
          focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
