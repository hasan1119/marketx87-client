import { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../utils/axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/reports/${id}`)
        .then(({ data }) => {
          setJob(data);
        })
        .catch((err) => {
          navigate('/');
        });
    }
  }, [id]);

  const {
    jobTitle,
    jobDescription,
    companyName,
    applicationMethod,
    appointmentDate,
    companyAddress,
    companyEmail,
    companyPhone,
    jobIndustry,
    user = {},
  } = job;

  const { avatar } = user;

  return (
    <section className="mt-1 job_details py-5">
      <Container>
        <Row xs={1} sm={1} md={2} className="job_header mb-5">
          <Col className="header_left">
            <div className="job_img me-2">
              <Image
                className=""
                src={
                  avatar
                    ? `/files/profile/${avatar}`
                    : `/src/assets/images/profile-img.svg`
                }
              />
            </div>
            <div className="job_title">
              <h3>{jobTitle}</h3>
              <h5 className="text-secondary">at {companyName}</h5>
            </div>
            <hr />
          </Col>
        </Row>
        <Row className="py-4 rounded bg-dark text-white">
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Application Method:</strong> {applicationMethod}
            </span>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Job Industry:</strong> {jobIndustry}
            </span>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Appointment Date:</strong> {appointmentDate}
            </span>
          </Col>
        </Row>
        <Row className="my-5 job_description shadow p-4">
          <Col>
            <div className="description">
              <h1 className="mb-4">Job Description</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: jobDescription,
                }}
              ></div>
            </div>
          </Col>
        </Row>
        <Row className="d-flex py-4 rounded bg-secondary text-white">
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Company Email:</strong> {companyEmail}
            </span>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Company Phone:</strong> {companyPhone}
            </span>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4 mb-md-0">
            <span>
              <strong>Company Address:</strong> {companyAddress}
            </span>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default JobDetails;
