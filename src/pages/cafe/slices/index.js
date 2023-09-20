import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CafeService from "../../../services/CafeSservice";


const initialState = {
  all: [],
  selected: {}
};

export const createCafe = createAsyncThunk(
  "cafe/create",
  async (payload) => {
    const res = await CafeService.createCafe(payload);
    return res.data.cafe;
  }
);

export const getAllCafes = createAsyncThunk(
  "cafe/get-all",
  async (payload) => {
    const res = await CafeService.getAllCafes(payload);
    return res.data.cafes;
  }
);

export const getCafeById = createAsyncThunk(
  "cafe/get-cafe",
  async (getCafeById) => {
    const res = await CafeService.getCafeById(getCafeById);
    return res.data.cafe;
  }
);

export const updateCafe = createAsyncThunk(
  "cafe/update",
  async (payload) => {
    const res = await CafeService.updateCafe(payload);
    return res.data.cafe;
  }
);

export const deleteCafe = createAsyncThunk(
  "cafe/delete",
  async (id) => {
    const res = await CafeService.deleteCafe(id);
    return res.data.id;
  }
);

const cafeSlice = createSlice({
  name: "cafes",
  initialState,
  extraReducers: {
    [createCafe.fulfilled]: (state, action) => {
      state.all.push(action.payload);
    },
    [getAllCafes.fulfilled]: (state, action) => {
      return { ...state, all: action.payload };
    },
    [updateCafe.fulfilled]: (state, action) => {
      const itemIndex = state.all.findIndex(item => item.id === action.payload.id);
      state.all[itemIndex] = {
        ...state.all[itemIndex],
        ...action.payload
      };
    },
    [deleteCafe.fulfilled]: (state, action) => {
      const cafeId = action.payload;
      state.all = state.all.filter(cafe => cafe.id !== cafeId);
    },
    [getCafeById.fulfilled]: (state, action) => {
      return { ...state, selected: action.payload };
    }, 
  },
  
});

const { reducer } = cafeSlice;
export default reducer;