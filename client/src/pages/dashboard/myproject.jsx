import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-tailwind/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const Myproject = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    tagline: yup.string().required(),
    // story: yup.string().required(),
    // story: yup.string().required(),
    // techStack: yup.array().of(yup.string()),
    // videoUrl: yup
    //   .string()
    //   .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     'Enter correct url!'
    //   )
    //   .required('Please enter website'),
    // repositoryUrl: yup
    //   .string()
    //   .matches(
    //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //     'Enter correct url!'
    //   ),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="flex p-6 h-full justify-between w-[60rem] mx-auto">
      <div className="flex flex-col gap-6 w-1/2">
        <div>
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
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
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.name && 'Enter project name'}
          </p>
        </div>
        <div>
          <h1 className="mb-1 text-lg font-semibold dark:text-white">
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
          <p className="mt-2 text-normal font-bold text-red-600">
            {errors.tagline && 'Enter project tagline'}
          </p>
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </div>
      <div>
        <h1 className="text-xl font-bold">My team</h1>
        <p>Test members</p>
        <Button>Add new teammate</Button>
      </div>
    </div>
  )
}
