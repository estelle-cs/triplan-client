import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/home.jsx'
import NoPage from './pages/no-page/no-page.jsx'
import Login from './pages/login/login.jsx'
import TripDetails from './pages/tripDetail/trip-details.jsx'
import TripDashboard from './pages/tripDashboard/trip-dashboard.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trip" element={<TripDetails />} />
          <Route path="/dashboard" element={<TripDashboard />} />
      </Routes>
    </Router>
</React.StrictMode>,
)