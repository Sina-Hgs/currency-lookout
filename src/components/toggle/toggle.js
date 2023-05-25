import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import "./toggle.css";

const Toggle = () => {
  return (
    <div className="toggle">
      <div className="toggle-btn" />
      <FontAwesomeIcon icon={faSun} size="2xl" />
      <FontAwesomeIcon icon={faMoon} size="2xl" />
    </div>
  );
};

export default Toggle;
