import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/home.jsx'
import Welcome from './pages/welcome/welcome.jsx'
import NoPage from './pages/no-page/no-page.jsx'
import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import TripDetails from './pages/tripDetail/trip-details.jsx'
import TripDashboard from './pages/tripDashboard/trip-dashboard.jsx'
import NewTrip from './pages/newTrip/newTrip.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RouteGuard from './component/auth/RouteGuard.jsx'
import MainLayout from "./composants/mainLayout.jsx"
import 'antd/dist/reset.css';
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router>
      <Routes>
          <Route path="/" element={<RouteGuard element= {<MainLayout />}/>}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="newTrip" element={<NewTrip />} />
              <Route path="trip" element={<TripDetails />} />
              <Route path="dashboard" element={<TripDashboard />} />
              <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
</React.StrictMode>,
)