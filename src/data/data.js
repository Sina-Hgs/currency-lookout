import { useEffect } from "react";

const Data = () => {
  const requestURL =
    "https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-20";

  useEffect(
    () => async () => {
      const response = await fetch(requestURL);
      const data = await response.json();
      console.log(data.rates);
    },
    []
  );

  // the fetch version without async/await (use it inside the useEffect hook)
  //   fetch(requestURL)
  //     .then((response) => response.json())
  //     .then((data) => data.rates)
  //     .then(console.log);
};

export default Data;
