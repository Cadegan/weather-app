import axios from "axios";
import { WeatherData, ForecastData } from "../utils/types";

const apiKey = process.env.REACT_APP_API_KEY as string;
const baseUrl = "https://api.openweathermap.org/data/2.5/";

export async function fetchWeatherData(
  city: string
): Promise<WeatherData | null> {
  const apiUrl = `${baseUrl}weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get<WeatherData>(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function fetchForecastData(
  city: string
): Promise<ForecastData | null> {
  const forecastApiUrl = `${baseUrl}forecast?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get<ForecastData>(forecastApiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
}

export async function testApi(apiUrl: string): Promise<boolean> {
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
}
