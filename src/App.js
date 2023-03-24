import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    if (city !== "") {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setWeatherData(data));
    }
  }, [apiUrl, city]);
  // console.log(weatherData);

  const handleSearch = () => {
    setCity(searchText);
  };

  const { name, sys, main, weather, message } = weatherData;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          placeholder="Enter a location"
        />
        <button onClick={handleSearch}>Search</button>
        {name ? (
          <div className="weather-container">
            <p>
              {name}, {sys.country}
            </p>
            <p>{Math.round(main.temp - 273.15)}°C</p>
            <img
              src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>{weather[0].main}</p>
          </div>
        ) : (
          <h3>{message}</h3>
        )}
      </header>
    </div>
  );
}

export default App;
