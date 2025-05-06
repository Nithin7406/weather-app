import React from "react";

function Forecast({ data }) {
  const forecastDays = data.list
    .filter((reading, index) => index % 8 === 0)
    .slice(1, 5); // 4 upcoming days

  const getDayName = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, etc.
  };

  return (
    <div className="forecast">
      {forecastDays.map((item, index) => (
        <div className="forecast-day" key={index}>
          <h3>{getDayName(item.dt_txt)}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>{Math.round(item.main.temp)}°C</p>
          <p style={{ textTransform: "capitalize" }}>
            {item.weather[0].description}
          </p>
          <p>Humidity: {item.main.humidity}%</p>
          <p>
            Min: {Math.round(item.main.temp_min)}°C / Max:{" "}
            {Math.round(item.main.temp_max)}°C
          </p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
