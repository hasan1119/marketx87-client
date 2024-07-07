import { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";

import axiosClient from "../../../utils/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/admin/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(({ responsive }) => {
        console.log(responsive);
      })
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = (e, id) => {
    const status = e.target.value;
    axiosClient
      .put("/admin/change-user-status", { status, userId: id })
      .then(({ data }) => {
        console.log(data);
        const newUsers = users.map((user) => {
          if (user._id === data._id) return data;
          return user;
        });
        setUsers(newUsers);
      })
      .catch(({ responsive }) => {
        console.log(responsive);
      });
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
    <div className="users m-5 mx-auto container">
      <div className="row pt-5 d-flex justify-content-between align-items-center  mb-4 ">
        <h3 className="col-12 col-sm-4 col-md-6">Users</h3>
        {/* <div className="col-12 col-sm-8 col-md-4 search_input">
          <span className="search_icon">
            <LuSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search user"
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
            <th>Name</th>
            <th>Role</th>
            <th>Mobile</th>
            <th>Email</th>
            <th className="text-center">
              Activation
              <br />
              <small>AC/Trans/Amout</small>
            </th>
            {/* <th>Gender</th> */}
            <th className="d-block" style={{ minWidth: "110px" }}>
              Status
            </th>
            {/* <th className="text-center">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const transition = user?.transitions?.find(
              (transition) => transition.type === "Activation"
            )?.transition;
            return (
              <tr key={user._id} className="">
                <td>{index + 1}</td>
                <td>
                  <span>
                    <Image
                      className="border p-1 me-2"
                      src={
                        user.avatar
                          ? `https://api.marketx87.com/files/profile/${user.avatar}`
                          : `/images/profile-img.svg`
                      }
                      roundedCircle
                      height={50}
                      width={50}
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  </span>
                  {user.firstName + " " + user.lastName}
                </td>

                <td className="">{user.role ? user.role.join(", ") : "N/A"}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  {transition?._id
                    ? `${transition.account} / ${transition.trans} / ${transition.amount}`
                    : `- / - / -`}
                </td>
                {/* <td>{user.gender}</td> */}
                <td>
                  <select
                    onChange={(e) => changeStatus(e, user._id)}
                    defaultValue={user.status}
                    name="status"
                    className="form-control"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </td>
                {/* <td className="text-center">
                  <Button variant="dark" className="mb-1 mb-lg-0 me-lg-2">
                    <AiFillEdit />
                  </Button>
                  <Button variant="dark">
                    <AiTwotoneDelete />
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <p className="text-center">Showing 5 out of 50</p> */}

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
