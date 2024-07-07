import moment from "moment";
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";

const WithdrawList = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/getAllWithdraws")
      .then(({ data }) => {
        setWithdraws(data);
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
    <div className="ml-2 mt-2 p-md-5 p-2 w-100 rounded">
      <h1 className="">Withdraw List</h1>
      <div className="table-responsive mt-5 w-100">
        <table
          className="table table-striped uniform-table"
          style={{ minWidth: "1200px" }}
        >
          <thead>
            <tr>
              <th style={{ width: "80px" }} scope="col">
                #
              </th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Account</th>
              <th scope="col">Method</th>
              <th scope="col">Withdraw ID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.map((withdraw, index) => (
              <tr key={withdraw._id}>
                <th scope="row">{index}</th>
                <td>{moment(withdraw?.createdAt).format("LLLL")}</td>
                <td>{withdraw?.trans?.amount}TK</td>
                <td>{withdraw?.trans?.account}</td>
                <td>{withdraw?.method}</td>
                <td>#{withdraw._id.slice(0, 6)}</td>
                <td>{withdraw.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawList;
