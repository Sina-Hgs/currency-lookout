import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import "./toggle.scss";

const Toggle = () => {
  // EVENT HANDLER
  const handleToggle = () => {
    // checking to see which theme classname is currently in the DOM
    const classes = document.querySelector(".App").classList;

    // changing the css class of App
    if (classes.contains("light")) {
      classes.remove("light");
      classes.add("dark");
    } else {
      classes.remove("dark");
      classes.add("light");
    }
  };

  return (
    <div className="toggle">
      <input type="checkbox" className="toggle-btn" onClick={handleToggle} />
      <FontAwesomeIcon icon={faSun} size="2xl" className="toggle-icon" />
      <FontAwesomeIcon icon={faMoon} size="2xl" className="toggle-icon" />
    </div>
  );
};

export default Toggle;
