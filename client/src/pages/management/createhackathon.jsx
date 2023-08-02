import React, { useCallback, useContext, useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@material-tailwind/react'
import { Quilleditor } from '../../components/quilleditor'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import timezones from '../../data/timezones.json'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import serverAPI from '../../hooks/useAxios'
import { PrizeForm } from '../../components/prizeForm'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { PrizeTag } from '../../components/prizeTag'
import { v4 as uuidv4 } from 'uuid'
import { hackathonContext } from '../../context/hackathonContext'
import {
  convertDateObject,
  convertDateString,
  convertDateString2,
} from '../../helpers/util'

export const Createhackathon = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    tagline: yup.string().required(),
    email: yup.string().email().required(),
    location: yup.string().required(),
    description: yup.string().min(8).required(),
    requirements: yup.string().min(8).required(),
    rules: yup.string().min(8).required(),
    timeZone: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string(),
        offset: yup.number(),
        abbrev: yup.string(),
        altNAme: yup.string(),
      })
      .required(),
    startDate: yup.date().required('Start date is needed for hackathon'),
    deadline: yup
      .date()
      .min(yup.ref('startDate'), 'End date need to be later')
      .required('End date is needed for hackathon'),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const { hackathon } = useContext(hackathonContext)

  const animatedComponents = makeAnimated()

  const [prizeList, setPrizeList] = useState([])

  useEffect(() => {
    register('description')
    register('requirements')
    register('rules')
    register('resources')
  }, [register])

  const addPrize = () => {
    const prize = {
      id: uuidv4(),
      name: '',
      value: 0,
      numOfWinningTeams: 1,
      description: '',
      editting: true,
    }

    setPrizeList(prizeList.concat(prize))
  }

  const removeElement = (prize, prizeList, setPrizeList) => {
    const newPrizeList = prizeList.filter((elm) => elm.id !== prize.id)
    setPrizeList(newPrizeList)
  }

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
  const onPartnersEditorStateChange = (editorState) => {
    setValue('partners', editorState)
  }

  const onSubmit = (data) => {
    const formData = { ...data, prizes: prizeList }
    serverAPI
      .post('/hackathons/new', formData)
      .then((res) => {
        if (res) {
          console.log('create')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const descriptionEditorContent = watch('description')
  const requirementsEditorContent = watch('requirements')
  const rulesEditorContent = watch('rules')
  const resourcesEditorContent = watch('resources')
  const judgesEditorContent = watch('judges')
  const partnersEditorContent = watch('partners')

  const testContent = '<p><strong>123456</strong></p>'

  useEffect(() => {
    if (hackathon) {
      setValue('name', hackathon.name)
      setValue('tagline', hackathon.tagline)
      setValue('email', hackathon.manager_email)
      setValue('location', hackathon.location)
      setValue('description', hackathon.description)
      setValue('requirements', hackathon.requirements)
      setValue('rules', hackathon.rules)
      setValue('resources', hackathon.resources)
      setValue('judges', hackathon.judges)
      setValue('partners', hackathon.partners)
      setValue('timeZone', hackathon.time_zone)
      setPrizeList(hackathon.prizes)
      setValue('startDate', convertDateString2(hackathon.start_time))
      setValue('deadline', convertDateString2(hackathon.deadline))
    }
  }, [hackathon])

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 w-[60rem] mx-auto">
        <div name="hackathon_name">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Hackathon name
          </h1>
          <label htmlFor="name" className="text-sm text-gray-600 italic block">
            Enter the name of your hackathon.
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.name && 'Name of the hackathon is required'}
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
            {...register('tagline')}
            type="text"
            id="tagline"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.tagline && 'Tagline of the hackathon is required'}
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
            {...register('email')}
            type="email"
            id="manager_email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.email && 'A proper email address of the host is required'}
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
            {...register('location')}
            type="text"
            id="location"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            required
          />
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.location && 'Address of the hackathon is required'}
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
        <div name="hackathon_partners">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
            Partners
          </h1>
          <label
            htmlFor="resources"
            className="text-sm text-gray-600 italic block"
          >
            Information of partners. e.g. name, description, link.
          </label>
          <Quilleditor
            value={partnersEditorContent}
            onChange={onPartnersEditorStateChange}
            id="rules"
          />
          <p className="mt-12 text-normal font-bold text-red-600">
            {errors.partners && 'The hackathon partners must be edited'}
          </p>
        </div>
        <div name="hackathon_prizes">
          <h1 className="mb-1 text-lg font-semibold dark:text-white">Prizes</h1>
          <div className="flex flex-col gap-2">
            {prizeList.map((prize) => {
              return prize.editting ? (
                <PrizeForm
                  prize={prize}
                  removeElement={removeElement}
                  prizeList={prizeList}
                  setPrizeList={setPrizeList}
                  key={prize.id}
                />
              ) : (
                <PrizeTag
                  key={prize.id}
                  prize={prize}
                  removeElement={removeElement}
                  prizeList={prizeList}
                  setPrizeList={setPrizeList}
                />
              )
            })}
          </div>
          <Button
            type="submit"
            onClick={addPrize}
            className="flex items-center gap-4 mt-6"
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add new Prize
          </Button>
        </div>
        <div name="hackathon_schedule">
          <h1 className="text-lg font-semibold dark:text-white">
            Hackathon schedule
          </h1>
          <label
            htmlFor="schedule"
            className="mb-3 text-sm text-gray-600 italic block"
          >
            Select time zone and start/end dates
          </label>
          <div className="">
            <h1 className="mb-1 text-sm font-mono font-semibold dark:text-white">
              Time zone
            </h1>
            <Controller
              name="timeZone"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={timezones}
                    placeholder="Select time zone"
                    components={animatedComponents}
                    className="w-1/2"
                  />
                  <p className="mt-2 text-red-600">
                    {errors.timeZone && 'Please pick time zone'}
                  </p>
                </>
              )}
            />
          </div>
          <div className="flex gap-12">
            <div>
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
            </div>
            <div>
              <h1 className="mb-1 text-sm font-mono font-semibold dark:text-white">
                Deadline
              </h1>
              <input
                {...register('deadline')}
                type="date"
                id="end_date"
                className="mt-1 block px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                required
              />
              <p className="mt-2 text-normal font-bold text-red-600">
                {errors.deadline?.message}
              </p>
            </div>
          </div>
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
