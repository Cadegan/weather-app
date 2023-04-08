import axios from "axios";
// import { WeatherData, ForecastData } from "../utils/types";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.REACT_APP_API_KEY as string;

function buildApiUrl(city: string, endpoint: string): string {
  return `${baseUrl}${endpoint}?q=${city}&appid=${apiKey}`;
}

export async function fetchData<T>(
  city: string,
  endpoint: string
): Promise<T | null> {
  const apiUrl = buildApiUrl(city, endpoint);

  try {
    const response = await axios.get<T>(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return null;
  }
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
