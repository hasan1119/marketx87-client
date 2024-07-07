import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { useParams } from "react-router-dom";
import useContexts from "../../../hooks/useContexts";
import axiosClient from "../../../utils/axios";

const Job = () => {
  const { jobId } = useParams();
  const { userInfo, setUserInfo } = useContexts();
  const [job, setJob] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/job/${jobId}`)
      .then(({ data }) => {
        console.log(data);
        setJob(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [jobId]);

  const submitTask = () => {
    axiosClient
      .post(`/job/submit/${jobId}`, { content })
      .then(({ data: { job, user } }) => {
        setJob(job);
        setUserInfo(user);
      })
      .catch(console.log);
  };
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
    <div className="m-3">
      <h1 className="text-capitalize">{job.title}</h1>
      <div className="d-flex gap-3 mb-2">
        <span className="btn bg-primary text-white">Time: {job.time}Days</span>
        <span className="btn bg-success text-white">
          Budget: {job.budget}TK
        </span>
        <span className="btn bg-primary text-white">Target: {job.limit}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
      {userInfo.role.includes("Admin") ||
      job?.records?.map(({ user }) => user)?.includes(userInfo._id) ? (
        <div
          className="alert alert-primary d-flex align-items-center"
          role="alert"
        >
          <FaCircleCheck className="fs-4" />
          <div className="ms-2">You have already submitted!</div>
        </div>
      ) : job.status === "completed" ? (
        <div
          className="alert alert-warning d-flex align-items-center"
          role="alert"
        >
          <TiWarning className="fs-3" />
          <div className="ms-2">The job target has completed!</div>
        </div>
      ) : (
        <div className="my-2">
          <h3>Submit Task Proof: </h3>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            required
          />
          <button onClick={submitTask} className="btn btn-primary my-3">
            Submit Job
          </button>
        </div>
      )}
    </div>
  );
};

export default Job;
