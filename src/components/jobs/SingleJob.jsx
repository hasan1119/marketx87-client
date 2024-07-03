import { Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleJob = (props) => {
  const {
    _id,
    applicationMethod,
    appointmentDate,
    companyAddress,
    companyEmail,
    companyName,
    companyPhone,
    jobDescription,
    jobIndustry,
    jobTitle,
    status,
    user = {},
  } = props.job;

  const { avatar } = user;

  return (
    <Col className=" mb-4">
      <Card className="ss">
        <Card.Body>
          {/* <Card.Img src={image}></Card.Img> */}
          <div className="d-flex align-items-center">
            <div
              className="border me-3 mb-3"
              style={{
                width: "66px",
                height: "66px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image
                src={
                  avatar
                    ? `https://api.marketx87.com/files/profile/${avatar}`
                    : `/images/profile-img.svg`
                }
                alt=""
                className="w-100"
              />
            </div>
            <div>
              <Card.Title>{companyName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {jobTitle}
              </Card.Subtitle>
            </div>
          </div>

          <Card.Text>
            <strong>Application Method: </strong>
            {applicationMethod}
          </Card.Text>
          <Card.Text>
            <strong>Job Industry: </strong>
            {jobIndustry}
          </Card.Text>
          <Card.Text>
            <strong>Appointment Date: </strong>
            {appointmentDate}
          </Card.Text>

          <Link to={`/job-details/${_id}`}>
            <Button className="primary_btn">Job Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default SingleJob;
