const APIKEY = process.env.REACT_APP_API_KEY;
// console.log("😋😋😋", APIKEY);
const requestURL = `https://api.currencybeacon.com/v1/currencies?api_key=${APIKEY}`;
let currencyArr = [];
let dropDownArr = [];
let fetchedCurrenciesArr;

const getCurrenciesList = async () => {
  try {
    const response = await fetch(requestURL);
    const fetchedData = await response.json();
    console.log(fetchedData, "fetchedData");
    // changing the fetched data to array format
    fetchedCurrenciesArr = Object.entries(fetchedData);
    // const fetchedCurrencies = fetchedCurrenciesArr;
    console.log(fetchedCurrenciesArr, "fetched Currencies ARR");

    let temp;
    // for (let i = 0; i < fetchedCurrenciesArr.length; i++) {
    //   // removing the first index of each nested array in fetchedCurrenciesArr
    //   // the first index is same as the code property of the object inside each nested array
    //   // so I don't need it and remove it to declutter my data
    //   // I use the shift() method even though it mutates my data
    //   // because I see no reason to take up more memory space for this particular case

    //   // changing the nested object in each array to an array type and adding them to currencyArr
    //   // so I can sort them by alphabetical order
    //   temp = Object.values(fetchedCurrenciesArr[i][0]);
    //   currencyArr.push(temp);
    //   // console.log("🤗🙂",currencyArr)

    //   // not able to use methods like filter or map without more boilercode because
    //   // when I use them instead of for loops, I get index not found error that's
    //   // due to the nature of Promises and data fetching (getting unresolved promises and stuff)
    //   dropDownArr.push(currencyArr[i][1]);
    //   // again using sort() which is a mutating method instead of toSorted() for similar reasons as above
    //   // even though in UFT-16, uppercase and lowercase letters are not evaluated as equal
    //   // there was no reason for me to change all the elements to uppercase before sorting
    //   // because the strings are writting in capitalize (each word) format that works ok with UFT-16
    //   dropDownArr.sort();
    // }

    for (let i = 0; i < fetchedCurrenciesArr.length; i++) {
      fetchedCurrenciesArr[i].shift();
      // console.log(fetchedCurrenciesArr[i].name);
      dropDownArr.push(fetchedCurrenciesArr[i][0].name);
    }
    console.log(currencyArr, "currency array");
    console.log(dropDownArr, "dropdown");
    // returning this for testing with Jest
    return fetchedCurrenciesArr;
  } catch (error) {
    console.error("😵Had an error while fetching the currencies list:", error);
  }

  //   console.log(
  //     currencyArr,
  //     "CURRENCY ARRAY WITH CODE NAME AS THE SECOND INDEX!"
  //   );
  //   console.log(dropDownArr, "DROP DOWN OPTIONS!❗❗❗❗❗❗❗");
};



export { getCurrenciesList, currencyArr, dropDownArr, fetchedCurrenciesArr };
