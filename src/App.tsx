import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";

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

  // const renderDailyForecast = (forecastData: ForecastData) => {
  //   const dailyData = forecastData.list.reduce(
  //     (accumulator: Record<string, any>, item) => {
  //       const date = new Date(item.dt * 1000).toLocaleDateString();
  //       if (!accumulator[date]) {
  //         accumulator[date] = {
  //           date,
  //           weather: item.weather,
  //           temp_min: item.main.temp_min,
  //           temp_max: item.main.temp_max,
  //         };
  //       } else {
  //         accumulator[date].temp_min = Math.min(
  //           accumulator[date].temp_min,
  //           item.main.temp_min
  //         );
  //         accumulator[date].temp_max = Math.max(
  //           accumulator[date].temp_max,
  //           item.main.temp_max
  //         );
  //         accumulator[date].weather = item.weather;
  //       }
  //       return accumulator;
  //     },
  //     {}
  //   );

  //   return Object.values(dailyData).map((data: any, index: number) => (
  //     <div key={index} className="daily-forecast">
  //       <p>{data.date}</p>
  //       <img
  //         // src={weatherIcons(data.weather[0].main.toLowerCase())}
  //         alt="weather icon"
  //       />
  //       <p>{data.weather[0].main}</p>
  //       {/* <p>
  //         Min: {kelvinToCelsius(data.temp_min)}°C / Max:{" "}
  //         {kelvinToCelsius(data.temp_max)}°C
  //       </p> */}
  //     </div>
  //   ));
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <SearchBar onSearch={setCity}></SearchBar>
        {weatherData ? (
          <WeatherInfo weatherData={weatherData} />
        ) : weatherData === false ? (
          <h3>Something went wrong. Please try again later.</h3>
        ) : (
          <h3>No data to display</h3>
        )}
        {/* {forecastData ? (
          <div className="forecast-container">
            {renderDailyForecast(forecastData)}
          </div>
        ) : forecastData === false ? (
          <h3>Something went wrong. Please try again later.</h3>
        ) : (
          <h3>No forecast data to display</h3>
        )} */}
      </header>
    </div>
  );
};

export default App;
