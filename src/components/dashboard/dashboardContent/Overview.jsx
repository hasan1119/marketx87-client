import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";

const Overview = () => {
  const [overview, setOverview] = useState({});
  useEffect(() => {
    axiosClient
      .get("/getOverview")
      .then(({ data }) => {
        setOverview(data);
      })
      .catch(console.log);
  }, []);
  const {
    availableBalance,
    pendingBalance,
    availableJobs,
    pendingJobs,
    completedJobs,
    cancelledJobs,
  } = overview;
  return (
    <div className="m-3">
      <div className="row gap-2">
        <h2 className="col px-3 py-2 shadow">
          Available Balance: {availableBalance}TK
        </h2>
        <h2 className="col px-3 py-2 shadow">
          Pending Balance: {pendingBalance}TK
        </h2>
      </div>
      <div className="row gap-2 my-4">
        <h3 className="col">Available jobs: {availableJobs}</h3>
        <h3 className="col">Pending jobs: {pendingJobs} </h3>
        <h3 className="col">Completed jobs: {completedJobs}</h3>
        <h3 className="col">Cancelled Jobs: {cancelledJobs}</h3>
      </div>
    </div>
  );
};

export default Overview;
