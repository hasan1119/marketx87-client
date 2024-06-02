import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { Link, useNavigate } from "react-router-dom";
import useContexts from "../../../hooks/useContexts";
import axiosClient from "../../../utils/axios";

export default function JobReports() {
  const [jobs, setJobs] = useState([]);
  const { setUserInfo } = useContexts();
  const navigator = useNavigate();
  useEffect(() => {
    axiosClient
      .get("/admin/job-reports")
      .then(({ data }) => {
        console.log(data);
        setJobs(data);
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          navigator("/login");
          setUserInfo({});
          console.log(response);
        }
      });
  }, []);

  function changeStatus(id, status) {
    axiosClient
      .put("/change-report-status", { id, status })
      .then(({ data }) => {
        if (data._id) {
          const newJobs = jobs.map((job) => {
            if (job._id === id) {
              job.status = status;
            }
            return job;
          });
          setJobs(newJobs);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setUserInfo({});
          navigator("/login");
        }
        console.log(err);
      });
  }

  function deleteJob(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`/delete-report/${id}`)
          .then(({ data }) => {
            if (data._id) {
              const newJobs = jobs.filter((job) => {
                if (job._id === id) {
                  return false;
                }
                return true;
              });
              setJobs(newJobs);

              setUserInfo(data);
            } else {
              console.log(data);
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              setUserInfo({});
              navigator("/login");
            }
            console.log(err);
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  return (
    <div className="users m-5 mx-auto container">
      <div className="row pt-5 d-flex justify-content-between align-items-center  mb-4 ">
        <h3 className="col-12 col-sm-4 col-md-6">Job Reports</h3>
        {/* <div className="col-12 col-sm-8 col-md-4 search_input">
          <span className="search_icon">
            <LuSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search job report"
          />
        </div> */}
      </div>
      {/* <div className="row d-md-flex align-items-center mb-4">
        <span className=" me-2 mb-2 mb-md-0">Show Per Page :</span>
        <div className="col-12 col-sm-2">
          <select name="" id="" className="form-control">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </div> */}
      <Table variant="" striped bordered hover responsive>
        <thead>
          <tr>
            <th>SL</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Company Phone</th>
            <th>Company Email</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(
            (
              {
                _id,
                jobTitle,
                companyName,
                companyPhone,
                companyEmail,
                status,
              },
              index
            ) => (
              <tr key={_id} className="">
                <td>{index + 1}</td>
                <td>{jobTitle}</td>
                <td>{companyName}</td>
                <td>{companyPhone}</td>
                <td>{companyEmail}</td>
                <td>
                  <select
                    onChange={(e) => changeStatus(_id, e.target.value)}
                    defaultValue={status}
                    name="status"
                    className="form-control"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>
                <td className="text-center">
                  <Button
                    as={Link}
                    to={`/job-details/${_id}`}
                    variant="dark"
                    className="mb-1 mb-lg-0 me-lg-2"
                  >
                    <AiFillEye />
                  </Button>
                  <Link>
                    <Button onClick={() => deleteJob(_id)} variant="danger">
                      <RiDeleteBin6Line />
                    </Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      {/* <p className="text-center">Showing 3 out of 50</p> */}
      <div className="d-flex justify-content-center">
        {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item>{14}</Pagination.Item>
          <Pagination.Item>{15}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
      </div>
    </div>
  );
}
