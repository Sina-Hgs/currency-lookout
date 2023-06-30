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

  const requestURL = "https://api.exchangerate.host/symbols";
  const getCurrencies = async () => {
    const response = await fetch(requestURL);
    const fetchedData = await response.json();
    const fetchedCurrencies = fetchedData.symbols;

    // changing the fetched data to array format
    const tempArr = Object.entries(fetchedCurrencies);

    let temp;
    let currencyArr = [];
    let dropDownArr = [];
    for (let i = 0; i < tempArr.length; i++) {
      // removing the first index of each nested array in tempArr
      // the first index is same as the code property of the object inside each nested array
      // so I don't need it and remove it to declutter my data
      // I use the shift() method even though it mutates my data
      // because I see no reason to take up more memory space for this particular case
      tempArr[i].shift();

      // changing the nested object in each array to an array type and adding them to currencyArr
      // so I can sort them by alphabetical order
      temp = Object.values(tempArr[i][0]);
      currencyArr.push(temp);

      // not able to use methods like filter or map without more boilercode because
      // when I use them instead of for loops, I get index not found error that's
      // due to the nature of Promises and data fetching (getting unresolved promises and stuff)
      dropDownArr.push(currencyArr[i][0]);
      // again using sort() which is a mutating method instead of toSorted() for similar reasons as above
      // even though in UFT-16, uppercase and lowercase letters are not evaluated as equal
      // there was no reason for me to change all the elements to uppercase before sorting
      // because the strings are writting in capitalize (each word) format that works ok with UFT-16
      dropDownArr.sort();
    }

    console.log(
      currencyArr,
      "CURRENCY ARRAY WITH CODE NAME AS THE SECOND INDEX!"
    );
    console.log(dropDownArr, "DROP DOWN OPTIONS!❗❗❗❗❗❗❗");
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    // only changing the state when the fetchData in store has succeeded, otherwise I'll get an error for
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
