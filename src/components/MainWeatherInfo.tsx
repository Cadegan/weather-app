import React from "react";
import {
  convertToLocalTime,
  kelvinToCelsius,
  capitalizeFirstLetter,
  // kelvinToFahrenheit,
} from "../utils/functions";
import { WeatherData } from "../utils/types";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
}

const MainWeatherInfo = ({ weatherData }: WeatherInfoProps) => {
  if (!weatherData) {
    return <h3>No data to display</h3>;
  }
  console.log("WeatherData", weatherData);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center">
        <p className=" text-4xl mb-4 text-shadow-engraved">
          {weatherData.name}, {weatherData.sys.country}
        </p>
        <p className="text-6xl mb-4">
          {kelvinToCelsius(weatherData.main.temp)}°C
          {/* {kelvinToFahrenheit(weatherData.main.temp)}°F */}
        </p>
        <p className="text-4xl mb-4">
          {capitalizeFirstLetter(weatherData.weather[0].description)}
        </p>
      </div>
      <div className="flex flex-row max-w-max items-center">
        <div className="flex flex-col text-right justify-between w-72 h-24">
          <p>Feels like: {kelvinToCelsius(weatherData.main.feels_like)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
        </div>
        <div className="h-20 w-1 shadow-neumorphicLine rounded-lg mx-8"></div>
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

export default MainWeatherInfo;
