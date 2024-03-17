import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import WeatherService from "../../../services/WeatherService";


const initialState = {
    selected: {}
  };


  export const searchCities = createAsyncThunk(
    "weather/city-search",
    async (payload) => {
      console.log(payload.city)
      if (payload.city) {
        const res = await WeatherService.searchCities(payload);
        return res.data;
      }
    
    }
  );

  export const getWeatherByCity = createAsyncThunk(
    "weather/weather-by-city",
    async (payload) => {
      if (payload.lat && payload.lon) {
        const res = await WeatherService.getWeatherByCity(payload);
        return res.data;
      }
     
    }
  );

  const weatherSlice = createSlice({
    name: "weather",
    initialState,
    extraReducers: {
      [getWeatherByCity.fulfilled]: (state, action) => {
        return { ...state, selected: action.payload };
      }
    },
  
  });
  
  const { reducer } = weatherSlice;
  export default reducer;