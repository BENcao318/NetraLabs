import React, { useState } from 'react'
import { Card, Checkbox, Typography } from '@material-tailwind/react'

export const CheckboxList = ({ list, selectedItem, setSelectedItem }) => {
  const handleCheckboxChange = (value) => {
    if (selectedItem === value) {
      setSelectedItem(null)
    } else {
      setSelectedItem(value)
    }
  }

  return (
    <>
      <Card className="w-full max-w-[40rem] ">
        <div className="flex flex-wrap">
          {list.map((item) => (
            <ul key={item.value} className="p-0">
              <label
                htmlFor={`horizontal-list-${item.value}`}
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <div className="mr-3">
                  <Checkbox
                    id={`horizontal-list-${item.value}`}
                    checked={selectedItem === item.value}
                    onChange={() => handleCheckboxChange(item.value)}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </div>
                <Typography color="blue-gray" className="font-medium text-sm">
                  {item.label}
                </Typography>
              </label>
            </ul>
          ))}
        </div>
      </Card>
    </>
  )
}
