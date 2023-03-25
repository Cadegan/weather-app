import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
// import sun from "../src/assets/sun.svg";
// import sunIcon from "../src/assets/sun.svg";

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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    if (city !== "") {
      axios
        .get<WeatherData>(apiUrl)
        .then((response: AxiosResponse<WeatherData>) => {
          console.log(response.data);
          setWeatherData(response.data);
        });
    }
  }, [apiUrl, city]);

  useEffect(() => {
    if (city !== "") {
      axios
        .get<ForecastData>(forecastApiUrl)
        .then((response: AxiosResponse<ForecastData>) => {
          console.log(response.data);
          setForecastData(response.data);
        });
    }
  }, [forecastApiUrl, city]);

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
          Min: {Math.round(data.temp_min - 273.15)}°C / Max:{" "}
          {Math.round(data.temp_max - 273.15)}°C
        </p>
      </div>
    ));
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
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
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
