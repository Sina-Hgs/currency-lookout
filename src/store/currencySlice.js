import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  data: [],
  startDate: "2020-01-01",
  endDate: "2020-01-03",
  base: "EUR",
  symbol: "USD",
  status: "idle",
  error: null,
};

// base is the base currency and symbol is the target currency

const requestURL = `https://api.exchangerate.host/timeseries?start_date=${initialState.startDate}&end_date=${initialState.endDate}&base=${initialState.base}&symbols=${initialState.symbol}`;

export const fetchData = createAsyncThunk("currency/fetchData", async () => {
  const response = await fetch(requestURL);
  const fetchData = await response.json();
  const fetchedRates = fetchData.rates;

  // converting the object into an array for easier looping
  // the first index has the date in string format
  // the second index has an object with all the rates
  const arr = Object.entries(fetchedRates);

  // creating a new array with date and rates in array format
  let ratesArray = [];
  for (let i = 0; i < arr.length; i++) {
    ratesArray.push([arr[i][0], Object.entries(arr[i][1])]);
  }
  console.log(ratesArray);
  return ratesArray;
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducer: {
    timeGetter: (state, action) => {
      state.startDate = action.payload[0];
      state.endDate = action.payload[1];
    },
    // for changing the base currency
    baseChanger: (state, action) => {
      state.base = action.payload;
    },
    // for changing the target currency
    symbolChanger: (state, action) => {
      state.symbol = action.payload;
    },
    dataChanger: (state, action) => {
      state.data = action.payload;
    },
  },
  // these reducers work for the actions that defined outside of the slice
  // so they work for the thunk fetchData function
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeded";
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { timeGetter, baseChanger, symbolChanger } = currencySlice.actions;

export default currencySlice.reducer;
