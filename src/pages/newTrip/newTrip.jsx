import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./newTrip.css";

function App({ userId}) {
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    if (!location) {
      setErrorMessage("Location is required.");
    } else {
      setErrorMessage("");
      const tripInfo = { location, start_date, end_date };
      axios
        .post("http://localhost:3000/trip/createPublicTrip", {
          ...tripInfo,
          userId: userId,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/trip", { state: { tripData: response.data } });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section>
      <h1 className="title-s">Quelle sera ta prochaine aventure ?</h1>
      <div className="input-container">
        <div className="input-group">
          <label className="body-m" htmlFor="location">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-group">
          <label className="body-m" htmlFor="startDate">
            Date de début :
          </label>
          <input
            className="input"
            type="date"
            id="startDate"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="body-m" htmlFor="endDate">
            Date de fin :
          </label>
          <input
            className="input"
            type="date"
            id="endDate"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button className="body-m submit-button" onClick={handleStartPlanning}>
          Commencer à planifier
        </button>
      </div>
    </section>
  );
}

export default App;
