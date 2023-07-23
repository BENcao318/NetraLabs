import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const PrizeForm = ({
  prize,
  removeElement,
  prizelist,
  setPrizelist,
}) => {
  const schema = yup.object().shape({
    prizeName: yup.string().required(),
    prizeCashValue: yup.number().required(),
    numOfWinningTeams: yup.number().required(),
    description: yup.string().min(8),
  })

  const [prizeData, setPrizeData] = useState({ ...prize })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div className="bg-orange-100 p-6 rounded-xl mb-6 flex flex-col gap-2">
      <div>
        <h1 className="mb-1 font-semibold italic dark:text-white">Name</h1>
        <Input color="black" label="Name" />
      </div>
      <div className="text-xl">
        <h1 className="mb-1 font-semibold italic dark:text-white">
          {prizeData.number}
        </h1>
      </div>
      <div>
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Cash value
        </h1>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          type="number"
        />
      </div>
      <div>
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Number of winning teams
        </h1>
        <input
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm 
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          type="number"
        />
      </div>
      <div>
        <h1 className="mb-1 font-semibold italic dark:text-white">
          Description
        </h1>
        <label htmlFor="tagline" className="text-sm text-gray-600 italic block">
          Create details of your hackathon prize.
        </label>
        <textarea
          type="text"
          className="resize rounded-lg w-full p-3  border border-gray-600 rounded-md text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="flex gap-6">
        <Button className="bg-orange-600">Add Prize</Button>
        <a
          onClick={() => removeElement(prize, prizelist, setPrizelist)}
          className="click"
        >
          Cancel
        </a>
      </div>
    </div>
  )
}
