import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Calculator from "./components/calculator/calculator";
import DataChart from "./components/dataChart/dataChart";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Calculator />
      <DataChart />
      <Footer />
    </div>
  );
};

export default App;
