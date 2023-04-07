import React from "react";
import {
  convertToLocalTime,
  kelvinToCelsius,
  capitalizeFirstLetter,
  // kelvinToFahrenheit,
} from "../utils/functions";
import { WeatherData } from "../utils/types";
import { icons } from "../utils/functions";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
}

const MainWeatherInfo = ({ weatherData }: WeatherInfoProps) => {
  if (!weatherData) {
    return <h3>No data to display</h3>;
  }
  console.log("WeatherData", weatherData);

  return (
    <div className="flex flex-col items-center mb-4 p-4">
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
          <div className="flex items-center justify-end">
            <p>{kelvinToCelsius(weatherData.main.feels_like)}°C</p>
            <img
              src={icons.feelsLike}
              alt="Feels like icon"
              className="h-6 ml-3"
            />
          </div>

          <div className="flex items-center justify-end">
            <p>{weatherData.main.humidity}%</p>
            <img
              src={icons.humidity}
              alt="Humidity icon"
              className="h-6 ml-3"
            />
          </div>
          <div className="flex items-center justify-end">
            <p>{weatherData.wind.speed} m/s</p>
            <img
              src={icons.windSpeed}
              alt="Humidity icon"
              className="h-6 ml-3"
            />
          </div>
        </div>
        <div className="h-20 w-1 shadow-neumorphicLine rounded-lg mx-8"></div>
        <div className="flex flex-col justify-between w-72 h-24">
          <div className=" flex items-center">
            <img
              src={icons.pressure}
              alt="Pressure icon"
              className=" h-6 mr-3"
            />
            <p>{weatherData.main.pressure} hPa</p>
          </div>
          <div className=" flex items-center">
            <img src={icons.sunrise} alt="Sunrise icon" className=" h-6 mr-3" />
            <p>
              {convertToLocalTime(
                weatherData.sys.sunrise,
                weatherData.timezone
              )}
            </p>
          </div>
          <div className=" flex items-center">
            <img src={icons.sunset} alt="SunSet icon" className=" h-6 mr-3" />
            <p>
              {convertToLocalTime(weatherData.sys.sunset, weatherData.timezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherInfo;
