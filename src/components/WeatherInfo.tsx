import React from "react";
import { convertToLocalTime, kelvinToCelsius, weatherIcons } from "./utils";

interface WeatherInfoProps {
  weatherData: {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: { temp: number; humidity: number; pressure: number };
    weather: { icon: string; main: string; description: string }[];
    wind: { speed: number };
    timezone: number;
  } | null;
}

const WeatherInfo = ({ weatherData }: WeatherInfoProps) => {
  if (!weatherData) {
    return <h3>No data to display</h3>;
  }

  return (
    <div className="weather-container">
      <p>
        {weatherData.name}, {weatherData.sys.country}
      </p>
      <p>{kelvinToCelsius(weatherData.main.temp)}°C</p>
      <img
        src={weatherIcons(weatherData.weather[0].main.toLowerCase())}
        alt="weather icon"
      />
      <p>{weatherData.weather[0].main}</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>
        Sunrise:{" "}
        {convertToLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
      </p>
      <p>
        Sunset:{" "}
        {convertToLocalTime(weatherData.sys.sunset, weatherData.timezone)}
      </p>
    </div>
  );
};

export default WeatherInfo;
