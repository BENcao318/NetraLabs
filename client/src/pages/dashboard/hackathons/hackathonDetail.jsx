import React, { useContext, useState } from 'react'
import { HackathonDetailNavbar } from '../../../widgets/layout/hackathonDetailNavbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { Overview } from './overview'
import { Rules } from './rules'
import { Resources } from './resources'
import { hackathonListContext } from '../../../context/hackathonListContext'

export const HackathonDetail = () => {
  const [page, setPage] = useState('overview')
  const { hackathonList } = useContext(hackathonListContext)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const objectString = queryParams.get('data')
  const hackathon = hackathonList.find(
    (hackathon) => hackathon.id === objectString
  )

  return (
    <>
      <HackathonDetailNavbar page={page} setPage={setPage} />
      <div className="flex justify-center p-6 h-screen">
        {page === 'overview' && <Overview hackathon={hackathon} />}
        {page === 'rules' && <Rules hackathon={hackathon} />}
        {page === 'resources' && <Resources hackathon={hackathon} />}
      </div>
    </>
  )
}
