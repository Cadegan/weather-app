/**
 * "Convert a temperature in Kelvin to Celsius."
 *
 * @param {number} kelvin - The temperature in Kelvin.
 */
export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);
export const kelvinToFahrenheit = (kelvin: number) =>
  Math.round(((kelvin - 273.15) * 9) / 5 + 32);

/**
 * It takes a timestamp and a timezone offset, and returns a string representing the time in the
 * timezone specified by the offset
 * @param {number} timestamp - The timestamp of the event in UTC.
 * @param {number} timezoneOffset - The timezone offset in seconds.
 * @returns A string in the format of HH:MM
 */
export const convertToLocalTime = (
  timestamp: number,
  timezoneOffset: number
): string => {
  const localTimestamp = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localTimestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * It takes a string and returns an image
 * @param {string} main - string - this is the main weather condition, which is a string.
 * @returns The weatherIcons function is returning an object with the keys of clear, clouds,
 * scatteredClouds, rain, and snow.
 */

export const icons = {
  clear: require("../assets/sun.png"),
  scatteredClouds: require("../assets/scatteredClouds.png"),
  brokenClouds: require("../assets/brokenClouds.png"),
  sunRain: require("../assets/sunRain.png"),
  clouds: require("../assets/cloud.png"),
  rain: require("../assets/rain.png"),
  mist: require("../assets/mist.png"),
  snow: require("../assets/snow.png"),
  lightSnow: require("../assets/lightSnow.png"),
  sunrise: require("../assets/sunRise.png"),
  sunset: require("../assets/sunSet.png"),
  humidity: require("../assets/humidity.png"),
  feelsLike: require("../assets/feelsLike.png"),
  pressure: require("../assets/pressure.png"),
  windSpeed: require("../assets/windSpeed.png"),
};

export const weatherIcons = (main: string) => {
  let iconKey: keyof typeof icons = "clear";

  switch (main.toLowerCase()) {
    case "clouds":
    case "overcast clouds":
      iconKey = "clouds";
      break;
    case "light rain":
    case "moderate rain":
      iconKey = "sunRain";
      break;
    case "rain":
    case "light intensity shower rain":
    case "heavy intensity shower rain":
    case "heavy intensity rain":
    case "shower rain":
    case "drizzle":
    case "thunderstorm":
      iconKey = "rain";
      break;
    case "mist":
      iconKey = "mist";
      break;
    case "light snow":
      iconKey = "lightSnow";
      break;
    case "snow":
    case "sleet":
      iconKey = "snow";
      break;
    case "clear":
      iconKey = "clear";
      break;
    case "partly cloudy":
    case "few clouds":
    case "scattered clouds":
      iconKey = "scatteredClouds";
      break;
    case "broken clouds":
      iconKey = "brokenClouds";
      break;
    default:
      break;
  }

  return icons[iconKey];
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
