import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Dashboard } from './layouts/dashboard'
import { LandingPage } from './pages/landingPage'
import { Auth } from './layouts/auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
