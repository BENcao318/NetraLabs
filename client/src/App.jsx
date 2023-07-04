import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './layouts/dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
