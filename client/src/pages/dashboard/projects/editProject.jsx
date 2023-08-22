import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-tailwind/react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import options from 'data/options.json'
import { Quilleditor } from 'components/quilleditor'
import { useLocation, useNavigate } from 'react-router-dom'
import serverAPI from 'hooks/useAxios'
import userEvent from '@testing-library/user-event'
import { authContext } from 'context/authContext'

export const EditProject = () => {
  const { auth } = useContext(authContext)
  const [project, setProject] = useState(null)

  const schema = yup.object().shape({
    name: yup.string().required('Enter project name'),
    tagline: yup.string(),
    story: yup.string(),
    techStack: yup.array().of(
      yup.object().shape({
        value: yup.string().required('Please select a tag.'),
        label: yup.string().required('Please select a tag.'),
      })
    ),
    videoUrl: yup.string(),
    // .required('Please enter website'),
    repositoryUrl: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        {
          message: 'Enter correct url!',
          excludeEmptyString: true,
        }
      ),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const animatedComponents = makeAnimated()
  const storyEditorContent = watch('story')
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const projectId = queryParams.get('data')

  const onStoryEditorStateChange = (editorState) => {
    setValue('story', editorState)
  }

  const onSubmit = (data) => {
    const projectData = {
      projectData: projectId,
      userEmail: auth.user.email,
    }
    serverAPI
      .post('/projects/update-project', projectData)
      .then((response) => {
        navigate('/dashboard/team-project')
      })
      .catch((err) => console.log(err))
  }

  const onCancel = () => {
    navigate('/dashboard/team-project')
  }

  useEffect(() => {
    const projectData = {
      projectId: projectId,
      userEmail: auth.user.email,
    }
    serverAPI
      .post('/projects/get-project-data', projectData)
      .then((response) => setProject(response.data.message2))
      .catch((err) => console.log(err.message))
  }, [])

  console.log(project)

  useEffect(() => {
    if (project) {
      setValue('name', project.name)
      setValue('pitch', project.pitch)
      setValue('story', project.story)
      setValue('techStack', project.tech_stack)
      setValue('videoUrl', project.video_url)
      setValue('repositoryUrl', project.repository_url)
    }
  }, [setValue, project])

  return (
    <div className="flex p-6 h-full justify-between w-[60rem] mx-auto">
      <div className="flex flex-col gap-6 w-2/3">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold dark:text-white">
            Project name
          </h1>
          <label htmlFor="name" className="text-sm text-gray-600 italic block">
            Enter the name of your project.
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold dark:text-white">
            Project pitch/tagline
          </h1>
          <label
            htmlFor="tagline"
            className="text-sm text-gray-600 italic block"
          >
            Create a pitch or tagline for your project.
          </label>
          <input
            {...register('tagline')}
            type="text"
            id="tagline"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          {errors.tagline && (
            <p className="text-red-500">{errors.tagline.message}</p>
          )}
        </div>
        <div name="hackathon_description" className="flex flex-col gap-1">
          <h1 className=" text-lg font-semibold dark:text-white">
            Project Story
          </h1>
          <label
            htmlFor="description"
            className="text-sm text-gray-600 italic block"
          >
            Please write down the story of the project, what it does, how did
            you build your project, what challenges you faced, what you learned,
            accomplishments that you're proud of, what's next for your project
          </label>
          <Quilleditor
            value={storyEditorContent}
            onChange={onStoryEditorStateChange}
            id="story"
          />
          <p className="mt-16 text-red-600">
            {errors.story && "Can't be blank"}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold dark:text-white">Tech stack</h1>
          <label
            htmlFor="techStack"
            className="text-sm text-gray-600 italic block"
          >
            What languages, frameworks, databases did you use?
          </label>
          <Controller
            name="techStack"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  isMulti
                  options={options}
                  placeholder="Select tags..."
                  components={animatedComponents}
                />
                <p className="mt-2 text-red-600">
                  {errors.techStack && "Can't be blank"}
                </p>
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold dark:text-white">
            Repository link
          </h1>
          <label
            htmlFor="repositoryUrl"
            className="text-sm text-gray-600 italic block"
          >
            Add link for your project repo
          </label>
          <input
            {...register('repositoryUrl')}
            type="text"
            id="repositoryUrl"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          {errors.repositoryUrl && (
            <p className="text-red-500">{errors.repositoryUrl.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold dark:text-white">Video link</h1>
          <label
            htmlFor="videoUrl"
            className="text-sm text-gray-600 italic block"
          >
            This video is needed for your project story.
          </label>
          <input
            {...register('videoUrl')}
            type="text"
            id="videoUrl"
            placeholder="Youtube or Vimeo video URL"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          {errors.videoUrl && (
            <p className="text-red-500">{errors.videoUrl.message}</p>
          )}
        </div>

        <div className="flex items-center gap-6 w-full justify-center">
          <Button className="w-20 self-center" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <a
            className="font-medium text-red-600 hover:underline cursor-pointer text-center"
            onClick={onCancel}
          >
            Cancel
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">My team</h1>
        <p>Test members</p>
        <Button>Add new teammate</Button>
      </div>
    </div>
  )
}
