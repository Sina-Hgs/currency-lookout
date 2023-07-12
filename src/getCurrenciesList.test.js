import { getCurrenciesList } from "./components/calculator/getCurrenciesList";

// testing to see if I actually got the data from the API
// currencies is actually fetchedCurrenciesArr that the function only define if it's succesful

test("FETCHING CURRENCIES LIST", async () => {
  const currencies = await getCurrenciesList();

  expect(currencies).toBeDefined();
});
