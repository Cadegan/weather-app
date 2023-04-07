import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import DailyForecast from "./components/DailyForecast";
import HouryForecast from "./components/HourForcast";
import MainWeatherIcon from "./components/WeatherInfoIcon";
import { WeatherData, ForecastData } from "./utils/types";
import { fetchForecastData, fetchWeatherData, testApi } from "./api/weatherApi";

const App = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [city, setCity] = useState<string>("");

  function renderMessage(data: WeatherData | ForecastData | null) {
    if (data) {
      return null;
    } else if (data === null) {
      return <h3>No data to display</h3>;
    } else {
      return <h3>Something went wrong. Please try again later.</h3>;
    }
  }

  useEffect(() => {
    const handleCityNotFound = () => {
      setWeatherData(null);
      setForecastData(null);
      alert("City not found, please check your spelling");
    };

    const fetchData = async () => {
      const apiUrl = testApi(city, "weather");
      const forecastApiUrl = testApi(city, "forecast");

      if (!apiUrl || !forecastApiUrl) {
        console.error("API not available");
        handleCityNotFound();
        return;
      }

      const weatherResponse = await fetchWeatherData(city);
      const forecastResponse = await fetchForecastData(city);

      if (!weatherResponse || !forecastResponse) {
        console.error("Error fetching data");
        handleCityNotFound();
        return;
      }

      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
    };

    if (city !== "") {
      fetchData();
    }
  }, [city]);

  return (
    <div className="App relative overflow-x-hidden bg-ececec min-h-screen">
      {/* <header className="App-header">
        <h1>Weather App</h1>
      </header> */}
      <main>
        {weatherData && <MainWeatherIcon weatherData={weatherData} />}
        <SearchBar onSearch={setCity}></SearchBar>
        {weatherData ? (
          <WeatherInfo weatherData={weatherData} />
        ) : (
          renderMessage(weatherData)
        )}
        {forecastData ? (
          <>
            <HouryForecast
              forecastData={forecastData}
              timezoneOffset={weatherData?.timezone || 0}
            />
            <DailyForecast forecastData={forecastData}></DailyForecast>
          </>
        ) : (
          renderMessage(forecastData)
        )}
      </main>
    </div>
  );
};

export default App;
