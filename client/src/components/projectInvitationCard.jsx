import { Card, CardBody, Typography } from '@material-tailwind/react'
import { configure } from '@testing-library/react'
import React from 'react'

export const ProjectInvitationCard = ({
  projectData,
  selectedProject,
  setSelectedProject,
}) => {
  const { project, hackathon, team } = projectData

  const onClick = () => {
    setSelectedProject(project.id)
  }

  return (
    <>
      <div
        className={`max-w-[18rem] h-full flex flex-col hover:shadow-xl cursor-pointer   rounded-xl mx-auto group border-2 focus:ring-2 py-2 px-2  break-all ${
          project.id === selectedProject && 'ring-2 ring-orange-600'
        }`}
        onClick={onClick}
      >
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td>
                <h1 className="text-xs font-semibold text-black font-roboto w-[6rem]">
                  Team:
                </h1>
              </td>
              <td>
                <p className="text-sm text-gray-600 font-normal font-roboto break-words overflow-hidden w-[10rem]">
                  {team.name}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h1 className="text-xs font-semibold text-black font-roboto w-[6rem]">
                  Project:
                </h1>
              </td>
              <td>
                <p className="text-sm text-gray-600 font-normal font-roboto break-words overflow-hidden w-[10rem]">
                  {project.name}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <h1
                  color="blue-gray"
                  className="text-xs font-semibold text-black font-roboto w-[6rem]"
                >
                  Hackathon:
                </h1>
              </td>
              <td className="break-words">
                <p className="text-sm text-gray-600 font-normal font-roboto break-words overflow-hidden w-[10rem]">
                  {hackathon.name}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
