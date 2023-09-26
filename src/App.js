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
      <div className="App dark">
        <span className="fade-in-span">
          <Header />
          <div className="notice">
            <button
              onClick={() =>
                (document.querySelector(".notice").style.display = "none")
              }
            >
              &#10006;
            </button>
            <h3>Attention!</h3>
            If the app doesn't show any data it may be because the free API that
            I used to make this app might become pay to use in the near future.
            <br />
            I'll work on a new version of this app that uses another API if the
            current one stops working for free. The updated version will be
            available on this page when it's done.
            <br />
            If the app is broken right now, feel free to peek at the code in the
            mean time (GitHub link available down on the footer).
            <br />
            Thankyou!
          </div>
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
