import React from "react";
import {
  convertToLocalTime,
  capitalizeFirstLetter,
  kelvinToCelsius,
  weatherIcons,
} from "../utils/functions";
// import "./DailyForecast.css";
import { ForecastData } from "../utils/types";

interface ForecastInfoProps {
  forecastData: ForecastData | null;
  timezoneOffset: number;
}

const HourlyForecast = ({
  forecastData,
  timezoneOffset,
}: ForecastInfoProps) => {
  console.log("HourlyForecast forecastData", forecastData);

  const today = new Date().toISOString().split("T")[0];

  const hourlyData = forecastData
    ? forecastData.list.filter((item) => {
        const itemDate = new Date(item.dt * 1000).toISOString().split("T")[0];
        return itemDate === today;
      })
    : [];

  return (
    <>
      {forecastData && (
        <div className="flex justify-center items-center shadow-neumorphicBorderOver">
          <div className="flex flex-nowrap overflow-x-auto p-4">
            {hourlyData.map((data: any, index: number) => (
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
                  <p className="font-semibold text-lg">
                    {convertToLocalTime(data.dt, timezoneOffset)}
                  </p>
                  <p className="text-gray-600">
                    {capitalizeFirstLetter(data.weather[0].description)}
                  </p>
                </div>
                <div className="mt-4 w-full text-center">
                  <p className="text-gray-600 ">
                    Temp: {kelvinToCelsius(data.main.temp)}°C
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HourlyForecast;
