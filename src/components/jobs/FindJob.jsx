import { Button, Container, Form, InputGroup, Row } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import axiosClient from '../../utils/axios';
import SingleJob from './SingleJob';

const FindJob = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // get all jobs
  useEffect(() => {
    axiosClient
      .get('/job-reports')
      .then(({ data }) => {
        setJobs(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, []);

  // Function to handle search
  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      if (
        job.companyName.toLowerCase().includes(query.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        job.jobIndustry.toLowerCase().includes(query.toLowerCase())
      ) {
        return job;
      }
      return null;
    });

    setSearchResults(filteredJobs);
  }, [query, jobs]);

  console.log(searchResults);
  return (
    <>
      <section className="find_job">
        <Container>
          <InputGroup className="mb-3 search_input_box">
            <span className="search_icon">
              <CiSearch />
            </span>
            <Form.Control
              placeholder="Find Job..."
              aria-label="Find Job"
              aria-describedby="basic-addon2"
              onChange={(e) => setQuery(e.target.value)}
            />

            <Button
              variant="outline-secondary"
              className="primary_btn"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
        </Container>
      </section>

      <section className="py-5 all_jobs">
        <Container>
          <h2 className="mb-5 section_title">Student&apos;s Job Reports</h2>
          <Row xs={1} sm={1} md={2} lg={3}>
            {searchResults.map((job) => (
              <SingleJob key={job._id} job={job} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FindJob;
