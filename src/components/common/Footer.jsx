import { Col, Container, Row } from "react-bootstrap";

// import { LiaAngleRightSolid } from 'react-icons/li';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row sm={2} md={4} lg={5}>
          <Col md={5} lg={3}>
            <Link to="/">
              {/* <img
                className="logo"
                src="https://jobpilot.templatecookie.com/frontend/assets/images/logo/logowhite.png"
                alt=""
              /> */}
              <h2>MarketX87</h2>
            </Link>
            <p className="">
              Discover tailored opportunities for job seekers and top talent for
              employers
            </p>
          </Col>
          <Col lg={2} md={3}>
            <h2 className="mt-3 mt-sm-0">Company</h2>
            <ul>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>About </span>
                </li>
              </Link>

              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Contact</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Blog</span>
                </li>
              </Link>
            </ul>
          </Col>
          <Col lg={2} md={5}>
            <h2>Candidate</h2>
            <ul>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Browse Jobs</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Candidate</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Saved Jobs</span>
                </li>
              </Link>
            </ul>
          </Col>

          <Col lg={2} md={5}>
            <h2>Company</h2>
            <ul>
              <Link to="/">
                <li className="">
                  <IoIosArrowForward />
                  <span>Post a Job</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Browse Companies</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Companies</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Applications</span>
                </li>
              </Link>
            </ul>
          </Col>
          <Col lg={2} md={5}>
            <h2>Support</h2>
            <ul>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>FAQ</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Privacy & Policy</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Terms & Conditions</span>
                </li>
              </Link>
              <Link to="/">
                <li>
                  <IoIosArrowForward />
                  <span>Refund Policy</span>
                </li>
              </Link>
            </ul>
          </Col>
        </Row>
      </Container>
      <hr className="text-white" />
      <p className="copyright pt-4 container">
        &copy; MarketX87 2024 | All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
