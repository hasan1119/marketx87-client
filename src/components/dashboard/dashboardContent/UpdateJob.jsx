import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import axiosClient from "../../../utils/axios";

const UpdateJob = () => {
  const navigate = useNavigate();
  const jobProto = {
    title: "",
    description: "",
    category: "",
    budget: "",
    limit: "",
    time: "",
    status: "hidden",
  };
  const [job, setJob] = useState(jobProto);

  const [content, setContent] = useState("");
  // text editor configuration
  // const config = {
  //   placeholder: "Job Description",
  // };

  const { jobId } = useParams();
  useEffect(() => {
    axiosClient
      .get(`/job/${jobId}`)
      .then(({ data }) => {
        console.log(data);
        setJob(data);
        setContent(data.description);
      })
      .catch(console.log);
  }, [jobId]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => {
      return { ...prevJob, [name]: value };
    });
  };

  // function to submitting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .put(`/job/update/${jobId}`, { ...job, description: content })
      .then(({ data }) => {
        if (data._id) {
          navigate("/dashboard/jobs");
        }
        setJob(jobProto);
        setContent("");
      })
      .catch(console.log);
  };

  return (
    <Container className="blog">
      <div className="blog m-5 p-5 shadow">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Title"
            name="title"
            value={job.title}
            onChange={(e) => changeHandler(e)}
            required
          />

          <div className="row">
            <div className="col">
              <input
                className="form-control col-4 mb-4"
                type="text"
                placeholder="Category"
                name="category"
                value={job.category}
                onChange={(e) => changeHandler(e)}
                required
              />
            </div>
            <div className="col">
              {" "}
              <input
                className="form-control mb-4 col-2"
                type="Number"
                placeholder="Budget"
                name="budget"
                value={job.budget}
                onChange={(e) => changeHandler(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                className="form-control mb-4 col-2"
                type="Number"
                placeholder="Limit"
                name="limit"
                value={job.limit}
                onChange={(e) => changeHandler(e)}
                required
              />
            </div>
            <div className="col">
              <input
                className="form-control mb-4 col-2"
                type="Number"
                placeholder="Time"
                name="time"
                value={job.time}
                onChange={(e) => changeHandler(e)}
                required
              />
            </div>
            <div className="col">
              <select
                className="form-control mb-4 col-2"
                name="status"
                id="status"
                value={job.status}
                onChange={(e) => setJob({ ...job, status: e.target.value })}
              >
                <option value="hidden">Hidden</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="stopped">Stopped</option>
              </select>
            </div>
          </div>

          <JoditEditor
            value={content}
            // tabIndex={1}
            onChange={(newContent) => setContent(newContent)}
            // config={config}
            required
          />
          <Button type="submit" variant="dark" className="form-control my-4">
            UPDATE JOB
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UpdateJob;
