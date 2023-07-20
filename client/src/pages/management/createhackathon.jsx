import React, { useCallback, useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@material-tailwind/react'
import { Quilleditor } from '../../components/quilleditor'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import serverAPI from '../../hooks/useAxios'

export const Createhackathon = () => {
  const schema = yup.object().shape({
    hackathonName: yup.string().required(),
    hackathonTagline: yup.string().required(),
    hackathonEmail: yup.string().email().required(),
    hackathonLocation: yup.string().required(),
    description: yup.string().min(8).required(),
    requirements: yup.string().min(8).required(),
    rules: yup.string().min(8).required(),
    startDate: yup.date().required('Start date is needed for hackathon'),
    endDate: yup
      .date()
      .min(yup.ref('startDate'), 'End date need to be later')
      .required('End date is needed for hackathon'),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    register('description')
    register('requirements')
    register('rules')
    register('resources')
  }, [register])

  const onDescriptionEditorStateChange = (editorState) => {
    setValue('description', editorState)
  }

  const onRequirementsEditorStateChange = (editorState) => {
    setValue('requirements', editorState)
  }

  const onRulesEditorStateChange = (editorState) => {
    setValue('rules', editorState)
  }

  const onResourcesEditorStateChange = (editorState) => {
    setValue('resources', editorState)
  }

  const onJudgesEditorStateChange = (editorState) => {
    setValue('judges', editorState)
  }

  const onSubmit = (data) => {
    serverAPI
      .post('/hackathons/new', {
        hackathonData: data,
      })
      .then((res) => [console.log(res)])
  }

  const descriptionEditorContent = watch('description')
  const requirementsEditorContent = watch('requirements')
  const rulesEditorContent = watch('rules')
  const resourcesEditorContent = watch('resources')
  const judgesEditorContent = watch('judges')

  const testContent = '<p><strong>123456</strong></p>'

  useEffect(() => {
    if (testContent) {
      setValue('description', testContent)
    }
  }, [testContent])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 w-[80rem] mx-auto">
        <div name="hackathon_name">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Hackathon name
          </h1>
          <label htmlFor="name" className="text-sm text-gray-600 italic block">
            Enter the name of your hackathon.
          </label>
          <input
            {...register('hackathonName')}
            type="text"
            id="hackathon_name"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.hackathonName && 'Name of the hackathon is required'}
          </p>
        </div>
        <div name="hackathon_tagline">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Tagline
          </h1>
          <label
            htmlFor="tagline"
            className="text-sm text-gray-600 italic block"
          >
            Create a tagline for the hackathon.
          </label>
          <input
            {...register('hackathonTagline')}
            type="text"
            id="tagline"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.hackathonTagline && 'Tagline of the hackathon is required'}
          </p>
        </div>
        <div name="hoster_email">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Contact email
          </h1>
          <label
            htmlFor="manager_email"
            className="text-sm text-gray-600 italic block"
          >
            The participants can use this email to contact the manager of the
            hackathon.
          </label>
          <input
            {...register('hackathonEmail')}
            type="email"
            id="manager_email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.hackathonEmail &&
              'A proper email address of the host is required'}
          </p>
        </div>
        <div name="hackathon_location">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Location
          </h1>
          <label
            htmlFor="location"
            className="text-sm text-gray-600 italic block"
          >
            The participants can use this email to contact the manager of the
            hackathon.
          </label>
          <input
            {...register('hackathonLocation')}
            type="text"
            id="location"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.hackathonLocation && 'Address of the hackathon is required'}
          </p>
        </div>
        <div name="hackathon_description">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Main Description
          </h1>
          <label
            htmlFor="description"
            className="text-sm text-gray-600 italic block"
          >
            Description of the hackathon. e.g. Introduction, about the company,
            schedules.
          </label>
          <Quilleditor
            value={descriptionEditorContent}
            onChange={onDescriptionEditorStateChange}
            id="description"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.description && 'The hackathon description must be edited'}
          </p>
        </div>
        <div name="hackathon_requirements">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Requirements
          </h1>
          <label
            htmlFor="requirements"
            className="text-sm text-gray-600 italic block"
          >
            Requirements for building the hackathon project and what the
            participants needed when submitting.
          </label>
          <Quilleditor
            value={requirementsEditorContent}
            onChange={onRequirementsEditorStateChange}
            id="requirements"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.requirements && 'The hackathon requirements must be edited'}
          </p>
        </div>
        <div name="hackathon_rules">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">Rules</h1>
          <label htmlFor="rules" className="text-sm text-gray-600 italic block">
            Rules of the contest. Inculding legal requirements and code of
            conduct.
          </label>
          <Quilleditor
            value={rulesEditorContent}
            onChange={onRulesEditorStateChange}
            id="rules"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.rules && 'The hackathon rules must be edited'}
          </p>
        </div>
        <div name="hackathon_resources">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Resources
          </h1>
          <label
            htmlFor="resources"
            className="text-sm text-gray-600 italic block"
          >
            Resources for the hackathon that can be helpful for participants.
            e.g. technical support tools, links, additional documents, etc.
          </label>
          <Quilleditor
            value={resourcesEditorContent}
            onChange={onResourcesEditorStateChange}
            id="rules"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.resources && 'The hackathon resources must be edited'}
          </p>
        </div>
        <div name="hackathon_judges">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">Judges</h1>
          <label
            htmlFor="resources"
            className="text-sm text-gray-600 italic block"
          >
            Information of judges. e.g. name, title, personal link.
          </label>
          <Quilleditor
            value={judgesEditorContent}
            onChange={onJudgesEditorStateChange}
            id="rules"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.judges && 'The hackathon judges must be edited'}
          </p>
        </div>
        <div name="hackathon_schedule">
          <h1 className="text-lg font-semibold dark:text-white">
            Hackathon schedule
          </h1>
          <label
            htmlFor="start_date"
            className="mb-3 text-sm text-gray-600 italic block"
          >
            All times are in Eastern Time (US & Canada) (EDT)
          </label>
          <h1 className="mb-1 text-sm font-mono font-semibold dark:text-white">
            Start date
          </h1>
          <input
            {...register('startDate')}
            type="date"
            id="start_date"
            className="mt-1 block px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.startDate?.message}
          </p>
          <h1 className="mb-1 text-sm font-mono font-semibold dark:text-white">
            Deadline
          </h1>
          <input
            {...register('endDate')}
            type="date"
            id="end_date"
            className="mt-1 block px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.endDate?.message}
          </p>
        </div>
        <Button
          type="submit"
          className="gap-1 px-6 bg-orange-800 font-bold mx-auto"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </>
  )
}