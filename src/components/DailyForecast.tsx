import React from "react";
import { kelvinToCelsius, weatherIcons } from "../utils";
import "./DailyForecast.css";

interface ForecastData {
  list: {
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: { icon: string; main: string; description: string }[];
  }[];
}

interface ForecastInfoProps {
  forecastData: ForecastData | null;
}

const DailyForecast = ({ forecastData }: ForecastInfoProps): JSX.Element => {
  const renderDailyForecast = (forecastData: ForecastData) => {
    const dailyData = forecastData.list.reduce(
      (accumulator: Record<string, any>, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!accumulator[date]) {
          accumulator[date] = {
            date,
            weather: item.weather,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
          };
        } else {
          accumulator[date].temp_min = Math.min(
            accumulator[date].temp_min,
            item.main.temp_min
          );
          accumulator[date].temp_max = Math.max(
            accumulator[date].temp_max,
            item.main.temp_max
          );
          accumulator[date].weather = item.weather;
        }
        return accumulator;
      },
      {}
    );

    return (
      <div className="flex flex-nowrap overflow-x-auto p-4">
        {Object.values(dailyData).map((data: any, index: number) => (
          <div key={index} className="dailyForecastCard">
            <img
              src={weatherIcons(data.weather[0].main.toLowerCase())}
              alt="weather icon"
              className="w-12 h-12 mb-2"
            />
            <div className="text-center">
              <p className="font-semibold text-lg">{data.date}</p>
              <p className="text-gray-600">{data.weather[0].main}</p>
            </div>
            <div className="flex items-center justify-between mt-4 w-full text-center">
              <p className="text-gray-600">
                Min: {kelvinToCelsius(data.temp_min)}°C
              </p>
              <p className="text-gray-600">
                Max: {kelvinToCelsius(data.temp_max)}°C
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

export default DailyForecast;
