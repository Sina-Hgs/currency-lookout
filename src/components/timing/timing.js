import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
// import { timeGetter } from "../../store/currencySlice";

const Timing = () => {
  const [today, setToday] = useState("2023-1-1");
  const dispatch = useDispatch();

  const getCurrentDate = async () => {
    const date = new Date();

    const year = date.getFullYear();

    const numberOfMonth = date.getMonth();
    const month =
      numberOfMonth < 10 ? `0${numberOfMonth + 1}` : `${numberOfMonth + 1}`;

    const numberOfDay = date.getDate();
    const day = numberOfDay < 10 ? `0${numberOfDay}` : `${numberOfDay}`;

    return `${year}-${month}-${day}`;

    // setToday(calculatedDate);
  };

  // useEffect(() => {
  //   const wait = async () => {
  //     const result = await getCurrentDate();

  //     dispatch(timeGetter(result));
  //   };
  //   wait();
    
  // }, []);

  return <div>Timing</div>;
};

export default Timing;
