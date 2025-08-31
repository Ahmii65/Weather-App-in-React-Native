import axios from "axios";
const WEATHER_API = process.env.EXPO_PUBLIC_API_KEY;

const weatherEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API}&q=${params.cityName}&days=7&aqi=no&alerts=no`;
const locationEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err) {
    console.error(`An error Occuured`, err.message);
    return null;
  }
};

export const fetchWeather = (params) => {
  return apiCall(weatherEndpoint(params));
};
export const fetchLocation = (params) => {
  return apiCall(locationEndpoint(params));
};
