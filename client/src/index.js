import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ThemeControllerProvider } from './context/themeContext'
import AuthProvider from './context/authContext'
import HackathonProvider from './context/hackathonContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <ThemeControllerProvider>
      <HackathonProvider>
        <App />
      </HackathonProvider>
    </ThemeControllerProvider>
  </AuthProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
