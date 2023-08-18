import React, { createContext, useState } from 'react'

export const hackathonListContext = createContext()

const HackathonListProvider = ({ children }) => {
  const [hackathonList, setHackathonList] = useState([])
  return (
    <hackathonListContext.Provider value={{ hackathonList, setHackathonList }}>
      {children}
    </hackathonListContext.Provider>
  )
}

export default HackathonListProvider
