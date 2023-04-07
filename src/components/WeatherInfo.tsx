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
  console.log("WeatherData", weatherData);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center">
        <p className="text-5xl mb-4">
          {weatherData.name}, {weatherData.sys.country}
        </p>
        <p className="text-5xl mb-4">
          {kelvinToCelsius(weatherData.main.temp)}°C
        </p>
      </div>
      <div className="flex flex-row w-96 justify-between items-center">
        <div className="flex flex-col text-right justify-between w-72 h-24">
          <p>
            Description:{" "}
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
        </div>
        <div className="h-20 w-1 shadow-neumorphicLine rounded-lg"></div>
        <div className="flex flex-col justify-between w-72 h-24">
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
