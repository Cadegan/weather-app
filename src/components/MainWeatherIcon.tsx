/**
 * A React component for displaying MainWeatherIcon forecast information
 * @file MainWeatherIcon component.
 * @module components/MainWeatherIcon
 */

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
        <div className="hidden lg:block lg:absolute lg:z-50 lg:-right-20 lg:-top-10 lg:overflow-x-hidden">
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
