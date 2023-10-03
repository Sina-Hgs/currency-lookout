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
              Powered by <a href="https://www.amdoren.com">Amdoren</a>
            </p>
            <p>
              To know more about this project, please read{" "}
              <a
                href="https://github.com/Sina-Hgs/currency-lookout#readme"
                target="_blank"
              >
                this section
              </a>{" "}
              of its GitHub-repository.
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
