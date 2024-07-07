import { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../../../utils/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/jobs")
      .then(({ data }) => {
        console.log(data);
        setJobs(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="m-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    // <div className="ml-2 mt-2 p-5 w-100 rounded" style={{ maxWidth: "1200px" }}>
    <div className="ml-2 mt-2 p-5 w-100 rounded">
      <h1>Jobs</h1>
      <hr />
      {jobs?.map((job) => {
        return (
          <div
            key={job._id}
            // className="px-2 py-1"
            style={{
              background: "#fbf9ff",
              boxShadow: "inset 2px 0 0 #6a2af5",
              border: "1px solid #f0f2f5",
              borderRadius: "0.125rem",
              padding: "1.25rem 2rem",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex justify-content-between">
              <h3 style={{ fontSize: "15.4px" }}>{job.title}</h3>
              <div className="">
                {/* <button
                  onClick={(e) => changeStatus(e, job._id)}
                  className="btn"
                >
                  {job.status}
                  <IoMdEyeOff className="fs-4" />
                </button> */}
                <Link to={`/dashboard/jobs/update/${job._id}`} className="btn">
                  <FaEdit className="fs-4" />
                </Link>
                <Link to={`/dashboard/jobs/${job._id}`} className="btn">
                  <FaExternalLinkAlt className="fs-4" />
                </Link>
              </div>
            </div>
            <div className="d-flex column-gap-3">
              <span>Duration: {job.time || "N/A"}</span>
              <span>Limit: {job.limit + "Days" || "N/A"}</span>
              <span>Budget: {job.budget + "TK" || "N/A"}</span>
            </div>
          </div>
        );
      })}
      {jobs.length === 0 ? (
        <h4 className="text-danger my-2">No jobs available</h4>
      ) : (
        ""
      )}
    </div>
  );
};

export default Jobs;
