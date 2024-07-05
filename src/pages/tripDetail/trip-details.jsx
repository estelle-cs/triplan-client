import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './trip-details.css';

function TripDetails({ userId }) {
  const location = useLocation();
  const { tripData } = location.state || {};
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: tripData?.id || '',
    location: tripData?.location || '',
    start_date: tripData?.start_date || '',
    end_date: tripData?.end_date || '',
    transports: tripData?.transports || '',
    hostings: tripData?.hostings || '',
    activities: tripData?.activities || ''
  });

  useEffect(() => {
    if (tripData) {
      setFormData({
        location: tripData.location || '',
        start_date: tripData.start_date || '',
        end_date: tripData.end_date || '',
        transports: tripData.transports || '',
        hostings: tripData.hostings || '',
        activities: tripData.activities || ''
      });
    }
  }, [tripData]);

  const formatDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStart = `${start.getDate()}/${start.getMonth() + 1}`;
    const formattedEnd = `${end.getDate()}/${end.getMonth() + 1}`;

    return `${formattedStart} - ${formattedEnd}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/trip/updateTrip`, {
      userId: userId,
      id: tripData.id,
      formData
    })
      .then(response => {
        setIsEditing(false);
        navigate('/dashboard');
      })
      .catch(error => console.error('Error updating trip:', error));
  };

  return (
    <div className="trip-details">
      <h1>Trip Details</h1>
      {tripData ? (
        isEditing ? (
          <form className="trip-form" onSubmit={handleSubmit}>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Transports:</label>
              <input
                type="text"
                name="transports"
                value={formData.transports}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Hostings:</label>
              <input
                type="text"
                name="hostings"
                value={formData.hostings}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Activities:</label>
              <input
                type="text"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="trip-info">
            <p><strong>Trip to {tripData.location}</strong></p>
            <p>{formatDates(tripData.start_date, tripData.end_date)}</p>
            <p><strong>Transports:</strong> {tripData.transports}</p>
            <p><strong>Hostings:</strong> {tripData.hostings}</p>
            <p><strong>Activities:</strong> {tripData.activities}</p>
            <button className="edit-button" onClick={handleEdit}>Edit</button>
          </div>
        )
      ) : (
        <p>No trip data available.</p>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <button className="back-button" onClick={() => navigate('/dashboard')}>To Dashboard</button>
    </div>
  );
}

export default TripDetails;
