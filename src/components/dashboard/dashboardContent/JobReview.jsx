import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";

const JobReview = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/all-records")
      .then(({ data }) => setRecords(data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);
  console.log(records);

  const changeStatus = (e, recordId) => {
    const status = e.target.value;
    axiosClient
      .put(`/changeRecordStatus/${recordId}`, { status })
      .then(({ data }) => {
        const modifiedRecord = records.map((record) => {
          if (record._id === data._id) {
            return data;
          } else {
            return record;
          }
        });
        setRecords(modifiedRecord);
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
    <div className="users py-3 m-5 mx-auto container">
      <div className="row d-flex justify-content-between align-items-center  mb-2 ">
        <h3 className="col-12 col-sm-4 col-md-6">Records</h3>
      </div>
      <div className="accordion d-flex flex-column gap-3" id="accordionExample">
        {records.map((record) => {
          return (
            <div key={record._id} className="accordion-item p-2">
              <h2 className="accordion-header position-relative">
                <div className="d-flex flex-column align-items-start">
                  <div style={{ width: "100%" }}>
                    <div className="d-flex row">
                      <h5 className="mb-2 col-10 text-capitalize">
                        {record?.job?.title}
                      </h5>
                      <div
                        className="col-2 mb-2"
                        style={{
                          width: "130px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {record.status !== "Approved" ? (
                          <select
                            value={record.status}
                            onChange={(e) => changeStatus(e, record._id)}
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
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          boxShadow: "none",
                          padding: "0",
                          display: "flex",
                          position: "absolute",
                          right: "15px",
                          top: "15px",
                          width: "100px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="accordion-button col-1"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${record._id}`}
                        aria-expanded="true"
                        aria-controls={`collapse${record._id}`}
                      ></button>
                    </div>
                    <div className="row">
                      <b className="fs-6 col-12">
                        User: {record.user.firstName + record.user.lastName}
                      </b>
                      <b className="fs-6 col-12">
                        Budget: {record.job.budget}BDT
                      </b>
                    </div>
                  </div>
                </div>
              </h2>
              <div
                id={`collapse${record._id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <h5>Job Proof:</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: record.content }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobReview;
