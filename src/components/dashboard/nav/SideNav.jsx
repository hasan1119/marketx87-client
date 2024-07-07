import { BiLogoBlogger } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaMoneyCheck } from "react-icons/fa";

import {
  FaBell,
  FaBook,
  FaBriefcase,
  FaRandom,
  FaUserFriends,
  FaWallet,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

import {
  MdOutlinePayment,
  MdOutlinePreview,
  MdOutlineReviews,
} from "react-icons/md";
import { RiBankCardFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import useContexts from "../../../hooks/useContexts";

const SideNav = ({ isOpen }) => {
  const { logout, loading, userInfo } = useContexts();
  const studentMenus =
    userInfo && userInfo.role && userInfo.role.includes("Admin")
      ? [
          {
            path: "/dashboard/my-profile",
            name: "My Profile",
            icon: <BsPersonCircle />,
          },
          {
            path: "/dashboard/users",
            name: "Users",
            icon: <FiUsers />,
          },
          {
            path: "/dashboard/create-blog",
            name: "Create Blog",
            icon: <BiLogoBlogger />,
          },
          {
            path: "/dashboard/create-job",
            name: "Create Job",
            icon: <FaBriefcase />,
          },
          {
            path: "/dashboard/jobs",
            name: "Jobs",
            icon: <FaBriefcase />,
          },
          {
            path: "/dashboard/job-review",
            name: "Job Review",
            icon: <MdOutlineReviews />,
          },
          {
            path: "/dashboard/review-withdraws",
            name: "Review Withdraws",
            icon: <FaMoneyCheck />,
          },
        ]
      : [
          {
            path: "/dashboard",
            name: "Overview",
            icon: <IoBookSharp />,
          },
          {
            path: "/dashboard/my-profile",
            name: "My Profile",
            icon: <BsPersonCircle />,
          },
          {
            path: "/dashboard/address",
            name: "Address",
            icon: <ImLocation2 />,
          },
          {
            path: "/dashboard/education",
            name: "Education",
            icon: <FaBook />,
          },
          {
            path: "/dashboard/my-jobs/all",
            name: "My Jobs",
            icon: <FaBriefcase />,
          },
          {
            path: "/dashboard/withdraws/withdraw",
            name: "Withdraws",
            icon: <RiBankCardFill />,
          },
          {
            path: "/dashboard/referral",
            name: "Referral",
            icon: <FaUserFriends />,
          },
          {
            path: "/dashboard/my-wallet",
            name: "My Wallet",
            icon: <FaWallet />,
          },
          {
            path: "/dashboard/lottery",
            name: "Lottery",
            icon: <FaRandom />,
          },
          {
            path: "/dashboard/review-and-earn",
            name: "Review And Earn",
            icon: <MdOutlinePreview />,
          },
          {
            path: "/dashboard/notice",
            name: "Notice",
            icon: <FaBell />,
          },
          {
            path: "/dashboard/payments",
            name: "Payments",
            icon: <MdOutlinePayment />,
          },
          {
            path: "/dashboard/orders",
            name: "Orders",
            icon: <FaCartShopping />,
          },
        ];

  const menuItems = studentMenus;

  const router = useLocation();
  const path = router.pathname;

  return (
    <div
      className={isOpen ? "side_nav collapse" : "side_nav"}
      style={{ width: !isOpen ? "300px" : "80px" }}
    >
      <div className="top_section">
        <div className="logo">
          <Link href="/">
            <span>
              {isOpen ? (
                <img
                  style={{ width: "40px", marginRight: "8px" }}
                  src="/images/mainlogo.png"
                  alt="Logo"
                />
              ) : (
                <img src="/images/mainlogo.png" alt="Logo" />
              )}
            </span>
          </Link>
        </div>
      </div>
      {menuItems.map((items) => (
        <div
          key={items.path}
          className={items.path === "/logout" ? "navLink profile" : "navLink"}
        >
          <Link to={items.path}>
            <span className={path === items.path ? "link dash_active" : "link"}>
              <div className="icon"> {items.icon}</div>
              <div className={isOpen ? "link_text" : "link_text navOpen"}>
                {items.name}
              </div>
            </span>
          </Link>
        </div>
      ))}

      <div className="navLink logout">
        <a onClick={() => logout()} className="link">
          <div className="icon">
            <CiLogout />
          </div>
          <div className={isOpen ? "link_text" : "link_text navOpen"}>
            {loading ? "Processing..." : "Logout"}
          </div>
        </a>
      </div>
    </div>
  );
};

export default SideNav;
