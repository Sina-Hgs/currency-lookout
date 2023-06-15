import { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
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
      case "loading":
        console.log("this is the status in case LOADING🎯", dataStatus);
        console.log("loading");
        break;
      case "succeded":
        console.log("this is the status in case SUCCESS🎯", dataStatus);
        console.log("succeded");
        break;
      case "failed":
        console.log("this is the status in case FAILURE💥", dataStatus);
        console.log("failed");
        break;
    }
  };

  // ADD COMMENTS HERE
  useEffect(() => {
    try {
      dispatch(startingTimeGetter(startingDate));
      if (dataStatus == "idle") {
        dispatch(fetchData());
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      statusChecker();
    }
  }, [startingDate, dataStatus]);

  const changeDate = () => {
    setStatus("idle");
    dispatch(statusChanger(status));
    setStartingDate("2023-06-01");
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
