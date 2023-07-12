import React, { createContext, useState } from 'react'

export const hackathonContext = createContext() 

const HackathonProvider = ({children}) => {
  const [hackathon, setHackathon] = useState()
  return (
    <hackathonContext.Provider
      value={{hackathon, setHackathon}}
    >
      {children}
    </hackathonContext.Provider> 
  )
}

export default HackathonProvider