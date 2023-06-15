import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let today;
let initial_starting_date;

// WRITE COMMENT HERE!!!!!!!!!!!!!!!!
const calculateInitialDates = () => {
  const now = new Date();

  // I need to get the hours so the day's date doesn't get messed up while using
  // toISOString because of timezones hour offset
  const dateOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours()
  );

  today = dateOfToday.toISOString().slice(0, 10);
  console.log("today's date", today);

  // substracting 6 days of today's date to get the initial startDate
  // because the 7th day is the endDate (i.e. today)
  const dateOfAWeekAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 6,
    now.getHours()
  );

  initial_starting_date = dateOfAWeekAgo.toISOString().slice(0, 10);
  console.log("initial starting date", initial_starting_date);
};

calculateInitialDates();

// INITIAL STATE

const initialState = {
  data: [],
  startDate: initial_starting_date,
  endDate: today,
  base: "EUR",
  symbol: "USD",
  status: "idle",
  error: null,
};

let requestURL;
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
    // for changing the starting date and time range of chart
    startingTimeGetter: (state, action) => {
      state.startDate = action.payload;
      console.log(state.startDate, "changed the start date to this!!");
      requestURL = `https://api.exchangerate.host/timeseries?start_date=${state.startDate}&end_date=${state.endDate}&base=${state.base}&symbols=${state.symbol}`;
    },
    // for changing the base currency
    statusChanger: (state, action) => {
      state.status = action.payload;
    },
    // for changing the base currency
    baseChanger: (state, action) => {
      state.base = action.payload;
    },
    // for changing the target currency
    symbolChanger: (state, action) => {
      state.symbol = action.payload;
    },
  },
  // these reducers work for the actions that are defined outside of the slice (i.e. fetchData function)
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        console.log("loading from store!");
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeded";
        console.log("THIS IS THE STATUS I HAVE IN STORE", state.status);
        state.data = action.payload;
        console.log("succeded from store!");
        console.log("fetched this", state.data);
        // state.status = "idle";
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log("failed from store!");
        state.status = "failed";
        state.error = action.error.message;
        // state.status = "idle";
      });
  },
});

export const { startingTimeGetter, baseChanger, symbolChanger, statusChanger } =
  currencySlice.actions;

export default currencySlice.reducer;
