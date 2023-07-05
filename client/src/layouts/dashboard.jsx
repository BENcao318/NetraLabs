import React from 'react'
import { Sidenav } from '../widgets/layout/sidenav'
import routes from '../routes'
import { DashboardNavbar } from './dashboard-navbar'
import { Route, Routes } from 'react-router-dom'

export const Dashboard = () => {
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
