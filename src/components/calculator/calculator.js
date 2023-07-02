import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { currencyArr, dropDownArr } from "./getCurrenciesList";

import "./calculator.css";

const Calculator = () => {
  const storeData = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);

  const [latestRate, setLatestRate] = useState(0);
  const [targetValue, setTargetValue] = useState(latestRate);

  // useEffect(() => {
  //   // console.log(dropDownArr, "DROPDOWN IN HERE!!!!!!!!!!");
  //   // console.log(currencyArr, "CURRENCIES IN HERE!!!!!!!!");
  // }, []);

  useEffect(() => {
    // only changing the state when the fetchData in store has succeeded, otherwise I'll get an error for
    // trying to select an index in the storedData that doesn't exist
    if (status == "succeded") {
      setLatestRate(storeData[storeData.length - 1][1][0][1]);
      setTargetValue(latestRate);
    }
  }, [storeData, status]);

  const handleInput = (event) => {
    const baseValue = event.target.value;

    baseValue >= 0
      ? setTargetValue(baseValue * latestRate)
      : setTargetValue("Enter a valid number!");
  };

  const findCode = () => {};

  return (
    <>
      {/* base currency */}
      <div className="calculator">
        <div className="currency-field">
          <label htmlFor="base-currency">base currency</label>
          <input
            type="number"
            onChange={(e) => handleInput(e)}
            placeholder="1"
          />
          <select>
            {dropDownArr.map((curr) => {
              return <option key={curr}>{curr}</option>;
            })}
          </select>
        </div>

        <FontAwesomeIcon icon={faArrowRightArrowLeft} size="2xl" />

        {/* target currnecy */}
        <div className="currency-field">
          <label htmlFor="target-currency">target currency</label>
          <input value={targetValue} readOnly />
          <select>
            {dropDownArr.map((curr) => {
              return <option key={curr}>{curr}</option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Calculator;
