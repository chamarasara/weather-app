import api from "../api";

const searchCities = (payload) => {
  const { city, limit } = payload
  return api.weatherService.get(`/geo/1.0/direct?q=${city}&limit=${limit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
};

const getWeatherByCity = (payload) => {
  const { lat, lon , units} = payload
  return api.weatherService.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
};

const WeatherService = {
  searchCities,
  getWeatherByCity
};
export default WeatherService;