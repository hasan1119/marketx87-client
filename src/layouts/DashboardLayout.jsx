import { Outlet } from 'react-router-dom';
import SideNav from '../components/dashboard/nav/SideNav';
import TopNav from '../components/dashboard/nav/TopNav';

const DashboardLayout = () => {
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
