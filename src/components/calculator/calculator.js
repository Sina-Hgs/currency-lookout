import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  baseChanger,
  targetChanger,
  statusChanger,
} from "../../store/currencySlice";

import { currencyArr, dropDownArr, err } from "./getCurrenciesList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./calculator.scss";

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

  // finding code of the currency based on its full name for keys in JSX and dispatching to store
  let codeName;
  const findCurrencyCode = (currencyName) => {
    for (let i = 0; i < currencyArr.length; i++) {
      if (currencyArr[i][0] == currencyName) {
        codeName = currencyArr[i][1];
        return codeName;
      }
    }
  };

  // ----EVENT HANDLERS----

  // input tag handler
  const handleInput = (event) => {
    let baseValue = event.target.value;

    if (dataStatus == "succeded") {
      latestRate = storeData[storeData.length - 1][1][0][1];

      baseValue > 0
        ? setTargetValue(baseValue * latestRate)
        : setTargetValue("Enter a valid number!");
    } else if (dataStatus == "failed") {
      setTargetValue("Sorry, failed to fetch data.");
    }
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
    // changing the status so the timing useEffect hook that depends on the status
    // dispatches fetchData()
    dispatch(statusChanger("idle"));
  };

  // swap button handler
  const swapButtonHandler = () => {
    dispatch(baseChanger(findCurrencyCode(targetCurrency)));
    dispatch(targetChanger(findCurrencyCode(baseCurrency)));
    dispatch(statusChanger("idle"));
  };

  return (
    <>
      {/* base currency */}
      <div className="calculator">
        <div className="currency-field base-field">
          <label className="input-label" htmlFor="base-value">
            base currency
          </label>
          <input
            type="number"
            onChange={(e) => handleInput(e)}
            placeholder="Enter a number here to convert"
            id="base-value"
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

        <div id="swap-btn">
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            size="2xl"
            tabIndex={0}
            onClick={() => swapButtonHandler()}
          />
          <span id="tooltip">Swap currencies</span>
        </div>

        {/* target currnecy */}

        <div className="currency-field target-field">
          <label className="input-label" htmlFor="target-value">
            target currency
          </label>
          <input
            value={targetValue.toLocaleString("en-US")}
            readOnly
            id="target-value"
          />
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
