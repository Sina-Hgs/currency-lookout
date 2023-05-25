import Toggle from "../toggle/toggle";
import "./header.css";

const Header = () => {
  return (
    <header>
      <h1 className="title header-title">CRYPTO LOOKOUT</h1>
      <Toggle />
    </header>
  );
};

export default Header;
