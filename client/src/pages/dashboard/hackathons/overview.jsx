import React, { useContext, useEffect, useState } from 'react'
import * as DOMPurify from 'dompurify'
import { convertDateString } from '../../../helpers/util'
import { Button } from '@material-tailwind/react'
import serverAPI from '../../../hooks/useAxios'
import { authContext } from '../../../context/authContext'
import { ToastContainer, toast } from 'react-toastify'

export const Overview = ({ hackathon }) => {
  const { auth } = useContext(authContext)
  const [hasJoined, setHasJoined] = useState(false)
  const [project, setProject] = useState(null)

  const sanitizeHTML = (htmlString) => {
    return DOMPurify.sanitize(htmlString)
  }

  const onClick = () => {
    const hackathonSignUpData = {
      userEmail: auth.user.email,
      hackathonId: hackathon.id,
    }

    serverAPI
      .post('/hackathons/join', hackathonSignUpData)
      .then((response) => {
        if (response.status === 403) {
          console.log(response.data.message)
        } else {
          setHasJoined(true)
          toast.success(
            `You have joined this hackthon. Go ahead create a project!`,
            {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          )
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Error joining hackthon. Please try again!`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  useEffect(() => {
    if (Array.isArray(auth.user.hackathons)) {
      if (auth.user.hackathons.includes(hackathon.id)) setHasJoined(true)
    }
  }, [auth, setHasJoined])

  useEffect(() => {
    if (hasJoined) {
      const userData = {
        userEmail: auth.user.email,
        hackathonId: hackathon.id,
      }
      console.log('first')
      serverAPI.post('/hackathons/get-project', userData).then((response) => {
        console.log(response.data)
      })
    }
  }, [hasJoined, project])

  return (
    hackathon && (
      <div className="py-1 px-6 h-full flex flex-col gap-4 mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="text-center">
          <h6 className="font-semibold text-3xl h-6 mb-16 break-all lg:mb-6">
            {hackathon.name}
          </h6>
          <p className="text-lg -mt-3">{hackathon.tagline}</p>
          <div>
            {!hasJoined && (
              <Button className="mt-6" onClick={onClick}>
                Join hackathon
              </Button>
            )}
          </div>
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
            {hackathon.prizes.map((prize, index) => {
              return (
                <div className="w-full mx-auto" key={index}>
                  <div>🏆 {prize.name}</div>
                  <div>🪙 ${prize.value}</div>
                  <div>{prize.numOfWinningTeams} winning teams</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="py-6">
          <h1 className="uppercase text-2xl font-mono tracking-wide">Judges</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(hackathon.judges),
            }}
            className="text-lg flex flex-col py-6"
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3600}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </div>
    )
  )
}
