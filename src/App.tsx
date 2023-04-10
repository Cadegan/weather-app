import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MainWeatherInfo from "./components/MainWeatherInfo";
import DailyForecast from "./components/DailyForecast";
import HouryForecast from "./components/HourForcast";
import MainWeatherIcon from "./components/WeatherInfoIcon";
import { WeatherData, ForecastData } from "./utils/types";
import { fetchData, testApi } from "./api/weatherApi";

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleCityNotFound = () => {
      setWeatherData(null);
      setForecastData(null);
      alert("City not found, please check your spelling");
    };

    const loadData = async () => {
      setIsLoading(true);
      const apiUrl = testApi(city, "weather");
      const forecastApiUrl = testApi(city, "forecast");

      if (!apiUrl || !forecastApiUrl) {
        console.error("API not available");
        handleCityNotFound();
        setIsLoading(false);
        return;
      }

      const weatherResponse = await fetchData<WeatherData>(city, "weather");
      const forecastResponse = await fetchData<ForecastData>(city, "forecast");

      if (!weatherResponse || !forecastResponse) {
        console.error("Error fetching data");
        handleCityNotFound();
        setIsLoading(false);
        return;
      }

      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
      setIsLoading(false);
    };

    if (city !== "") {
      loadData();
    }
  }, [city]);

  return (
    <div className="App relative overflow-x-hidden bg-ececec min-h-screen">
      <main>
        <MainWeatherIcon weatherData={weatherData} />
        <SearchBar onSearch={setCity}></SearchBar>
        <MainWeatherInfo weatherData={weatherData} />
        <HouryForecast
          forecastData={forecastData}
          timezoneOffset={weatherData?.timezone || 0}
          isLoading={isLoading}
        />
        <DailyForecast
          forecastData={forecastData}
          isLoading={isLoading}
        ></DailyForecast>
      </main>
    </div>
  );
};

export default App;
