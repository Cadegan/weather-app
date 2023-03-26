import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
// const cloudIcon = require("./assets/cloud.png");

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; humidity: number; pressure: number };
  weather: { icon: string; main: string; description: string }[];
  wind: { speed: number };
  timezone: number;
}

interface ForecastData {
  list: {
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: { icon: string; main: string; description: string }[];
  }[];
}

const App = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = "https://api.openweathermap.org/data/2.5/";
  const apiUrl = `${baseUrl}weather?q=${city}&appid=${apiKey}`;
  const forecastApiUrl = `${baseUrl}forecast?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse: AxiosResponse<WeatherData> =
          await axios.get<WeatherData>(apiUrl);
        setWeatherData(weatherResponse.data);
        console.log(weatherResponse);

        const forecastResponse: AxiosResponse<ForecastData> =
          await axios.get<ForecastData>(forecastApiUrl);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (city !== "") {
      fetchWeatherData();
    }
  }, [apiUrl, city, forecastApiUrl]);

  const handleSearch = () => {
    setCity(searchText);
  };

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

  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  const renderDailyForecast = (forecastData: ForecastData) => {
    const dailyData = forecastData.list.reduce((accumulator: any, item) => {
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
      }
      return accumulator;
    }, {});

    return Object.values(dailyData).map((data: any, index: number) => (
      <div key={index} className="daily-forecast">
        <p>{data.date}</p>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
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

  const weatherIcons = (main: string) => {
    const icons = {
      clear: require("./assets/sun.png"),
      clouds: require("./assets/cloud.png"),
      partlyCloudy: require("./assets/sun-cloud.png"),
      rain: require("./assets/rain.png"),
      snow: require("./assets/snow.png"),
    };

    const iconKey = Object.keys(icons).find(
      (key) => key === main
    ) as keyof typeof icons;
    return icons[iconKey] || "/assets/default.png";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        {/* <img alt="Sun" src={sunIcon}></img> */}
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Enter a location"
        />
        <button onClick={handleSearch}>Search</button>
        {weatherData ? (
          <div className="weather-container">
            <p>
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
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
              {convertToLocalTime(
                weatherData.sys.sunrise,
                weatherData.timezone
              )}
            </p>
            <p>
              Sunset:{" "}
              {convertToLocalTime(weatherData.sys.sunset, weatherData.timezone)}
            </p>
          </div>
        ) : (
          <h3>No data to display</h3>
        )}
        {forecastData ? (
          <div className="forecast-container">
            {renderDailyForecast(forecastData)}
          </div>
        ) : (
          <h3>No forecast data to display</h3>
        )}
      </header>
    </div>
  );
};

export default App;
