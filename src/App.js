import Header from "./components/header/header";
import Timing from "./components/timing/timing";
import Calculator from "./components/calculator/calculator";
import DataChart from "./components/dataChart/dataChart";
import Footer from "./components/footer/footer";

import { Provider } from "react-redux";
import store from "./store/store";

import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <span className="fade-in-span">
          <Header />
          <DataChart />
          <Timing />
          <Calculator />
          <Footer />
        </span>
      </div>
    </Provider>
  );
};

export default App;
