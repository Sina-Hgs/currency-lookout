import Toggle from "../toggle/toggle";

import "./header.scss";

const Header = () => {
  return (
    <>
      <header>
        <h1 className="title header-title">Currency Lookout</h1>
        <h2 className="title sub-title">
          Free currency rates chart & calculator
        </h2>
        <Toggle />
      </header>
    </>
  );
};

export default Header;
