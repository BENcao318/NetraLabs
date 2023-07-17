import React, { useCallback, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@material-tailwind/react'
import { Quilleditor } from '../../components/quilleditor'

export const Createhackathon = () => {
  const [text, setText] = useState('')

  const update = () => {
    console.log(text)
  }

  return (
    <div>
      <Quilleditor text={text} setText={setText} />
      <Button
        variant="text"
        color="blue-gray"
        className="hidden items-center gap-1 px-4 xl:flex"
        onClick={update}
      >
        Submit
      </Button>
    </div>
  )
}
