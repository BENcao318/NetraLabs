import { Dialog } from "@material-tailwind/react"
import React from "react"
import * as DOMPurify from "dompurify"
import { convertDateString } from "../helpers/util"

export const HackathonPreview = ({ open, handleOpen, hackathon }) => {
  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  return (
    <div>
      {" "}
      <Dialog
        open={open}
        handler={handleOpen}
        className="h-full overflow-auto"
        size="xl"
      >
        <div className="mx-auto mt-16 flex h-full max-w-6xl flex-col gap-4 divide-y divide-gray-400 p-6">
          <div className="text-center">
            <h6 className="mb-6 h-6 text-3xl font-semibold">
              {hackathon.name}
            </h6>
            <p className="-mt-3 text-lg">{hackathon.tagline}</p>
            <div className="mx-auto mt-6 flex w-full justify-center gap-4 text-sm">
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
              <div className="mx-auto mt-1 flex w-full justify-center gap-4 text-sm">
                <div className="font-semibold">Time zone:</div>
                {hackathon.time_zone.label}
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(hackathon.description),
            }}
            className="flex flex-col py-6 text-lg"
          />
          <div className="-mb-4 py-3">
            <h1 className="font-mono text-2xl font-bold uppercase	tracking-wide">
              Location
            </h1>
            <h6 className="mt-3">{hackathon.location}</h6>
          </div>
          <div className="-mb-6 py-6">
            <h1 className="font-mono text-2xl font-bold uppercase	tracking-wide">
              Requirements
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(hackathon.requirements),
              }}
              className="flex flex-col py-6 text-lg"
            />
          </div>
          <div className="py-6">
            <h1 className="font-mono text-2xl font-bold uppercase	tracking-wide">
              Prizes
            </h1>
            <div className="mt-6 flex gap-20">
              {hackathon.prizes.map((prize, idx) => {
                return (
                  <div className="mx-auto w-full" key={idx}>
                    <div>🏆 {prize.name}</div>
                    <div>🪙 ${prize.value}</div>
                    <div>{prize.numOfWinningTeams} winning teams</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="py-6">
            <h1 className="font-mono text-2xl uppercase tracking-wide">
              Judges
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(hackathon.judges),
              }}
              className="flex flex-col py-6 text-lg"
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
