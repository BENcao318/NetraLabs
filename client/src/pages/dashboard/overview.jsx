import React, { useContext } from 'react'
import { hackathonContext } from '../../context/hackathonContext'

export const Overview = () => {
  const { hackathon } = useContext(hackathonContext)

  return (
    hackathon && (
      <div className="p-6 h-screen">
        <div className="text-center">
          <h6 className="font-semibold text-3xl h-6">{hackathon.title}</h6>
          <p className="text-lg mt-6">{hackathon.tagline}</p>
        </div>
        <pre className="whitespace-pre-wrap">{hackathon.description}</pre>
        <div>{hackathon.rules}</div>
      </div>
    )
  )
}
