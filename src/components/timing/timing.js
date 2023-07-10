import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  timeGetter,
  statusChanger,
} from "../../store/currencySlice";

import { today, week, oneMonth, sixMonths, year } from "./calculateDate";

import "./timing.scss";

const Timing = () => {
  const dataStatus = useSelector((state) => state.currency.status);
  const dispatch = useDispatch();

  const [startingDate, setStartingDate] = useState(week);

  // the hook runs and gives the calculated starting date and today's date(end date)
  // to the store, then if the status that taken from store is "idle" starts the data fetching
  useEffect(() => {
    if (dataStatus == "idle") {
      dispatch(timeGetter([startingDate, today]));
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
        className="timing-btn"
        onClick={() => {
          changeDateHandler(week);
        }}
      >
        1 Week
      </button>
      <button
        className="timing-btn"
        onClick={() => {
          changeDateHandler(oneMonth);
        }}
      >
        1 Months
      </button>
      <button
        className="timing-btn"
        onClick={() => {
          changeDateHandler(sixMonths);
        }}
      >
        6 Months
      </button>
      <button
        className="timing-btn"
        onClick={() => {
          changeDateHandler(year);
        }}
      >
        1 Year
      </button>
      
    </div>
  );
};

export default Timing;
