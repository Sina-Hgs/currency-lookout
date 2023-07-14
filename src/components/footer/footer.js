import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./footer.scss";

const Footer = () => {
  return (
    <>
      <p id="tip">
        <span id="tip-title">
          Tip: <br></br>
        </span>
        Use the calculator above to convert money, change or swap currencies, &
        adjust the chart timing.
      </p>
      <footer>
        <div className="footer-wrapper">
          <div>
            <h4 className="footer-title">Currency Lookout</h4>
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
            <FontAwesomeIcon
              icon={faGithub}
              size="2xl"
              className="github-icon"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
