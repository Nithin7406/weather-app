import React from "react";

function Forecast({ data }) {
  const forecastDays = data.list
    .filter((reading, index) => index % 8 === 0)
    .slice(1, 5);

  const getDayName = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "long" });
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
        </div>
      ))}
    </div>
  );
}

export default Forecast;
