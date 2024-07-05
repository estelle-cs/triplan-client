import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './trip-dashboard.css';

function TripDashboard({ userId }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/trip/getAllTrips',
      {
        params: {
          userId
        }
      }
    )
      .then(response => {
        setTrips(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="trip-dashboard">
      <h1>Trip Dashboard</h1>
      {loading ? (
        <p>Loading trips...</p>
      ) : (
        <div className="trip-list">
          {trips.length === 0 ? (
            <p>No trips available.</p>
          ) : (
            trips.map(trip => (
              <div className="trip-item" key={trip.id} onClick={() => navigate('/trip', { state: { tripData: trip } })}>
                <p><strong>Location:</strong> {trip.location}</p>
                <p><strong>Dates:</strong> {formatDates(trip.start_date, trip.end_date)}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function formatDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStart = `${start.getDate()}/${start.getMonth() + 1}`;
  const formattedEnd = `${end.getDate()}/${end.getMonth() + 1}`;

  return `${formattedStart} - ${formattedEnd}`;
}

export default TripDashboard;
