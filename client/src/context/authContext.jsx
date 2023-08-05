import React, { createContext, useEffect, useState } from 'react'
import serverAPI from '../hooks/useAxios'

export const authContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoading: true,
    isLoggedIn: false,
    user: {},
  })

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
