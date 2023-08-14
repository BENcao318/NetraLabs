import { Dialog } from '@material-tailwind/react'
import React from 'react'
import * as DOMPurify from 'dompurify'
import { convertDateString } from '../helpers/util'

export const HackathonPreview = ({ open, handleOpen, hackathon }) => {
  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  return (
    <div>
      {' '}
      <Dialog
        open={open}
        handler={handleOpen}
        className="h-full overflow-auto"
        size="xl"
      >
        <div className="p-6 h-full mt-16 flex flex-col gap-4 mx-auto max-w-6xl divide-y divide-gray-400">
          <div className="text-center">
            <h6 className="font-semibold text-3xl h-6 mb-6">
              {hackathon.name}
            </h6>
            <p className="text-lg -mt-3">{hackathon.tagline}</p>
            <div className="text-sm flex mx-auto gap-4 w-full justify-center mt-6">
              <div className="flex gap-4">
                <div className="font-semibold">Start time:</div>
                {convertDateString(hackathon.start_time)}
              </div>
              <div className="flex gap-4">
                <div className="font-semibold">End time:</div>
                {convertDateString(hackathon.deadline)}
              </div>
            </div>
            <div>
              <div className="flex gap-4 text-sm mx-auto w-full justify-center mt-1">
                <div className="font-semibold">Time zone:</div>
                {hackathon.time_zone.label}
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(hackathon.description),
            }}
            className="text-lg flex flex-col py-6"
          />
          <div className="py-3 -mb-4">
            <h1 className="uppercase text-2xl font-mono tracking-wide	font-bold">
              Location
            </h1>
            <h6 className="mt-3">{hackathon.location}</h6>
          </div>
          <div className="py-6 -mb-6">
            <h1 className="uppercase text-2xl font-mono tracking-wide	font-bold">
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
            <h1 className="uppercase text-2xl font-mono tracking-wide	font-bold">
              Prizes
            </h1>
            <div className="flex gap-20 mt-6">
              {hackathon.prizes.map((prize) => {
                return (
                  <div className="w-full mx-auto">
                    <div>🏆 {prize.name}</div>
                    <div>🪙 ${prize.value}</div>
                    <div>{prize.numOfWinningTeams} winning teams</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="py-6">
            <h1 className="uppercase text-2xl font-mono tracking-wide">
              Judges
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(hackathon.judges),
              }}
              className="text-lg flex flex-col py-6"
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
