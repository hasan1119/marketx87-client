import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useContexts from "../../../../hooks/useContexts";
import axiosClient from "../../../../utils/axios";

const AllJobs = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  const { userInfo } = useContexts();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/my_jobs")
      .then(({ data }) => {
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
    <div className="ml-2 mt-2 mt-md-4 dashboard_container p-1 w-100 rounded allJobs">
      {jobs?.map((job) => {
        const record = job?.records
          ?.map(({ record }) => record)
          ?.find((record) => record.user === userInfo._id);

        return (
          <div
            key={job._id}
            style={{
              background: "#fbf9ff",
              boxShadow: "inset 2px 0 0 #6a2af5",
              border: "1px solid #f0f2f5",
              borderRadius: "0.125rem",
              padding: innerWidth > 576 ? "1.25rem 2rem" : "20px",
              marginBottom: "15px",
            }}
          >
            <div className="d-flex justify-content-between flex-md-row flex-column">
              <Link
                to={`/dashboard/jobs/${job._id}`}
                style={{ fontSize: "15.4px" }}
                className="text-capitalize mb-2"
              >
                {job.title}
              </Link>
              <div className="d-flex">
                {record?._id ? (
                  <button
                    type="button"
                    className="btn btn-warning text-capitalize"
                  >
                    {record.status}
                  </button>
                ) : job.status === "completed" ? (
                  <button
                    type="button"
                    className="btn btn-success text-capitalize"
                  >
                    {job.status}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize"
                  >
                    Open
                  </button>
                )}

                <Link to={`/dashboard/jobs/${job._id}`} className="btn">
                  <FaExternalLinkAlt className="fs-4" />
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="d-flex flex-column flex-md-row column-gap-3">
                  <span className="btn text-start px-0">
                    Deadline: {job.time + "Days" || "N/A"}
                  </span>
                  <span className="btn text-start px-0">
                    Target: {job.limit || "N/A"}
                  </span>
                  <span className="btn text-start px-0">
                    Budget: {job.budget + "TK" || "N/A"}
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-12 d-flex align-items-center gap-2">
                <span>
                  {job?.records?.length}/{job.limit}
                </span>
                <div
                  className="progress"
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={`${
                      job?.records?.length === 0
                        ? 0
                        : `${(job?.records?.length / job.limit) * 100}%`
                    }`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width:
                        job?.records?.length === 0
                          ? 0
                          : `${(job?.records?.length / job.limit) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="position-absolute"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {`${
                      job?.records?.length === 0
                        ? 0
                        : `${(job?.records?.length / job.limit) * 100}%`
                    }`}
                  </div>
                </div>
              </div>
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

export default AllJobs;
