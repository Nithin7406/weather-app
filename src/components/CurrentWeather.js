import React from "react";

function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <h2>Today</h2>
      <h1>{data.name}</h1>
      <img
        className="main-icon"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div className="TempDetail">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <p className="description">{data.weather[0].description}</p>

        {/* Additional Weather Details */}
        <p>Feels Like: {Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
        <p>
          High: {Math.round(data.main.temp_max)}°C / Low:{" "}
          {Math.round(data.main.temp_min)}°C
        </p>
      </div>
    </div>
  );
}

export default CurrentWeather;
