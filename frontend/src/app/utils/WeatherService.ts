import { WeatherData } from "../interface/WeatherData";

export const getWeatherData = async (latitude: number, longitude: number) => {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=" +
    latitude +
    "%2C" +
    longitude;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b85423023bmsh35eed7b209b1d29p1b453cjsnb92e06982da7",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      const weatherData: WeatherData = {
        location: {
          name: result.location.name,
          region: result.location.region,
          country: result.location.country,
          localtime: result.location.localtime,
        },
        current: {
          temp_c: result.current.temp_c,
          temp_f: result.current.temp_f,
        },
        wind_mph: result.current.wind_mph,
        wind_kph: result.current.wind_kph,
        precip_mm: result.current.precip_mm,
        precip_in: result.current.precip_in,
        humidity: result.current.humidity,
      };
      return weatherData;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
