import React from "react";
import { convertToLocalTime, kelvinToCelsius, weatherIcons } from "../utils";
import "./DailyForecast.css";

interface ForecastData {
  //   city: { timezone: number };
  list: {
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: { icon: string; main: string; description: string }[];
  }[];
}

interface ForecastInfoProps {
  forecastData: ForecastData | null;
  timezoneOffset: number;
}

const HouryForecast = ({ forecastData }: ForecastInfoProps): JSX.Element => {
  console.log("HouryForecast forecastData", forecastData);
  const renderDailyForecast = (forecastData: ForecastData) => {
    const today = new Date().toISOString().split("T")[0];

    const hourlyData = forecastData.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000).toISOString().split("T")[0];
      return itemDate === today;
    });

    return (
      <div className="flex flex-nowrap overflow-x-auto p-4">
        {hourlyData.map((data: any, index: number) => (
          <div key={index} className="dailyForecastCard">
            <img
              src={weatherIcons(data.weather[0].main.toLowerCase())}
              alt="weather icon"
              className="w-12 h-12 mb-2"
            />
            <div className="text-center">
              <p className="font-semibold text-lg">
                {new Date(data.dt * 1000).toLocaleTimeString()}
              </p>
              <p className="text-gray-600">{data.weather[0].main}</p>
            </div>
            <div className="flex items-center justify-between mt-4 w-full text-center">
              <p className="text-gray-600">
                Temp: {kelvinToCelsius(data.main.temp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!forecastData) {
    return <h3>No forecast data to display</h3>;
  }

  return (
    <div className="forecast-container">
      {renderDailyForecast(forecastData)}
    </div>
  );
};

export default HouryForecast;
