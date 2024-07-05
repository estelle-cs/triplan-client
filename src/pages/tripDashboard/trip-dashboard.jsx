import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './trip-dashboard.css';
import {
  SunOutlined
} from "@ant-design/icons";

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
    <section>
      <h1 className="title-s">Mon dashboard</h1>
      {loading ? (
        <p>Loading trips...</p>
      ) : (
        <div className="trip-list">
          {trips.length === 0 ? (
            <p>Vous n'avez pas de trip en cours. </p>
          ) : (
            trips.map(trip => (
              <div className="trip-item" key={trip.id} onClick={() => navigate('/trip', { state: { tripData: trip } })}>
                <p className="body-l trip-destination"><SunOutlined />{trip.location}</p>
                <p className="body-m"><strong>Dates:</strong> {formatDates(trip.start_date, trip.end_date)}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
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
