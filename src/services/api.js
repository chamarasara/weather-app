import axios from "axios";
console.log(process.env.OPEN_WEATHER_APP_URL)

const weatherService = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instance = {
  weatherService,
};

export default instance;
