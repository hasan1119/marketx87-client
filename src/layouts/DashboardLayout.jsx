/* eslint-disable no-undef */
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Outlet } from "react-router-dom";
import SideNav from "../components/dashboard/nav/SideNav";
import TopNav from "../components/dashboard/nav/TopNav";

const DashboardLayout = () => {
  // const { userInfo } = useContexts();
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  // if (userInfo.status === "Pending") {
  //   return <Navigate to="/activation-notice" />;
  // }
  // if (userInfo.status === "Reviewing") {
  //   return <Navigate to="/wait-for-verification" />;
  // }
  return (
    <div className="dashboard">
      <div className="dashboard_area">
        <SideNav isOpen={isOpen} setOpen={setOpen} toggle={toggle} />

        <div className="right_bar">
          <div className="top_area2">
            <div onClick={toggle} className={isOpen ? "bars" : "bars collapse"}>
              {isOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </div>
          </div>
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
