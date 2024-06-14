import { createBrowserRouter } from "react-router-dom";
import CheckLogin from "../components/common/CheckLogin";
import ComingSoon from "../components/common/ComingSoon";
import PrivateRoute from "../components/common/PrivateRoute";
import ActivationNotice from "../components/dashboard/ActivationNotice";
import Address from "../components/dashboard/dashboardContent/Address";
import CreateBlog from "../components/dashboard/dashboardContent/CreateBlog";
import Education from "../components/dashboard/dashboardContent/Education";
import JobReport from "../components/dashboard/dashboardContent/JobReport";
import JobReports from "../components/dashboard/dashboardContent/JobReports";
import Profile from "../components/dashboard/dashboardContent/Profile";
import Transitions from "../components/dashboard/dashboardContent/Transitions";
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

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <PageNotFound />,
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
    // errorElement: <PageNotFound />,
    children: [
      {
        path: "/dashboard",
        element: <Profile />,
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
        element: <ComingSoon />,
      },
      {
        path: "withdraws",
        element: <ComingSoon />,
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
