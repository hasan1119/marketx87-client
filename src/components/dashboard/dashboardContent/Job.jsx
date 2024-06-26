import JoditEditor from "jodit-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContexts from "../../../hooks/useContexts";
import axiosClient from "../../../utils/axios";

const Job = () => {
  const { jobId } = useParams();
  const { userInfo, setUserInfo } = useContexts();
  const [job, setJob] = useState({});
  const [content, setContent] = useState("");
  useEffect(() => {
    axiosClient
      .get(`/job/${jobId}`)
      .then(({ data }) => {
        console.log(data);
        setJob(data);
      })
      .catch(console.log);
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
  return (
    <div className="m-3">
      <h1>{job.title}</h1>
      <div className="d-flex gap-3">
        <span>Time: {job.time}</span>
        <span>Budget: {job.budget}</span>
        <span>Target: {job.limit}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
      {userInfo.role.includes("Admin") ||
        job?.candidates?.includes(userInfo._id) || (
          <div className="my-2">
            <h3>Submit task proof: </h3>
            <JoditEditor
              value={content}
              // tabIndex={1}
              onChange={(newContent) => setContent(newContent)}
              // config={config}
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
