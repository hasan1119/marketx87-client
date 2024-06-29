import { createBrowserRouter } from "react-router-dom";
import CheckLogin from "../components/common/CheckLogin";
import ComingSoon from "../components/common/ComingSoon";
import PrivateRoute from "../components/common/PrivateRoute";
import ActivationNotice from "../components/dashboard/ActivationNotice";
import Address from "../components/dashboard/dashboardContent/Address";
import CreateBlog from "../components/dashboard/dashboardContent/CreateBlog";
import CreateJob from "../components/dashboard/dashboardContent/CreateJob";
import Education from "../components/dashboard/dashboardContent/Education";
import Job from "../components/dashboard/dashboardContent/job";
import JobReport from "../components/dashboard/dashboardContent/JobReport";
import JobReports from "../components/dashboard/dashboardContent/JobReports";
import Jobs from "../components/dashboard/dashboardContent/Jobs";
import AllJobs from "../components/dashboard/dashboardContent/my-jobs/AllJobs";
import AvailableJobs from "../components/dashboard/dashboardContent/my-jobs/AvailableJobs";
import CompletedJobs from "../components/dashboard/dashboardContent/my-jobs/CompletedJobs";
import PendingJobs from "../components/dashboard/dashboardContent/my-jobs/PendingJobs";
import MyJobs from "../components/dashboard/dashboardContent/MyJobs";
import Overview from "../components/dashboard/dashboardContent/Overview";
import Profile from "../components/dashboard/dashboardContent/Profile";
import Transitions from "../components/dashboard/dashboardContent/Transitions";
import UpdateJob from "../components/dashboard/dashboardContent/UpdateJob";
import Users from "../components/dashboard/dashboardContent/Users";
import WaitForVerification from "../components/dashboard/WaitForVerification";
import JobDetails from "../components/jobs/JobDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AboutUs from "../pages/AboutUs";
import Forgot from "../pages/auth/Forgot";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Blog from "../pages/blog/Blog";
import Home from "../pages/home/Home";
import Withdraws from "../components/dashboard/dashboardContent/Withdraws";
import Withdraw from "../components/dashboard/dashboardContent/Withdraw";
import WithdrawList from "../components/dashboard/dashboardContent/WithdrawList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "activation-notice",
        element: <ActivationNotice />,
      },
      {
        path: "wait-for-verification",
        element: <WaitForVerification />,
      },
      {
        path: "login",
        element: (
          <CheckLogin>
            <Login />
          </CheckLogin>
        ),
      },
      {
        path: "register",
        element: (
          <CheckLogin>
            <Register />
          </CheckLogin>
        ),
      },
      {
        path: "forgot",
        element: (
          <CheckLogin>
            <Forgot />
          </CheckLogin>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "address",
        element: <Address />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "job-report",
        element: <JobReport />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "create-job",
        element: <CreateJob />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:jobId",
        element: <Job />,
      },
      {
        path: "jobs/update/:jobId",
        element: <UpdateJob />,
      },
      {
        path: "transitions",
        element: <Transitions />,
      },
      {
        path: "job-reports",
        element: <JobReports />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "my-jobs",
        element: <MyJobs />,
        children: [
          {
            path: "all", // Changed from "/" to "" to indicate the default nested route
            element: <AllJobs />,
          },
          {
            path: "available",
            element: <AvailableJobs />,
          },
          {
            path: "pending",
            element: <PendingJobs />,
          },
          {
            path: "completed",
            element: <CompletedJobs />,
          },
        ],
      },
      {
        path: "withdraws",
        element: <Withdraws />,
        children: [
          {
            path: "withdraw", // Changed from "/" to "" to indicate the default nested route
            element: <Withdraw />,
          },
          {
            path: "withdraws-list",
            element: <WithdrawList />,
          },

        ],
      },
      {
        path: "my-wallet",
        element: <ComingSoon />,
      },
      {
        path: "lottery",
        element: <ComingSoon />,
      },
      {
        path: "review-and-earn",
        element: <ComingSoon />,
      },
      {
        path: "Notice",
        element: <ComingSoon />,
      },
      {
        path: "payments",
        element: <ComingSoon />,
      },
      {
        path: "orders",
        element: <ComingSoon />,
      },
      {
        path: "support-ticket",
        element: <ComingSoon />,
      },
    ],
  },
]);

export default router;
