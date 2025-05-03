import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import weatherImage from "./assets/weather.png";

const API_KEY = "7e87948002156bfcf9993502016e2660";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    const current = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    setLoading(true);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(current),
        axios.get(forecast),
      ]);
      setWeatherData({
        current: currentRes.data,
        forecast: forecastRes.data,
      });
      setError(null);
    } catch (err) {
      setError("❌ City not found. Please try another one.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getTempTheme = () => {
    if (!weatherData) return "";
    const temp = weatherData.current.main.temp;
    if (temp < 10) return "cold";
    if (temp >= 10 && temp < 25) return "mild";
    return "hot";
  };

  return (
    <div className={`app ${getTempTheme()}`} style={{ position: "relative" }}>
      <div
        className="background"
        style={{
          backgroundImage: `url(${weatherImage})`,
        }}
      />
      <div className="overlay" />
      <div className="content">
        <SearchBar onSearch={fetchWeather} />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-box"
            >
              <div className="loading">🔄 Fetching latest weather data...</div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="error-box"
            >
              <div className="error-message">{error}</div>
            </motion.div>
          )}

          {weatherData ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="weather-box"
            >
              <div className="weather-content">
                <CurrentWeather data={weatherData.current} />
                <Forecast data={weatherData.forecast} />
              </div>
            </motion.div>
          ) : (
            !loading && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="placeholder"
              >
                🌤️ Start by entering a city name to check its weather
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
