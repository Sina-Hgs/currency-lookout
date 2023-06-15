import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/currencySlice";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./dataChart.css";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const DataChart = () => {
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const dataStatus = useSelector((state) => state.currency.status);
  const startDate = useSelector((state) => state.currency.startDate);

  // const statusChecker = () => {
  //   switch (dataStatus) {
  //     case "idle":
  //       const fetchedData = dispatch(fetchData());
  //       break;

  //     case "loading":
  //       console.log("loading");
  //       break;

  //     case "succeded":
  //       console.log("succeded");
  //       break;

  //     case "failed":
  //       console.log("failed");
  //       break;
  //   }
  // };

  // // ADD COMMENTS HERE
  // useEffect(() => {
  //   statusChecker();
  // }, [startDate]);

  return (
    <div>
      <Line data={data} className="chart" />
    </div>
  );
};

export default DataChart;
