import React from "react";

interface WeatherInfoProps {
  weatherData: {
    name: string;
    sys: { country: string; sunrise: number; sunset: number };
    main: { temp: number; humidity: number; pressure: number };
    weather: { icon: string; main: string; description: string }[];
    wind: { speed: number };
    timezone: number;
  } | null;
}

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

const convertToLocalTime = (
  timestamp: number,
  timezoneOffset: number
): string => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localTimestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const weatherIcons = (main: string) => {
  const icons = {
    clear: require("../assets/sun.png"),
    clouds: require("../assets/cloud.png"),
    partlyCloudy: require("../assets/sun-cloud.png"),
    rain: require("../assets/rain.png"),
    snow: require("../assets/snow.png"),
  };

  const iconKey = Object.keys(icons).find(
    (key) => key === main
  ) as keyof typeof icons;
  return icons[iconKey];
};

const WeatherInfo = ({ weatherData }: WeatherInfoProps) => {
  if (!weatherData) {
    return <h3>No data to display</h3>;
  }

  return (
    <div className="weather-container">
      <p>
        {weatherData.name}, {weatherData.sys.country}
      </p>
      <p>{kelvinToCelsius(weatherData.main.temp)}°C</p>
      <img
        src={weatherIcons(weatherData.weather[0].main.toLowerCase())}
        alt="weather icon"
      />
      <p>{weatherData.weather[0].main}</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>
        Sunrise:{" "}
        {convertToLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
      </p>
      <p>
        Sunset:{" "}
        {convertToLocalTime(weatherData.sys.sunset, weatherData.timezone)}
      </p>
    </div>
  );
};

export default WeatherInfo;
