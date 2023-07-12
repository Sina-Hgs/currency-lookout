const requestURL = "https://api.exchangerate.host/symbols";
let currencyArr = [];
let dropDownArr = [];

const getCurrenciesList = async () => {
  try {
    const response = await fetch(requestURL);
    const fetchedData = await response.json();
    const fetchedCurrencies = fetchedData.symbols;

    // changing the fetched data to array format
    const fetchedCurrenciesArr = Object.entries(fetchedCurrencies);

    let temp;
    for (let i = 0; i < fetchedCurrenciesArr.length; i++) {
      // removing the first index of each nested array in fetchedCurrenciesArr
      // the first index is same as the code property of the object inside each nested array
      // so I don't need it and remove it to declutter my data
      // I use the shift() method even though it mutates my data
      // because I see no reason to take up more memory space for this particular case
      fetchedCurrenciesArr[i].shift();

      // changing the nested object in each array to an array type and adding them to currencyArr
      // so I can sort them by alphabetical order
      temp = Object.values(fetchedCurrenciesArr[i][0]);
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

getCurrenciesList();

export { getCurrenciesList, currencyArr, dropDownArr };
