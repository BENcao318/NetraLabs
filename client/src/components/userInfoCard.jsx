import React, { useState } from 'react'
import { UserProfileImg } from './userProfileImg'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { IniviteParticipantDialog } from './iniviteParticipantDialog'

export const UserInfoCard = ({ userData }) => {
  const [openInviteParticipantDialog, setOpenInviteParticipantDialog] =
    useState(false)

  const handleOpenInviteParticipantDialog = () =>
    setOpenInviteParticipantDialog(!openInviteParticipantDialog)

  return (
    <>
      <div className="w-[26rem] h-full border-2 rounded-lg p-2">
        <div className="flex justify-center items-center w-full py-2 ">
          <div className="flex items-center justify-between w-full px-3">
            <div className="flex items-center">
              {userData.avatar ? (
                <img
                  className="w-12 h-12 mr-6"
                  src={userData.avatar}
                  alt="Avatar"
                />
              ) : (
                <UserProfileImg
                  firstName={userData.firstName}
                  lastName={userData.lastName}
                  width={12}
                  height={12}
                />
              )}

              <div className="flex flex-col items-center">
                <h1 className="text-lg font-medium">
                  {`${userData.firstName} ${userData.lastName}`}{' '}
                </h1>
                <div className="flex w-full items-center">
                  <AcademicCapIcon className="h-6 w-6 text-gray-600 mr-3" />
                  <p className="font-roboto font-light">{userData.role}</p>
                </div>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-teal-400 rounded-lg text-white hover:bg-teal-200  uppercase text-sm font-semibold"
              onClick={handleOpenInviteParticipantDialog}
            >
              Invite
            </button>
          </div>
        </div>

        <div className="border border-solid border-1 border-gray-100 mt-1 mb-1"></div>

        <div className="flex flex-col w-full ml-2 mt-2">
          <div className="flex w-full items-center">
            <WrenchScrewdriverIcon className="h-4 w-4 text-gray-600 mr-2" />
            <h1 className="uppercase font-light text-sm">skills</h1>
          </div>
          <div className="flex flex-wrap gap-3 ml-2 text-sm font-medium mt-1 text-teal-300 ">
            {userData.skills.map((skill) => (
              <div key={skill.value}>
                <h3 className="bg-orange-50 py-1 px-2 rounded-lg">
                  {skill.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <IniviteParticipantDialog
        open={openInviteParticipantDialog}
        handleOpen={handleOpenInviteParticipantDialog}
        user={userData}
      />
    </>
  )
}
