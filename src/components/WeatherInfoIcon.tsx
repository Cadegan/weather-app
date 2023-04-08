import React from "react";
import { weatherIcons } from "../utils/functions";
import { WeatherData } from "../utils/types";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
}

const MainWeatherIcon = ({ weatherData }: WeatherInfoProps) => {
  return (
    <>
      {weatherData && (
        <div className="weather-icon-wrapper absolute z-50 -right-20 -top-10 overflow-x-hidden">
          <img
            src={weatherIcons(weatherData.weather[0].description.toLowerCase())}
            alt="weather icon"
            className="h-80"
          />
        </div>
      )}
    </>
  );
};

export default MainWeatherIcon;
