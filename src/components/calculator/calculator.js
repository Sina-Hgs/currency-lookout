import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./calculator.css";

const Calculator = () => {
  const storeData = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const error = useSelector((state) => state.currency.error);
  const [latestRate, setLatestRate] = useState(0);

  useEffect(() => {
    // only changing the state when the fetch has succeeded otherwise I'll get an error for
    // trying to select an index in the storedData that doesn't exist
    if (status == "succeded") {
      setLatestRate(storeData[storeData.length - 1][1][0][1]);
    }
  }, [storeData, status]);

  return (
    <div className="calculator">
      <FontAwesomeIcon icon={faArrowRightArrowLeft} size="2xl" />
      <span
        style={{
          fontSize: "32px",
          position: "absolute",
          margin: "auto",
          color: "red",
        }}
      >
        {error}
      </span>
    </div>
  );
};

export default Calculator;
