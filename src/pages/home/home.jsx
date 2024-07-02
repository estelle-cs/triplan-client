import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './home.css'
import Navbar from "../../composants/navbar"

function App() {
  const [location, setLocation] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleStartPlanning = () => {
    if (!location) {
      setErrorMessage('Location is required.');
    } else {
      setErrorMessage('');
      const tripInfo = { location, start_date, end_date };
      axios.post('http://localhost:3000/trip/createPublicTrip', tripInfo).then(response => {
        console.log(response.data);
        navigate('/trip', { state: { tripData: response.data } });
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Plan a new trip</h1>
        <div className="input-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleStartPlanning}>Start Planning</button>
      </header>
    </div>
  );
}

export default App;
