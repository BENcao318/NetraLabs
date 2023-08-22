import React, { createContext, useState } from 'react'

export const joinedHackathonListContext = createContext()

const JoinedHackathonListProvider = ({ children }) => {
  const [joinedHackathonList, setJoinedHackathonList] = useState([])
  return (
    <joinedHackathonListContext.Provider
      value={{ joinedHackathonList, setJoinedHackathonList }}
    >
      {children}
    </joinedHackathonListContext.Provider>
  )
}

export default JoinedHackathonListProvider
