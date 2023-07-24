import { Button } from '@material-tailwind/react'
import React from 'react'

export const PrizeTag = ({ prize, prizeList, setPrizeList, removeElement }) => {
  const editPrizeTag = () => {
    const newPrizeList = [...prizeList]
    const index = prizeList.findIndex((elm) => elm.id === prize.id)
    newPrizeList[index] = { ...newPrizeList[index], editting: true }
    setPrizeList(newPrizeList)
  }

  return (
    <div className="bg-green-100 w-full  p-2 flex justify-between rounded-xl">
      <div className="px-6">
        <h1 className="text-lg font-semibold">{prize.name}</h1>
        <p className="text-sm italic">{`${prize.numOfWinningTeams} teams - $${prize.value}`}</p>
        <p className="text-sm">{prize.description}</p>
      </div>
      <div className="flex gap-6 items-center px-6">
        <Button color="blue-gray" onClick={() => editPrizeTag()}>
          Edit
        </Button>
        <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
          onClick={() => removeElement(prize, prizeList, setPrizeList)}
        >
          Delete
        </a>
      </div>
    </div>
  )
}
