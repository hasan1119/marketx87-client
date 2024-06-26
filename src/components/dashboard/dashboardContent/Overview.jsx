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
    <div className="m-5">
      <div className="row gap-2">
        <h1 className="">Balance Information</h1>
        <h2 className="col p-5 shadow text-center bg-success rounded-4 availableBalanceBG">

          Available Balance: {availableBalance}TK
        </h2>
        <h2 className="col p-5 shadow text-center bg-warning rounded-4 pendingBalanceBG">
          Pending Balance: {pendingBalance}TK
        </h2>
      </div>
      <div className="row gap-2 my-4 history">
        <h3 className="col p-3 shadow text-center rounded-3 history">Available jobs: {availableJobs}</h3>
        <h3 className="col p-3 shadow text-center rounded-3">Pending jobs: {pendingJobs} </h3>
        <h3 className="col p-3 shadow text-center rounded-3">Completed jobs: {completedJobs}</h3>
        <h3 className="col p-3 shadow text-center rounded-3">Cancelled Jobs: {cancelledJobs}</h3>
      </div>
    </div>
  );
};

export default Overview;
