import { useSelector } from "react-redux";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import Spinner from "../spinner/spinner";

import "./dataChart.scss";
import { useEffect } from "react";
import { useState } from "react";

const DataChart = () => {
  const storeData = useSelector((state) => state.currency.data);
  const error = useSelector((state) => state.currency.error);
  const dataStatus = useSelector((state) => state.currency.status);

  const [themeColor, setThemeColor] = useState("#04ff00");

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

  useEffect(() => {
    const theme = document.querySelector(".App").classList;
    setInterval(() => {
      if (theme.contains("dark")) {
        setThemeColor("#04ff00");
      } else {
        setThemeColor("rgb(215, 252, 214)");
      }
    }, 0.5);
  }, []);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: curr,
        backgroundColor: themeColor,
        borderColor: themeColor,
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
