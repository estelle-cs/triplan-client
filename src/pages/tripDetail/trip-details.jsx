import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './trip-details.css';


function TripDetails() {
  const location = useLocation();
  const { tripData } = location.state || {};
  const navigate = useNavigate();

  const formatDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStart = `${start.getDate()}/${start.getMonth() + 1}`;
    const formattedEnd = `${end.getDate()}/${end.getMonth() + 1}`;

    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="trip-details">
      <h1>Trip Details</h1>
      {tripData ? (
        <div className="trip-info">
          <p><strong>Trip to {tripData.location}</strong></p>
          <p>{formatDates(tripData.start_date, tripData.end_date)}</p>
        </div>
      ) : (
        <p>No trip data available.</p>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <button className="back-button" onClick={() => navigate('/dashboard')}>to Dashboard</button>


    </div>
  );
}

export default TripDetails;
