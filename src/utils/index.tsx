/**
 * "Convert a temperature in Kelvin to Celsius."
 *
 * @param {number} kelvin - The temperature in Kelvin.
 */
export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

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
 * partlyCloudy, rain, and snow.
 */
export const weatherIcons = (main: string) => {
  const icons = {
    clear: require("../assets/sun.png"),
    clouds: require("../assets/cloud.png"),
    partlyCloudy: require("../assets/sun-cloud.png"),
    rain: require("../assets/rain.png"),
    snow: require("../assets/snow.png"),
  };

  const iconKey = Object.keys(icons).find(
    (key) => key === main
  ) as keyof typeof icons;
  return icons[iconKey];
};
