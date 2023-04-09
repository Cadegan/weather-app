import React from "react";
import {
  kelvinToCelsius,
  weatherIcons,
  capitalizeFirstLetter,
} from "../utils/functions";
import "./DailyForecast.css";
import { ForecastData } from "../utils/types";

interface ForecastInfoProps {
  forecastData: ForecastData | null;
}

const DailyForecast = ({ forecastData }: ForecastInfoProps) => {
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
          <div
            key={index}
            className="relative flex flex-col justify-center items-center rounded-3xl m-4 py-4 px-6 h-72 min-w-[175px] max-w-[175px] shadow-neumorphicCard hover:shadow-neumorphicCardOver transition transform duration-500 ease-in-out"
          >
            <img
              src={weatherIcons(data.weather[0].description.toLowerCase())}
              alt="weather icon"
              className="mb-2 w-24"
            />
            <div className="text-center">
              <p className="font-semibold text-lg">{data.date}</p>
              <p className="text-gray-600">
                {capitalizeFirstLetter(data.weather[0].description)}
              </p>
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
    return <h3 className="flex justify-center">No forecast data to display</h3>;
  }

  return (
    <div className="flex justify-center items-center bg-[#f2f2f2]">
      {renderDailyForecast(forecastData)}
    </div>
  );
};

export default DailyForecast;
