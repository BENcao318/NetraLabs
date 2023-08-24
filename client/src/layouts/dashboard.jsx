import React, { Profiler, useContext, useEffect, useState } from 'react'
import { Sidenav } from 'widgets/layout/sidenav'
import routes from 'routes'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardNavbar } from 'widgets/layout/dashboardNavbar'
import serverAPI from 'hooks/useAxios'
import { authContext } from 'context/authContext'
import { AdminDashboardNavbar } from 'widgets/layout/adminDashboardNavbar'
import { HackathonOverview } from 'pages/management/hackathonOverview'
import { Createhackathon } from 'pages/management/createhackathon'
import { EditHackathon } from 'pages/management/editHackathon'
import { HackathonDetail } from 'pages/dashboard/hackathons/hackathonDetail'
import { Profile } from 'pages/dashboard/profile'
import { CreateProject } from 'pages/dashboard/projects/createProject'
import { EditProject } from 'pages/dashboard/projects/editProject'
import { ToastContainer } from 'react-toastify'

export const Dashboard = () => {
  const { auth, setAuth } = useContext(authContext)
  const navigate = useNavigate()
  const [dashboardLayout, setDashboardLayout] = useState('userDashboard')

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
    setDashboardLayout(auth.user.isAdmin ? 'adminDashboard' : 'userDashboard')
  }, [auth])

  useEffect(() => {
    if (auth.user.isAdmin) {
      navigate('/dashboard/admin/hackathons')
    } else {
      navigate('/dashboard/hackathons')
    }
  }, [auth])

  // useEffect(() => {
  //   if (dashboardLayout === 'adminDashboard') {
  //     console.log('yessssssssssssss')
  //     serverAPI
  //       .post('/hackathons/list', auth.user)
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log('res++++++++++++', res.data)
  //           setHackathonList(res.data.message2)
  //         } else {
  //           throw new Error('Request failed.')
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }, [setHackathonList, auth])

  return (
    <>
      {dashboardLayout === 'adminDashboard' && (
        <div className="p-3 mx-36">
          <AdminDashboardNavbar />
          <Routes>
            <Route path="/admin/hackathons" element={<HackathonOverview />} />
            <Route path="/admin/hackathon/new" element={<Createhackathon />} />
            <Route path="/admin/hackathon/update" element={<EditHackathon />} />
          </Routes>
        </div>
      )}
      {dashboardLayout === 'userDashboard' && (
        <div className="h-full">
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
              <Route path="/hackathons/detail" element={<HackathonDetail />} />
              <Route
                path="/projects/create-project"
                element={<CreateProject />}
              />
              <Route path="projects/edit-project" element={<EditProject />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3600}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}
