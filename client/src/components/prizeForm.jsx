import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const PrizeForm = ({
  prize,
  removeElement,
  prizeList,
  setPrizeList,
}) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    value: yup.number().required(),
    numOfWinningTeams: yup.number().required(),
    description: yup.string(),
  })

  const onSubmit = (data) => {
    const prizeData = { ...data, editting: false }
    const index = prizeList.findIndex((elm) => elm.id === prize.id)
    const newPrizeList = [...prizeList]
    newPrizeList[index] = { ...newPrizeList[index], ...prizeData }
    setPrizeList(newPrizeList)
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    setValue('name', prize.name)
    setValue('value', prize.value)
    setValue('numOfWinningTeams', prize.numOfWinningTeams)
    setValue('description', prize.description)
  }, [prize])

  return (
    <div className="bg-orange-100 p-6 rounded-2xl flex flex-col gap-4 w-[60rem]">
      <div className="w-1/3">
        <h1 className="mb-1 font-semibold italic dark:text-white">Name</h1>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
        <p className="mt-2 text-normal font-bold text-red-600">
          {errors.name && 'Cannot be empty.'}
        </p>
      </div>
      <div className="w-[16rem]">
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Cash value
        </h1>
        <input
          {...register('value')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          type="number"
        />
        <p className="mt-2 text-normal font-bold text-red-600">
          {errors.value && 'Cannot be empty.'}
        </p>
      </div>
      <div className="w-[16rem]">
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Number of winning teams
        </h1>
        <input
          {...register('numOfWinningTeams')}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          type="number"
        />
        <p className="mt-2 text-normal font-bold text-red-600">
          {errors.numOfWinningTeams && 'Cannot be empty.'}
        </p>
      </div>
      <div className="w-1/2">
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Description
        </h1>
        <label htmlFor="tagline" className="text-sm text-gray-600 italic block">
          Create details of your hackathon prize.
        </label>
        <textarea
          {...register('description')}
          type="text"
          className="resize rounded-lg w-full p-3  border border-gray-600 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="flex gap-6 items-center">
        <Button className="bg-orange-600" onClick={handleSubmit(onSubmit)}>
          Add Prize
        </Button>
        <a
          onClick={() => removeElement(prize, prizeList, setPrizeList)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        >
          Cancel
        </a>
      </div>
    </div>
  )
}
