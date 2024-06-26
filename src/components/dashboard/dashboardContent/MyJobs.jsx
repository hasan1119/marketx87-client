import { NavLink, Outlet } from "react-router-dom";

const MyJobs = () => {
  return (
    <div>
      <ul className="nav nav-tabs d-flex gap-4 p-3" role="tablist">
        <li role="presentation" className="active">
          <NavLink
            to="/dashboard/my-jobs/all"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "my_job_tab_active" : ""
            }
            role="tab"
            data-toggle="tab"
          >
            All
          </NavLink>
        </li>
        <li role="presentation">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "my_job_tab_active" : ""
            }
            to="/dashboard/my-jobs/available"
            role="tab"
            data-toggle="tab"
          >
            Available
          </NavLink>
        </li>
        <li role="presentation">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "my_job_tab_active" : ""
            }
            to="/dashboard/my-jobs/pending"
            role="tab"
            data-toggle="tab"
          >
            Pending
          </NavLink>
        </li>
        <li role="presentation">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "my_job_tab_active" : ""
            }
            to="/dashboard/my-jobs/completed"
            role="tab"
            data-toggle="tab"
          >
            Completed
          </NavLink>
        </li>
      </ul>
      <div className="mx-3 my-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MyJobs;
