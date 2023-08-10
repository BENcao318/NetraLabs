import React, { useContext, useEffect, useState } from 'react'
import { Sidenav } from '../widgets/layout/sidenav'
import routes from '../routes'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardNavbar } from '../widgets/layout/dashboard-navbar'
import serverAPI from '../hooks/useAxios'
import { hackathonContext } from '../context/hackathonContext'
import { authContext } from '../context/authContext'
import { AdminDashboardNavbar } from '../widgets/layout/admin-dashboard-navbar'
import { HackathonOverview } from '../pages/management/hackathonOverview'
import { Createhackathon } from '../pages/management/createhackathon'
import { Edithackathon } from '../pages/management/editHackathon'

export const Dashboard = () => {
  const { hackathon, setHackathon } = useContext(hackathonContext)
  const { auth, setAuth } = useContext(authContext)
  const navigate = useNavigate()
  const [dashboardLayout, setDashboardLayout] = useState('userDashboard')

  useEffect(() => {
    setDashboardLayout(auth.user.isAdmin ? 'adminDashboard' : 'userDashboard')
  }, [auth])

  useEffect(() => {
    serverAPI.get('/me').then((response) => {
      if (response.data.success) {
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          isLoggedIn: true,
          user: response.data.user,
        }))
      } else {
        navigate('/auth/sign-in')
      }
    })
  }, [setAuth])

  useEffect(() => {
    serverAPI
      .get('/hackathons')
      .then((res) => {
        if (res.status === 200) {
          setHackathon(res.data)
        } else {
          throw new Error('Request failed.')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setHackathon])

  return (
    <>
      {dashboardLayout === 'userDashboard' && (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav
            brandImg={'/img/brandImg.png'}
            brandName={'NetraLabs'}
            routes={routes}
          />
          <div className="p-3 xl:ml-80">
            <DashboardNavbar />
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === dashboardLayout &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
          </div>
        </div>
      )}
      {dashboardLayout === 'adminDashboard' && (
        <div className="p-3 mx-36">
          <AdminDashboardNavbar />
          <Routes>
            <Route path="/" element={<HackathonOverview />} />
            <Route path="/hackathon/new" element={<Createhackathon />} />
            <Route path="/hackathon/update" element={<Edithackathon />} />
          </Routes>
        </div>
      )}
    </>
  )
}
