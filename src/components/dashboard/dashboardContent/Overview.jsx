import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";

const Overview = () => {
  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/getOverview")
      .then(({ data }) => {
        setOverview(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);
  const {
    availableBalance,
    pendingBalance,
    availableJobs,
    pendingJobs,
    completedJobs,
    cancelledJobs,
  } = overview;

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
    <div className="p-md-5 dashboard_container p-2 accountOverview">
      <div className="row gap-2">
        <h1 className="overviewHeader">Account Overview</h1>
        <h2 className="col p-md-5 p-2 shadow text-center bg-success rounded-4 availableBalanceBG">
          <span>Available Balance:</span>
          <span> {availableBalance}TK</span>
        </h2>
        <h2 className="col p-md-5 p-2 shadow text-center bg-warning rounded-4 pendingBalanceBG">
          Pending Balance: {pendingBalance}TK
        </h2>
      </div>
      <div className="row gap-2 my-4 history">
        <h3 className="col p-3 shadow text-center rounded-3 history">
          Available jobs: {availableJobs}
        </h3>
        <h3 className="col p-3 shadow text-center rounded-3">
          Pending jobs: {pendingJobs}{" "}
        </h3>
        <h3 className="col p-3 shadow text-center rounded-3">
          Completed jobs: {completedJobs}
        </h3>
        <h3 className="col p-3 shadow text-center rounded-3">
          Rejected Jobs: {cancelledJobs}
        </h3>
      </div>
    </div>
  );
};

export default Overview;
