import React, { useState } from 'react'
import ReactQuill from 'react-quill'

export const Quilleditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ size: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        className="h-60 mt-1"
      />
    </>
  )
}
