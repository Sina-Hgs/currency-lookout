import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchData,
  timeGetter,
  statusChanger,
} from "../../store/currencySlice";

import { today, week, oneMonth, sixMonths, year } from "./calculateDate";

import Spinner from "../spinner/spinner";

const Timing = () => {
  // let today;
  // let week;
  // let oneMonth;
  // let sixMonths;
  // let year;

  // // this function calculates the needed dates for data fetching
  // const calculateDates = () => {
  //   console.log("RUNNING!!!!!!!11");
  //   const now = new Date();

  //   // TODAY'S
  //   // I need to get the hours so the day's date doesn't get messed up while using
  //   // toISOString because of timezones hour offset of the user's location
  //   const dateOfToday = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate(),
  //     now.getHours()
  //   );

  //   today = dateOfToday.toISOString().slice(0, 10);

  //   // A WEEK AGO
  //   // substracting 6 days of today's date to get the initial startDate
  //   // because the 7th day is the endDate (i.e. today)
  //   const dateOfAWeekAgo = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate() - 6,
  //     now.getHours()
  //   );
  //   week = dateOfAWeekAgo.toISOString().slice(0, 10);

  //   // ONE MONTH AGO
  //   // DECIDED TO GO FOR A MONTH AGO'S DATE RATHER THAN 30 OR 31 DAYS
  //   const dateOfAMonthAgo = new Date(
  //     now.getFullYear(),
  //     now.getMonth() - 1,
  //     now.getDate(),
  //     now.getHours()
  //   );
  //   oneMonth = dateOfAMonthAgo.toISOString().slice(0, 10);

  //   // 6 MONTHS AGO
  //   // CALCULATING 6 MONTHS AGO'S DATE AND NOT 180 DAYS
  //   const dateOfSixMonthsAgo = new Date(
  //     now.getFullYear(),
  //     now.getMonth() - 6,
  //     now.getDate(),
  //     now.getHours()
  //   );
  //   sixMonths = dateOfSixMonthsAgo.toISOString().slice(0, 10);

  //   // A YEAR AGO
  //   // CALCULATING A YEAR AGO'S DATE AND NOT 365 DAYS
  //   const dateOfAYearAgo = new Date(
  //     now.getFullYear() - 1,
  //     now.getMonth(),
  //     now.getDate(),
  //     now.getHours()
  //   );
  //   year = dateOfAYearAgo.toISOString().slice(0, 10);
  // };

  // calculateDates();

  const dataStatus = useSelector((state) => state.currency.status);
  const dispatch = useDispatch();

  const [startingDate, setStartingDate] = useState(week);
  const [status, setStatus] = useState(dataStatus);

  // const statusChecker = () => {
  //   switch (dataStatus) {
  //     case "loading":
  //       console.log(
  //         "this is the status in case LOADING📥.",
  //         `request state: ${dataStatus}`
  //       );
  //       break;

  //     case "succeded":
  //       console.log(
  //         "this is the status in case SUCCESS🎯.",
  //         `request state: ${dataStatus}`
  //       );
  //       break;

  //     case "failed":
  //       console.log(
  //         "this is the status in case FAILURE💥.",
  //         `request state: ${dataStatus}`
  //       );
  //       console.log("failed");
  //       break;
  //   }
  // };

  // the hook runs and gives the calculated starting date and today's date(end date)
  // to the store, then if the status that taken from store is "idle" starts the data fetching
  // it shows the error if it catches any
  useEffect(() => {
    try {
      dispatch(timeGetter([startingDate, today]));
      if (dataStatus == "idle") {
        dispatch(fetchData());
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  }, [dataStatus]);

  const changeDate = (newDate) => {
    setStartingDate(newDate);
    setStatus("idle");
    dispatch(statusChanger(status));
  };

  return (
    <div className="timing">
      <button
        onClick={() => {
          changeDate(week);
        }}
      >
        1 WEEK
      </button>
      <button
        onClick={() => {
          changeDate(oneMonth);
        }}
      >
        1 MONTHS
      </button>
      <button
        onClick={() => {
          changeDate(sixMonths);
        }}
      >
        6 MONTHS
      </button>
      <button
        onClick={() => {
          changeDate(year);
        }}
      >
        1 YEAR
      </button>
      {dataStatus == "loading" ? <Spinner /> : <></>}
    </div>
  );
};

export default Timing;
