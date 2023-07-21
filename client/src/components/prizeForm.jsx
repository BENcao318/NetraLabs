import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'

export const PrizeForm = ({
  prize,
  removeElement,
  prizelist,
  setPrizelist,
}) => {
  const [prizeData, setPrizeData] = useState({ ...prize })

  return (
    <div>
      <div>
        <h1>Name</h1>
        <input type="text" />
      </div>
      <div className="text-xl">
        <h1>{prizeData.number}</h1>
      </div>
      <div>
        <h1>Cash value</h1>
        <input type="text" />
      </div>
      <div>
        <h1>Number of winning teams</h1>
        <input type="text" />
      </div>
      <div>
        <h1>Description</h1>
        <input type="text" />
      </div>
      <Button className="bg-orange-600">Add Prize</Button>
      <Button onClick={() => removeElement(prize, prizelist, setPrizelist)}>
        Cancel
      </Button>
    </div>
  )
}
