import React from "react";
import { weatherIcons } from "../utils/functions";

interface WeatherInfoProps {
  weatherData: {
    // name: string;
    // sys: { country: string; sunrise: number; sunset: number };
    // main: { temp: number; humidity: number; pressure: number };
    weather: { icon: string; main: string; description: string }[];
    // wind: { speed: number };
    // timezone: number;
  } | null;
}

const MainWeatherIcon = ({ weatherData }: WeatherInfoProps) => {
  // if (!weatherData) {
  //   return <h3>No data to display</h3>;
  // }

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
