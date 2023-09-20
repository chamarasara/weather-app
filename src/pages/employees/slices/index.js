import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EmployeeService from "../../../services/EmployeeService";


const initialState = {
    all: [],
    sellected: {}
  };

  export const createEmployee = createAsyncThunk(
    "employee/create",
    async (payload) => {
      const res = await EmployeeService.createEmployee(payload);
      return res.data.employee;
    }
  );

  export const updateEmployee = createAsyncThunk(
    "employee/update",
    async (payload) => {
      const res = await EmployeeService.updateEmployee(payload);
      return res.data.employee;
    }
  );

  export const getAllEmployees = createAsyncThunk(
    "employee/get-all",
    async (payload) => {
      const res = await EmployeeService.getEmployees(payload);
      return res.data.employees;
    }
  );

  export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (id) => {
      const res = await EmployeeService.deleteEmployee(id);
      return res.data.id;
    }
  );

  const employeeSlice = createSlice({
    name: "employees",
    initialState,
    extraReducers: {
      [createEmployee.fulfilled]: (state, action) => {
        state.all.push(action.payload);
      },
      [getAllEmployees.fulfilled]: (state, action) => {
        return { ...state, all: action.payload };
      },
      [updateEmployee.fulfilled]: (state, action) => {
        const itemIndex = state.all.findIndex(item => item.id === action.payload.id);
        state.all[itemIndex] = {
          ...state.all[itemIndex],
          ...action.payload
        };
      },
      [deleteEmployee.fulfilled]: (state, action) => {
        const empId = action.payload;
        state.all = state.all.filter(emp => emp.id !== empId);
      },
    },
  
  });
  
  const { reducer } = employeeSlice;
  export default reducer;