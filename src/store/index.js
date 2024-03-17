import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from '../pages/weather/slices'



const reducer = {
  weather: weatherSlice
  
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})