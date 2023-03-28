export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

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
