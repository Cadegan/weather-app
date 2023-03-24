import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
// import sun from "../src/assets/sun.svg";
// import sunIcon from "../src/assets/sun.svg";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { icon: string; main: string }[];
}

const App = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const apiKey = process.env.REACT_APP_API_KEY as string;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    if (city !== "") {
      axios
        .get<WeatherData>(apiUrl)
        .then((response: AxiosResponse<WeatherData>) => {
          setWeatherData(response.data);
        });
    }
  }, [apiUrl, city]);

  const handleSearch = () => {
    setCity(searchText);
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
          </div>
        ) : (
          <h3>No data to display</h3>
        )}
      </header>
    </div>
  );
};

export default App;
