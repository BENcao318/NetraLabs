import React, { useContext, useEffect } from 'react'
import { hackathonContext } from '../../context/hackathonContext'
import * as DOMPurify from 'dompurify'

export const Overview = () => {
  const { hackathon } = useContext(hackathonContext)

  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  return (
    hackathon && (
      <div className="p-6 h-full mt-16 flex flex-col gap-12 mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="text-center">
          <h6 className="font-semibold text-3xl h-6 mb-6">{hackathon.title}</h6>
          <p className="text-lg">{hackathon.tagline}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(hackathon.description),
          }}
          className="text-lg flex flex-col py-6"
        />
        <div className="py-6">
          <h1 className="uppercase text-2xl font-mono tracking-wide	">
            Requirements
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(hackathon.requirements),
            }}
            className="text-lg flex flex-col py-6"
          />
        </div>
        <div className="py-6">
          <h1 className="uppercase text-2xl font-mono tracking-wide	">Prizes</h1>
          <div className="flex gap-20 mt-6">
            <div>
              <h6 className="text-lg">1st Place: </h6>
              <p>${hackathon.first_prize_amount}</p>
            </div>
            <div>
              <h6 className="text-lg">2nd Place: </h6>
              <p>${hackathon.second_prize_amount}</p>
            </div>
            <div>
              <h6 className="text-lg">3rd Place: </h6>
              <p>${hackathon.third_prize_amount}</p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h1 className="uppercase text-2xl font-mono tracking-wide">Judges</h1>
          <h6 className="mt-6">{hackathon.judges}</h6>
        </div>
      </div>
    )
  )
}
