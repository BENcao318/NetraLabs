import React from 'react'

export const ThemeController = React.createContext(null)

export const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_SIDENAV': {
      return { ...state, openSidenav: action.value }
    }
    case 'SIDENAV_TYPE': {
      return { ...state, sidenavType: action.value }
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.value }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const ThemeControllerProvider = ({ children }) => {
  const initialState = {
    openSidenav: false,
    sidenavType: 'dark',
    sidenavColor: 'white',
  }

  const [controller, dispatch] = React.useReducer(reducer, initialState)
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  )

  return (
    <ThemeController.Provider value={value}>
      {children}
    </ThemeController.Provider>
  )
}

export const useThemeController = () => {
  const context = React.useContext(ThemeController)

  if (!context) {
    throw new Error(
      'useThemeController should be used inside the ThemeControllerProvider.'
    )
  }

  return context
}

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: 'OPEN_SIDENAV', value })
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: 'SIDENAV_COLOR', value })
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: 'SIDENAV_TYPE', value })
