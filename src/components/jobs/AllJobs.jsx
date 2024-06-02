import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import axiosClient from '../../utils/axios.js';
import SingleJob from './SingleJob.jsx';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axiosClient
      .get('/job-reports')
      .then(({ data }) => {
        setJobs(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-5 all_jobs">
      <Container>
        <h2 className="mb-5 section_title">Student&apos;s Job Reports</h2>
        <Row xs={1} sm={1} md={2} lg={3}>
          {jobs.map((job) => (
            <SingleJob key={job._id} job={job} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AllJobs;
