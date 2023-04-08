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
  console.log("WeatherData", weatherData);

  return (
    <>
      {/* {weatherData && ( */}
      <div className="flex flex-col items-center mb-4 p-4">
        <div className="flex flex-col items-center">
          <p className=" text-4xl mb-4 text-shadow-engraved">
            {weatherData
              ? `${weatherData.name}, ${weatherData.sys.country}`
              : `Localisation`}
          </p>
          <p className="text-6xl mb-4">
            {weatherData
              ? `${kelvinToCelsius(weatherData.main.temp)}°C`
              : `Temperature`}

            {/* {kelvinToFahrenheit(weatherData.main.temp)}°F */}
          </p>
          <p className="text-4xl mb-4">
            {weatherData
              ? `${capitalizeFirstLetter(weatherData.weather[0].description)}`
              : `Weather`}
          </p>
        </div>
        <div className="flex flex-row max-w-max items-center">
          <div className="flex flex-col text-right justify-between w-72 h-24">
            <div className="flex items-center justify-end">
              <p>
                {weatherData
                  ? ` ${kelvinToCelsius(weatherData.main.feels_like)}°C`
                  : `N/A`}
              </p>
              <img
                src={icons.feelsLike}
                alt="Feels like icon"
                className="h-6 ml-3"
              />
            </div>

            <div className="flex items-center justify-end">
              <p>{weatherData ? `${weatherData.main.humidity}%` : `N/A`}</p>
              <img
                src={icons.humidity}
                alt="Humidity icon"
                className="h-6 ml-3"
              />
            </div>
            <div className="flex items-center justify-end">
              <p>{weatherData ? `${weatherData.wind.speed} m/s` : `N/A`}</p>
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
              <p>{weatherData ? `${weatherData.main.pressure} hPa` : `N/A`}</p>
            </div>
            <div className=" flex items-center">
              <img
                src={icons.sunrise}
                alt="Sunrise icon"
                className=" h-6 mr-3"
              />
              <p>
                {weatherData
                  ? `${convertToLocalTime(
                      weatherData.sys.sunrise,
                      weatherData.timezone
                    )}`
                  : `N/A`}
              </p>
            </div>
            <div className=" flex items-center">
              <img src={icons.sunset} alt="SunSet icon" className=" h-6 mr-3" />
              <p>
                {weatherData
                  ? `${convertToLocalTime(
                      weatherData.sys.sunset,
                      weatherData.timezone
                    )}`
                  : `N/A`}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default MainWeatherInfo;
