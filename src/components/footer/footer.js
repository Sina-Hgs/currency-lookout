import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <h4 className="title footer-title">CURRENCY LOOKOUT</h4>
          <p>
            This project uses{" "}
            <a href="https://exchangerate.host/" target="_blank">
              Exchange API
            </a>
            , Chart.js, & react-chart.js
          </p>
          <p>Made by Sina Haghshenas.</p>
        </div>
        <a href="https://github.com/Sina-Hgs" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="2xl" className="github-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
