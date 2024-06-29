import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useContexts from "../../../../hooks/useContexts";
import axiosClient from "../../../../utils/axios";

const AllJobs = () => {
  const { userInfo } = useContexts();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/my_jobs")
      .then(({ data }) => {
        setJobs(data);
      })
      .catch(console.log);
  }, []);

  console.log(jobs);

  return (
    // <div className="ml-2 mt-2 p-5 w-100 rounded" style={{ maxWidth: "1200px" }}>
    <div className="ml-2 mt-2 p-5 w-100 rounded allJobs">
      {jobs?.map((job) => {
        const record = job?.records
          ?.map(({ record }) => record)
          ?.find((record) => record.user === userInfo._id);

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
              marginBottom: "15px",
            }}
          >
            <div className="d-flex justify-content-between">
              <Link
                to={`/dashboard/jobs/${job._id}`}
                style={{ fontSize: "15.4px" }}
              >
                {job.title}
              </Link>
              <div className="">
                {record?._id ? (
                  <button
                    type="button"
                    className="btn btn-warning text-capitalize"
                  >
                    {record.status}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize"
                    >
                      Open
                    </button>
                  </>
                )}

                <Link to={`/dashboard/jobs/${job._id}`} className="btn">
                  <FaExternalLinkAlt className="fs-4" />
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="d-flex column-gap-3">
                  <span>Deadline: {job.time + "Days" || "N/A"}</span>
                  <span>Target: {job.limit || "N/A"}</span>
                  <span>Budget: {job.limit + "TK" || "N/A"}</span>
                </div>
              </div>
              <div className="col d-flex align-items-center gap-2">
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
    </div>
  );
};

export default AllJobs;
