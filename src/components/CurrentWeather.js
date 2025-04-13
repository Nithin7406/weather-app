import React from "react";

function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <h2>Today</h2>
      <h1>{data.name}</h1>
      <p>Temperature: {Math.round(data.main.temp)}°C</p>
      <p>{data.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}

export default CurrentWeather;
