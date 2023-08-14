import React from 'react'
import * as DOMPurify from 'dompurify'

export const Rules = ({ hackathon }) => {
  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  return (
    hackathon && (
      <div className="py-1 px-6 h-full flex flex-col gap-4 mx-auto max-w-6xl divide-y divide-gray-400">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(hackathon.rules),
          }}
          className="text-lg flex flex-col py-6"
        />
      </div>
    )
  )
}
