import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  baseChanger,
  targetChanger,
  statusChanger,
} from "../../store/currencySlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { currencyArr, dropDownArr } from "./getCurrenciesList";

import "./calculator.css";

const Calculator = () => {
  const storeData = useSelector((state) => state.currency.data);

  const dataStatus = useSelector((state) => state.currency.status);

  const baseCode = useSelector((state) => state.currency.base);
  const targetCode = useSelector((state) => state.currency.target);

  const [baseCurrency, setBaseCurrency] = useState();
  const [targetCurrency, setTargetCurrency] = useState();

  const [targetValue, setTargetValue] = useState(0);

  const dispatch = useDispatch();

  // finding currency's name based on its code
  // used when we get the currencies code from store for base and target
  // and need to get their full names for setting them as the selected options in JSX
  let fullName;
  const findCurrencyName = (currencyCode) => {
    for (let i = 0; i < currencyArr.length; i++) {
      if (currencyArr[i][1] == currencyCode) {
        fullName = currencyArr[i][0];

        return fullName;
      }
    }
  };

  let latestRate;
  useEffect(() => {
    // only changing the state when the fetchData in store has succeeded, otherwise I'll get an error for
    // trying to select an index in the storedData that doesn't exist
    setBaseCurrency(findCurrencyName(baseCode));
    setTargetCurrency(findCurrencyName(targetCode));
    if (dataStatus == "succeded") {
      latestRate = storeData[storeData.length - 1][1][0][1];
      setTargetValue(latestRate);
    }
  }, [storeData]);

  // finding code of the currency based on its full name for keys in JSX
  let codeName;
  const findCurrencyCode = (currencyName) => {
    for (let i = 0; i < currencyArr.length; i++) {
      if (currencyArr[i][0] == currencyName) {
        codeName = currencyArr[i][1];
        return codeName;
      }
    }
  };

  // EVENT HANDLERS

  // input tag handler
  const handleInput = (event) => {
    const baseValue = event.target.value;
    latestRate = storeData[storeData.length - 1][1][0][1];

    baseValue > 0
      ? setTargetValue(baseValue * latestRate)
      : setTargetValue("Enter a valid number!");
  };

  // select tag handler
  const handleSelect = (event) => {
    const selectedCurrency = event.target.value;

    const codeName = findCurrencyCode(selectedCurrency);
    if (event.target.name == "base-currency-dropdown") {
      setBaseCurrency(selectedCurrency);
      console.log(baseCurrency);
      dispatch(baseChanger(codeName));
    } else {
      setTargetCurrency(selectedCurrency);
      dispatch(targetChanger(codeName));
    }
    if (dataStatus == "idle") {
      dispatch(fetchData());
    }
    dispatch(statusChanger("idle"));
  };

  // swap button handler
  const swapButtonHandler = () => {
    let temp = baseCurrency;
    console.log(temp, "TEMP");
    setBaseCurrency(targetCurrency);

    setTargetCurrency(temp);
    console.log(targetCurrency, "TARGET");

    // const x = findCurrencyCode(baseCurrency);
    // console.log(x);
    // dispatch(baseChanger(x));
    // dispatch(targetChanger(findCurrencyCode(targetCurrency)));

    // dispatch(fetchData());
    // dispatch(statusChanger("idle"));
  };

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
            id="base-currency"
          />
          <select
            name="base-currency-dropdown"
            value={baseCurrency}
            onChange={(e) => handleSelect(e)}
          >
            {dropDownArr.map((curr) => {
              return <option key={findCurrencyCode(curr)}>{curr}</option>;
            })}
          </select>
        </div>

        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          size="2xl"
          onClick={() => swapButtonHandler()}
        />

        {/* target currnecy */}
        <div className="currency-field">
          <label htmlFor="target-currency">target currency</label>
          <input value={targetValue} readOnly id="target-currency" />
          <select
            name="target-currency-dropdown"
            value={targetCurrency}
            onChange={(e) => handleSelect(e)}
          >
            {dropDownArr.map((curr) => {
              return <option key={findCurrencyCode(curr)}>{curr}</option>;
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default Calculator;
