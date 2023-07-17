import React, { useState } from 'react'
import ReactQuill from 'react-quill'

export const Quilleditor = ({ text, setText }) => {
  const handleChange = (html) => {
    setText(html)
  }
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
      ['link', 'image'],
      ['clean'],
    ],
  }
  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'image',
    'formula',
  ]

  return (
    <>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </>
  )
}
