import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Dashboard } from './layouts/dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route
          path="*"
          element={<Navigate to="/dashboard/overview" replace />}
        />
      </Routes>
    </Router>
  )
}

export default App
