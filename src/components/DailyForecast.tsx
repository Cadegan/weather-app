/**
 * A React component for displaying daily weather forecast information
 * @file DailyForecast component.
 * @module components/DailyForecast
 */

import React from "react";
import {
  kelvinToCelsius,
  weatherIcons,
  capitalizeFirstLetter,
} from "../utils/functions";
import { ForecastData } from "../utils/types";
import SkeletonLoader from "./SkeletonLoader";

interface ForecastInfoProps {
  forecastData: ForecastData | null;
  isLoading: boolean;
}

const getDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString();

/**
 * The function creates daily weather data by reducing a list of weather items and grouping them by
 * date while also calculating the minimum and maximum temperature for each day.
 * @param {any[]} list - The `list` parameter is an array of objects representing weather data for
 * different dates. Each object in the array should have properties such as `dt` (date and time),
 * `weather` (an array of weather conditions), and `main` (an object with temperature information).
 * @returns The function `createDailyData` is returning an object that contains daily weather data. The
 * object is created by using the `reduce` method on an array of weather data. The keys of the object
 * are the dates of the weather data, and the values are objects that contain the minimum and maximum
 * temperature and the weather condition for that date.
 */
const createDailyData = (list: any[]) => {
  return list.reduce((accumulator, item) => {
    const date = getDate(item.dt);
    accumulator[date] = accumulator[date] || {
      date,
      weather: item.weather,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
    };
    accumulator[date].temp_min = Math.min(
      accumulator[date].temp_min,
      item.main.temp_min
    );
    accumulator[date].temp_max = Math.max(
      accumulator[date].temp_max,
      item.main.temp_max
    );
    accumulator[date].weather = item.weather;
    return accumulator;
  }, {});
};

const DailyForecast = ({ forecastData, isLoading }: ForecastInfoProps) => {
  const numDays = forecastData
    ? new Set(forecastData.list.map((item) => getDate(item.dt))).size
    : 6;
  const dailyData = forecastData ? createDailyData(forecastData.list) : {};

  const dailyForecastElements = isLoading
    ? Array(numDays)
        .fill(0)
        .map((_, index) => <SkeletonLoader key={index} />)
    : Object.values(dailyData).map((data: any, index: number) => (
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
      ));

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-nowrap overflow-x-auto p-4">
        {dailyForecastElements}
      </div>
    </div>
  );
};

export default DailyForecast;
