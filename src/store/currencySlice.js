import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// INITIAL STATE
const initialState = {
  data: [],
  startDate: undefined,
  endDate: undefined,
  // base is the base currency and target is the target currency
  // for example base of BTC and target of USD means:
  // how much is 1 BTC in USD? 1 BITCOIN= $31,000
  base: "EUR",
  target: "USD",
  status: "idle",
  error: null,
};

let requestURL;

// creating the fetch data function in store as an async thunk function (instead of fetching inside a component)
// because many components need the data. (the fetchData func is dispatched from the timing component)
export const fetchData = createAsyncThunk("currency/fetchData", async () => {
  const response = await fetch(requestURL);
  const fetchData = await response.json();
  const fetchedRates = fetchData.rates;

  // converting the object into an array for easier looping
  // the first index has the date in string format
  // the second index has an object with all the rates
  const tempArr = Object.entries(fetchedRates);

  // creating a new array with date and rates in array format
  let ratesArray = [];
  for (let i = 0; i < tempArr.length; i++) {
    ratesArray.push([tempArr[i][0], Object.entries(tempArr[i][1])]);
  }

  return ratesArray;
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    // for changing the starting date and time range of chart
    timeGetter: ({ startDate, endDate, base, target }, action) => {
      [startDate, endDate] = [...action.payload];
      requestURL = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${target}`;
    },
    // for changing the status of api call
    statusChanger: (state, action) => {
      state.status = action.payload;
    },
    // for changing the base currency
    baseChanger: (state, action) => {
      state.base = action.payload;
    },
    // for changing the target currency
    targetChanger: (state, action) => {
      state.target = action.payload;
    },
  },
  // these reducers work for the actions that are defined outside of the slice (i.e. fetchData function)
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        console.log(`loading message from store!🌓status: ${state.status}`);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log("fetched data:📊", state.data);

        state.error = null;

        state.status = "succeded";
        console.log(`success message from store!🌕status: ${state.status}`);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        console.error(
          "error message from store: ",
          action.error.message,
          `💥status: ${state.status}`
        );
        state.error = action.error.message;
      });
  },
});

export const { timeGetter, baseChanger, targetChanger, statusChanger } =
  currencySlice.actions;

export default currencySlice.reducer;
