import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <h4 className="title footer-title">CURRENCY LOOKOUT</h4>
          <p>This project uses Exchange API, Chart.js, & react-chart.js</p>
          <p>Made by Sina Haghshenas.</p>
        </div>
        <a href="https://github.com/Sina-Hgs" target="_blanck">
          <FontAwesomeIcon icon={faGithub} size="2xl" className="github-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
