import Toggle from "../toggle/toggle";

import "./header.scss";

const Header = () => {
  return (
    <>
      <header>
        <h1 className="title">Currency Lookout</h1>
        <h2 className="sub-title">Free currency rates chart & calculator</h2>
        <Toggle />
      </header>
    </>
  );
};

export default Header;
