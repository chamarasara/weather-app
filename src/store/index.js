import { configureStore } from '@reduxjs/toolkit'
import cafeSlice from '../pages/cafe/slices';
import employeesSlice from '../pages/employees/slices'



const reducer = {
  cafes: cafeSlice,
  employees: employeesSlice
  
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})