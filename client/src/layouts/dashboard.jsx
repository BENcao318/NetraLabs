import React from 'react'
import { Sidenav } from '../widgets/layout/sidenav'
import routes from '../routes'

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        brandImg={'/img/brandImg.png'}
        brandName={'NetraLabs'}
        routes={routes}
      />
      <div className="p-4 xl:ml-80"></div>
    </div>
  )
}
