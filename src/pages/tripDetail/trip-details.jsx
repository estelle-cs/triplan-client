import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./trip-details.css";
import "../newTrip/newTrip.css";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";

function TripDetails({ userId }) {
  const location = useLocation();
  const { tripData } = location.state || {};
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: tripData?.id || "",
    location: tripData?.location || "",
    start_date: tripData?.start_date || "",
    end_date: tripData?.end_date || "",
    transports: tripData?.transports || "",
    hostings: tripData?.hostings || "",
    activities: tripData?.activities || "",
  });

  useEffect(() => {
    if (tripData) {
      setFormData({
        location: tripData.location || "",
        start_date: tripData.start_date || "",
        end_date: tripData.end_date || "",
        transports: tripData.transports || "",
        hostings: tripData.hostings || "",
        activities: tripData.activities || "",
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
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/trip/updateTrip`, {
        userId: userId,
        id: tripData.id,
        formData,
      })
      .then((response) => {
        setIsEditing(false);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error updating trip:", error));
  };

  const handleDeleteTrip = async (userId, tripId) => {
    try {
      const response = await axios.post('http://localhost:3000/trip/deleteTrip', { userId, id: tripId });
      if (response.data == true) {
        navigate("/dashboard");
      } else {
        console.error('Error deleting trip:', response.data);
      }
    } catch (error) {
      console.error('Failed to delete trip', error);
    }
  };

  return (
    <section>
      <div className="trip-infos-div">
        <h1 className="title-s">Voyage à {tripData?.location}</h1>
        <p className="title-subtitle trip-dates">
          {formatDates(tripData.start_date, tripData.end_date)}
        </p>
      </div>
      {tripData ? (
        isEditing ? (
          <form className="trip-form" onSubmit={handleSubmit}>
            <div className="input-container-edit">
              <div className="input-group">
                <label className="body-m">Destination </label>
                <input
                  type="text"
                  name="location"
                  className="input"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label className="body-m">Date de début</label>
                <input
                  type="date"
                  name="start_date"
                  className="input"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label className="body-m">Date de fin</label>
                <input
                  type="date"
                  name="end_date"
                  className="input"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label className="body-m">Transports</label>
                <input
                  type="text"
                  name="transports"
                  className="input"
                  value={formData.transports}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label className="body-m">Hébergements</label>
                <input
                  type="text"
                  name="hostings"
                  className="input"
                  value={formData.hostings}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label className="body-m">Activités</label>
                <input
                  type="text"
                  name="activities"
                  className="input"
                  value={formData.activities}
                  onChange={handleChange}
                />
              </div>
              <div className="buttons-edit-div">
                <button className="body-m submit-button" type="submit">
                Modifier
              </button>
              <button className="body-m cancel-button" type="button" onClick={() => setIsEditing(false)}>
                Annuler
              </button>
              </div>
              
            </div>
          </form>
        ) : (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBorderColor: "var(--dark)",
                  defaultHoverColor: "var(--dark)",
                },
              },
            }}
          >
            <section>
              <div className="trip-info">
                <p className="title-subtitle trip-detail-title">Transports</p>
                <p>
                  {tripData.transports ? (
                    <span className="body-s">{tripData.transports}</span>
                  ) : (
                    <span className="no-data-message">
                      Aucun moyen de transport ajouté
                    </span>
                  )}
                </p>
                <Button
                  className="button-add"
                  onClick={handleEdit}
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </div>
              <div className="trip-info">
                <p className="title-subtitle trip-detail-title">Hébergements</p>
                <p>
                  {tripData.hostings ? (
                    <span className="body-s">{tripData.hostings}</span>
                  ) : (
                    <span className="no-data-message">
                      Aucun hébergement ajouté
                    </span>
                  )}
                </p>
                <Button
                  className="button-add"
                  onClick={handleEdit}
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </div>
              <div className="trip-info">
                <p className="title-subtitle trip-detail-title">Activités</p>
                <p>
                  {tripData.activities ? (
                    <span className="body-s">{tripData.activities}</span>
                  ) : (
                    <span className="no-data-message">
                      Aucune activité ajoutée
                    </span>
                  )}
                </p>
                <Button
                  className="button-add"
                  onClick={handleEdit}
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </div>
              <Button
                className="button-edit"
                onClick={handleEdit}
                icon={<EditOutlined />}
              >
                Modifier le trip
              </Button>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTrip(userId, tripData.id)}>
                Supprimer le trip
              </Button>
            </section>
          </ConfigProvider>
        )
      ) : (
        <p>Aucun trip disponible.</p>
      )}
    </section>
  );
}

export default TripDetails;
