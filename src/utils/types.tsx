export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; humidity: number; pressure: number };
  weather: { icon: string; main: string; description: string }[];
  wind: { speed: number };
  timezone: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: { temp_min: number; temp_max: number };
    weather: { icon: string; main: string; description: string }[];
  }[];
}
