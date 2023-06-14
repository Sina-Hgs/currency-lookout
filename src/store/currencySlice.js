import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  startDate: "2023-06-12",
  endDate: "2023-06-14",
  base: "EUR",
  symbol: "USD",
  status: "idle",
  error: null,
};

const requestURL = `https://api.exchangerate.host/timeseries?start_date=${initialState.startDate}&end_date=${initialState.endDate}&base=${initialState.base}&symbols=${initialState.symbol}`;

// base is the base currency and symbol is the target currency
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
  return ratesArray;
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    // timeGetter: (state, action) => {
    //   // state.startDate = action.payload[0];
    //   console.log("1", state.endDate);
    //   state.endDate = action.payload;
    //   console.log("2", state.endDate);
    // },
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
  // these reducers work for the actions that are defined outside of the slice (i.e. fetchData function)
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeded";
        state.data = action.payload;
        console.log("fetched this", state.data);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { timeGetter, baseChanger, symbolChanger } = currencySlice.actions;

export default currencySlice.reducer;
