import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../../../../utils/axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/my_jobs")
      .then(({ data }) => {
        setJobs(data);
      })
      .catch(console.log);
  }, []);


  return (
    // <div className="ml-2 mt-2 p-5 w-100 rounded" style={{ maxWidth: "1200px" }}>
    <div className="ml-2 mt-2 p-5 w-100 rounded allJobs" >
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
                {/* <button
              onClick={(e) => changeStatus(e, job._id)}
              className="btn"
            >
              {job.status}
              <IoMdEyeOff className="fs-4" />
            </button> */}
                {/* <Link to={`/dashboard/jobs/update/${job._id}`} className="btn">
                  <FaEdit className="fs-4" />
                </Link> */}

                {
                  job.status == "Active" ?

                    <></> :
                    <button type="button" className="btn btn-success">{job.status}</button>

                }
                {
                  job.status == "Cancel" ?

                    <button type="button" className="btn btn-danger">{job.status}</button>
                    :
                    <></>
                }

                {
                  job.status == "Pending" ?

                    <button type="button" className="btn btn-warning">{job.status}</button>
                    :
                    <></>

                }







                <Link to={`/dashboard/jobs/${job._id}`} className="btn">
                  <FaExternalLinkAlt className="fs-4" />
                </Link>

              </div>
            </div>
            <div className="d-flex column-gap-3">
              <span>Duration: {job.time || "N/A"}</span>
              <span>Limit: {job.limit || "N/A"}</span>
            </div>



            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow="70"
                aria-valuemin="0" aria-valuemax="100" style={{ width: '50%' }}>
                70%
              </div>
            </div>


          </div>
        );
      })}
    </div>
  );
};

export default AllJobs;
