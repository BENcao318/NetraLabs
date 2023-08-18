import React, { useState } from 'react'
import { Navbar, MobileNav, Typography } from '@material-tailwind/react'

export const HackathonDetailNavbar = ({ page, setPage }) => {
  const [open, setOpen] = useState(false)

  const navList = (
    <ul className="mb-0 mt-0 flex flex-row items-center gap-8 lg:gap-36">
      <Typography
        as="li"
        color="blue-gray"
        className={`py-1 font-normal text-lg hover:bg-orange-600 hover:text-white rounded-full px-6 ${
          page === 'overview' && 'bg-orange-600 text-white'
        }`}
      >
        <a
          href="#"
          className="flex items-center"
          onClick={() => setPage('overview')}
        >
          Overview
        </a>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className={`py-1 font-normal text-lg hover:bg-orange-600 hover:text-white rounded-full px-6 ${
          page === 'rules' && 'bg-orange-600 text-white'
        }`}
      >
        <a
          href="#"
          className="flex items-center"
          onClick={() => setPage('rules')}
        >
          Rules
        </a>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className={`py-1 font-normal text-lg hover:bg-orange-600 hover:text-white rounded-full  px-6 ${
          page === 'resources' && 'bg-orange-600 text-white'
        }`}
      >
        <a
          href="#"
          className="flex items-center"
          onClick={() => setPage('resources')}
        >
          Resources
        </a>
      </Typography>
    </ul>
  )

  return (
    <>
      <Navbar className="sticky top-0 z-10 rounded-full py-1 px-4 h-full mt-6 shadow-lg ring-2 ring-gray-300 mx-auto">
        <div className="flex items-center  text-blue-gray-900">
          <div className="flex items-center justify-center w-full">
            <div>{navList}</div>
          </div>
        </div>
        <MobileNav open={open} className="rounded-none ring-none">
          {navList}
        </MobileNav>
      </Navbar>
    </>
  )
}
