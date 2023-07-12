import { useSelector } from "react-redux";

import Spinner from "../spinner/spinner";

import Chart, { scales } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./dataChart.scss";

const DataChart = () => {
  const storeData = useSelector((state) => state.currency.data);
  const error = useSelector((state) => state.currency.error);
  const dataStatus = useSelector((state) => state.currency.status);

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

  Chart.defaults.color = "#ffff";
  Chart.defaults.font.family = "lato";
  Chart.defaults.borderColor = "#001f00";

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: curr,
        backgroundColor: "#04ff00",
        borderColor: "#04ff00",
        color: "#04ff00",
        fill: {
          target: "origin",
          above: "rgba(4, 78, 2, 0.3)",
        },

        data: rates,
      },
    ],
  };

  return (
    <>
      <span className="error-message">{error}</span>
      <div className="chart-wrapper">
        <Line data={chartData} />
        {dataStatus == "loading" ? <Spinner /> : <></>}
      </div>
    </>
  );
};

export default DataChart;
