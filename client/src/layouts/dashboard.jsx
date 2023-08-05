import React, { useContext, useEffect } from 'react'
import { Sidenav } from '../widgets/layout/sidenav'
import routes from '../routes'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardNavbar } from '../widgets/layout/dashboard-navbar'
import serverAPI from '../hooks/useAxios'
import { hackathonContext } from '../context/hackathonContext'
import { authContext } from '../context/authContext'

export const Dashboard = () => {
  const { hackathon, setHackathon } = useContext(hackathonContext)
  const { setAuth } = useContext(authContext)
  const navigate = useNavigate()

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
          console.log(res.data)
        } else {
          throw new Error('Request failed.')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setHackathon])

  return (
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
              layout === 'dashboard' &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  )
}
