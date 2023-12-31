import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../routes'

export const Auth = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === 'auth' &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      {/* <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div> */}
    </div>
  )
}
