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
  const dataStatus = useSelector((state) => state.currency.status);
  const dispatch = useDispatch();

  const [startingDate, setStartingDate] = useState(week);

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
  useEffect(() => {
    if (dataStatus == "idle") {
      dispatch(timeGetter([startingDate, today]));
      console.log("FROM TIMING😘");
      dispatch(fetchData());
    }
  }, [dataStatus]);

  const changeDateHandler = (newDate) => {
    setStartingDate(newDate);

    dispatch(statusChanger("idle"));
  };

  return (
    <div className="timing">
      <button
        onClick={() => {
          changeDateHandler(week);
        }}
      >
        1 WEEK
      </button>
      <button
        onClick={() => {
          changeDateHandler(oneMonth);
        }}
      >
        1 MONTHS
      </button>
      <button
        onClick={() => {
          changeDateHandler(sixMonths);
        }}
      >
        6 MONTHS
      </button>
      <button
        onClick={() => {
          changeDateHandler(year);
        }}
      >
        1 YEAR
      </button>
      {dataStatus == "loading" ? <Spinner /> : <></>}
    </div>
  );
};

export default Timing;
