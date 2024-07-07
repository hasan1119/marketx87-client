import moment from "moment";
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";

const ReviewWithdraw = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/get-all-withdraws-by-admin")
      .then(({ data }) => {
        setWithdraws(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = (e, id) => {
    axiosClient
      .put("/update-withdraw-status", {
        withdrawId: id,
        status: e.target.value,
      })
      .then(({ data }) => {
        const updatedWithdraws = withdraws.map((withdraw) => {
          if (data._id === withdraw._id) return data;
          return withdraw;
        });
        setWithdraws(updatedWithdraws);
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
    <div className="ml-2 mt-2 p-md-5 p-3 w-100 rounded">
      <h1 className="">Withdraw List</h1>
      <div className="table-responsive mt-5 w-100">
        <table
          className="table table-striped uniform-table"
          style={{ minWidth: "1100px" }}
        >
          <thead>
            <tr>
              <th style={{ width: "80px" }} scope="col">
                #
              </th>
              <th scope="col">Full Name</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Account</th>
              <th scope="col">Method</th>
              <th scope="col">Withdraw ID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.map((withdraw, index) => {
              const fullName = `${withdraw?.trans?.user?.firstName} ${withdraw?.trans?.user?.lastName}`;
              return (
                <tr key={withdraw._id}>
                  <th scope="row">{index}</th>
                  <td>{fullName}</td>
                  <td>{moment(withdraw?.createdAt).format("LLLL")}</td>
                  <td>{withdraw?.trans?.amount}TK</td>
                  <td>{withdraw?.trans?.account}</td>
                  <td>{withdraw?.method}</td>
                  <td>#{withdraw._id.slice(0, 6)}</td>
                  <td>
                    <div
                      className="col-2"
                      style={{
                        width: "130px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {withdraw.status !== "Approved" ? (
                        <select
                          value={withdraw.status}
                          onChange={(e) => changeStatus(e, withdraw._id)}
                          className="form form-control"
                        >
                          <option value="Reviewing">Reviewing</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      ) : (
                        <button className="btn btn-primary">Approved</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewWithdraw;
