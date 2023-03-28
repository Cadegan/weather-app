import React from "react";
import { kelvinToCelsius, weatherIcons } from "../utils";

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

    return Object.values(dailyData).map((data: any, index: number) => (
      <div key={index} className="daily-forecast">
        <p>{data.date}</p>
        <img
          src={weatherIcons(data.weather[0].main.toLowerCase())}
          alt="weather icon"
        />
        <p>{data.weather[0].main}</p>
        <p>
          Min: {kelvinToCelsius(data.temp_min)}°C / Max:{" "}
          {kelvinToCelsius(data.temp_max)}°C
        </p>
      </div>
    ));
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
