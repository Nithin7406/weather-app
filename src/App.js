import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";
import weatherImage from "./assets/weather.png"; // Import the image correctly

const API_KEY = "7e87948002156bfcf9993502016e2660";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    const current = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    setLoading(true); // Start loading
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(current),
        axios.get(forecast),
      ]);
      setWeatherData({
        current: currentRes.data,
        forecast: forecastRes.data,
      });
      setError(null); // Reset error state
    } catch (err) {
      setError("City not found!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const appStyle = {
    backgroundImage: `url(${weatherImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <div className="app" style={appStyle}>
      <SearchBar onSearch={fetchWeather} />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {weatherData ? (
        <>
          <CurrentWeather data={weatherData.current} />
          <Forecast data={weatherData.forecast} />
        </>
      ) : (
        !loading && (
          <div className="placeholder">
            Please enter a city to get the weather
          </div>
        )
      )}
    </div>
  );
}

export default App;
