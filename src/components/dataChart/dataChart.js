import { useSelector } from "react-redux";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./dataChart.css";

const DataChart = () => {
  const storeData = useSelector((state) => state.currency.data);

  const error = useSelector((state) => state.currency.error);

  // seperating the dates, currency rates, and target currency's name
  let dates = [];
  let rates = [];
  let curr;

  if (storeData != null) {
    for (let i = 0; i < storeData.length; i++) {
      dates.push(storeData[i][0]);
      rates.push(storeData[i][1][0][1]);
      curr = storeData[0][1][0][0];
    }
  }

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: curr,
        backgroundColor: "white",
        borderColor: "white",
        data: rates,
      },
    ],
  };

  return (
    <>
      <span className="error-message">{error}</span>
      <div className="chart-wrapper">
        <Line data={chartData} className="chart" />
      </div>
    </>
  );
};

export default DataChart;
