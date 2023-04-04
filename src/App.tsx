import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
// import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import DailyForecast from "./components/DailyForecast";
import HouryForecast from "./components/HourForcast";
import MainWeatherIcon from "./components/WeatherInfoIcon";

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
  const [city, setCity] = useState<string>("");

  const apiKey = process.env.REACT_APP_API_KEY as string;
  const baseUrl = "https://api.openweathermap.org/data/2.5/";
  const apiUrl = `${baseUrl}weather?q=${city}&appid=${apiKey}`;
  const forecastApiUrl = `${baseUrl}forecast?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    const testApi = async (apiUrl: string) => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status >= 400) {
          return false;
        }
        return response.status === 200;
      } catch (error) {
        console.error("Error testing API:", error);
        return false;
      }
    };

    const handleCityNotFound = () => {
      setWeatherData(null);
      setForecastData(null);
      alert("City not found, please check your spelling");
    };

    const fetchWeatherData = async () => {
      if (!(await testApi(apiUrl)) || !(await testApi(forecastApiUrl))) {
        console.error("API not available");
        handleCityNotFound();
        return;
      }

      try {
        const weatherResponse: AxiosResponse<WeatherData> =
          await axios.get<WeatherData>(apiUrl);

        setWeatherData(weatherResponse.data);
        console.log("weatherResponse", weatherResponse);

        const forecastResponse: AxiosResponse<ForecastData> =
          await axios.get<ForecastData>(forecastApiUrl);

        setForecastData(forecastResponse.data);
        console.log("forecastResponse", forecastResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        handleCityNotFound();
      }
    };

    if (city !== "") {
      fetchWeatherData();
    }
  }, [apiUrl, city, forecastApiUrl]);

  return (
    <div className="App relative overflow-x-hidden">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        {weatherData && <MainWeatherIcon weatherData={weatherData} />}
        <SearchBar onSearch={setCity}></SearchBar>
        {weatherData ? (
          <WeatherInfo weatherData={weatherData} />
        ) : weatherData === false ? (
          <h3>Something went wrong. Please try again later.</h3>
        ) : (
          <h3>No data to display</h3>
        )}
        {forecastData && weatherData ? (
          <HouryForecast
            forecastData={forecastData}
            timezoneOffset={weatherData?.timezone || 0}
          />
        ) : (
          <h3>No hourly forecast data to display</h3>
        )}
        {forecastData ? (
          <DailyForecast forecastData={forecastData}></DailyForecast>
        ) : forecastData === false ? (
          <h3>Something went wrong. Please try again later.</h3>
        ) : (
          <h3>No data to display</h3>
        )}
      </main>
    </div>
  );
};

export default App;
