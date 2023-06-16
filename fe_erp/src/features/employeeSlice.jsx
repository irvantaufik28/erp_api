import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../config'

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
}

export const getEmployeeList = createAsyncThunk(
  "admin/get-employee",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + "karyawan");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = {};
      });
  }
});

export const employeeSelector = {
  selectData: (state) => state.employee.data,
  loading: (state) => state.employee.loading,
  errorMessage: (state) => state.employee.errorMessage
}

export default employeeSlice.reducer;