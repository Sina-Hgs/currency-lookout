import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  startingTimeGetter,
  statusChanger,
} from "../../store/currencySlice";

const Timing = () => {
  let fiveDays;
  let week;
  let oneMonth;
  let sixMonths;
  let year;

  const today = useSelector((state) => state.currency.endDate);
  const startDateFromStore = useSelector((state) => state.currency.startDate);
  const dataStatus = useSelector((state) => state.currency.status);
  const dispatch = useDispatch();

  const [startingDate, setStartingDate] = useState(startDateFromStore);
  const [status, setStatus] = useState(dataStatus);

  const statusChecker = () => {
    switch (dataStatus) {
      case "idle":
        console.log("I'M IDLE!!");
        const fetchedData = dispatch(fetchData());

      case "loading":
        console.log("this is the status in case LOADING", status);
        console.log("loading");

      case "succeded":
        console.log("this is the status in case SUCCESS", status);
        console.log("succeded");
        break;
      case "failed":
        console.log("failed");
        break;
      default:
        console.log("I'M LOST!!!");
    }
  };

  // ADD COMMENTS HERE
  useEffect(() => {
    try {
      console.log(startingDate, "this is the starting that I have");
      dispatch(startingTimeGetter(startingDate));
      statusChecker();
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
    }
  }, [startingDate]);

  console.log(today, "got today's date from store!");

  const changeDate = () => {
    setStatus("idle");
    dispatch(statusChanger(status));
    setStartingDate("2023-06-01");
    console.log(startingDate, "got this from HOOK!!!");
  };

  return (
    <div>
      <button
        onClick={() => {
          changeDate();
        }}
      >
        CLICK ME
      </button>
    </div>
  );
};

export default Timing;
