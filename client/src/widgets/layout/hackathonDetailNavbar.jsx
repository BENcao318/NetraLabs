import React, { useEffect, useState } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export const HackathonDetailNavbar = ({ page, setPage }) => {
  const [openNav, setOpenNav] = useState(false)

  // useEffect(() => {
  //   window.addEventListener(
  //     'resize',
  //     () => window.innerWidth >= 960 && setOpenNav(false)
  //   )
  // }, [])

  const navList = (
    <ul className="mb-0 mt-0 flex flex-row items-center gap-8 lg:gap-36">
      <Typography
        as="li"
        variant="large"
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
        variant="large"
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
        variant="large"
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
            {/* <div className="block lg:hidden"></div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <ChevronDownIcon class="h-6 w-6 text-gray-900" />
              )}
            </IconButton> */}
          </div>
        </div>
        <MobileNav open={openNav} className="rounded-none ring-none">
          {navList}
        </MobileNav>
      </Navbar>
    </>
  )
}
