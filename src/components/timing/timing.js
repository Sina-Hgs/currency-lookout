import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  timeGetter,
  statusChanger,
} from "../../store/currencySlice";

import { today, week, oneMonth, sixMonths, year } from "../../lib/calculateDate";

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

  // EVENT HANDLERS

  const changeDateHandler = (newDate) => {
    setStartingDate(newDate);
    dispatch(statusChanger("idle"));
  };

  const changeStyle = (event) => {
    const buttons = document.getElementsByClassName("timing-btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active-btn");
    }

    event.target.classList.add("active-btn");
  };

  return (
    <div className="timing">
      <button
        className="timing-btn active-btn"
        onClick={(e) => {
          changeDateHandler(week);
          changeStyle(e);
        }}
      >
        1 Week
      </button>
      <button
        className="timing-btn"
        onClick={(e) => {
          changeDateHandler(oneMonth);
          changeStyle(e);
        }}
      >
        1 Months
      </button>
      <button
        className="timing-btn"
        onClick={(e) => {
          changeDateHandler(sixMonths);
          changeStyle(e);
        }}
      >
        6 Months
      </button>
      <button
        className="timing-btn"
        onClick={(e) => {
          changeDateHandler(year);
          changeStyle(e);
        }}
      >
        1 Year
      </button>
    </div>
  );
};

export default Timing;
