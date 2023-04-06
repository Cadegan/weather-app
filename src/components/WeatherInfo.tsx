import React from "react";
import {
  convertToLocalTime,
  kelvinToCelsius,
  capitalizeFirstLetter,
} from "../utils/functions";

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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <p className="text-5xl mb-4">
          {weatherData.name}, {weatherData.sys.country}
        </p>
        <p className="text-5xl mb-4">
          {kelvinToCelsius(weatherData.main.temp)}°C
        </p>
      </div>
      <div className="flex flex-row">
        <div>
          <p>{capitalizeFirstLetter(weatherData.weather[0].description)}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
        </div>
        <div className="h-auto w-1 shadow-neumorphicBorderOver rounded-lg"></div>
        <div>
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
      </div>
    </div>
  );
};

export default WeatherInfo;
