import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../components/dashboard/nav/SideNav";
import TopNav from "../components/dashboard/nav/TopNav";
import useContexts from "../hooks/useContexts";

const DashboardLayout = () => {
  const { userInfo } = useContexts();
  if (userInfo.status === "Pending") {
    return <Navigate to="/activation-notice" />;
  }
  if (userInfo.status === "Awaiting") {
    return <Navigate to="/wait-for-verification" />;
  }
  return (
    <div className="dashboard">
      <div className="dashboard_area">
        <SideNav />

        <div className="right_bar">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
