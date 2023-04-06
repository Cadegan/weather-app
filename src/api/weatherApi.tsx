import axios from "axios";
import { WeatherData, ForecastData } from "../utils/types";

const apiKey = process.env.REACT_APP_API_KEY as string;
const baseUrl = "https://api.openweathermap.org/data/2.5/";

function buildApiUrl(city: string, endpoint: string): string {
  return `${baseUrl}${endpoint}?q=${city}&appid=${apiKey}`;
}

async function fetchData<T>(city: string, endpoint: string): Promise<T | null> {
  const apiUrl = buildApiUrl(city, endpoint);

  try {
    const response = await axios.get<T>(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
}

export function fetchWeatherData(city: string): Promise<WeatherData | null> {
  return fetchData<WeatherData>(city, "weather");
}

export function fetchForecastData(city: string): Promise<ForecastData | null> {
  return fetchData<ForecastData>(city, "forecast");
}

export async function testApi(
  city: string,
  endpoint: string
): Promise<boolean> {
  const apiUrl = buildApiUrl(city, endpoint);

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
