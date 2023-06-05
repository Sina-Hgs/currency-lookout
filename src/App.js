import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Calculator from "./components/calculator/calculator";
import DataChart from "./components/dataChart/dataChart";

import { Provider } from "react-redux";
import store from "./store/store";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Calculator />
        <DataChart />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
