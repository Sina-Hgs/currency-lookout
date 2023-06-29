import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./dataChart.css";

const DataChart = () => {
  const storeData = useSelector((state) => state.currency.data);
  const [data, setData] = useState(storeData);

  useEffect(() => {
    setData(storeData);
  }, [storeData]);

  // seperating the dates and currency rates and target currency
  let dates = [];
  let rates = [];
  let curr;
  for (let i = 0; i < data.length; i++) {
    dates.push(data[i][0]);
    rates.push(data[i][1][0][1]);
    curr = data[0][1][0];
  }

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: curr,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: rates,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <Line data={chartData} className="chart" />
    </div>
  );
};

export default DataChart;
