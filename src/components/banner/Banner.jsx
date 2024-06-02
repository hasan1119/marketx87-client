import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../../src/assets/images/banner-img.png";
import useContexts from "../../hooks/useContexts";

const Banner = () => {
  const { name } = useContexts();
  console.log(name);

  const history = useNavigate();
  function go() {
    history("/login");
  }
  return (
    <div id="banner" className="mt-1 d-flex align-items-center">
      <Container className="px-3">
        <Row
          lg={2}
          className="banner_container d-flex justify-content-between align-items-center"
        >
          <Col className="banner_content ">
            <h1 className="banner_slogan mb-4">
              Discover Your Perfect Job: Matching Your Interests and Skills
            </h1>
            <p className="mb-4">Unlock Your Potential, Embrace Your Future.</p>
            <Button onClick={go} className="primary_btn">
              Get Started
            </Button>
          </Col>
          <Col className="banner_image d-none d-lg-flex">
            <img src={bannerImg} alt="reading table" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
