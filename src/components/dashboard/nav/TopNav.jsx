import { Link } from "react-router-dom";
import useContexts from "../../../hooks/useContexts";
const TopNav = () => {
  const { userInfo, logout, loading } = useContexts();
  const { firstName, lastName, email, avatar } = userInfo;
  function logoutHandler() {
    logout();
  }

  return (
    <div className="top_nav_bar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h2 className="tab_header m-0 ms-5">Dashboard</h2>
          <div className="dashboard_top_right">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle profile_button"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="profile_icon">
                  <img
                    // src={
                    //   user.avatar
                    //     ? `https://api.marketx87.com/files/thumb/profile/${user.avatar}`
                    //     : "/logo/profile-img.svg"
                    // }
                    // alt="Profile Icon"

                    src={
                      avatar
                        ? `https://api.marketx87.com/files/profile/${avatar}`
                        : "/images/profile-img.svg"
                    }
                    alt="Profile Icon"
                  />
                </div>
              </button>
              <ul
                className="dropdown-menu d_width"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <div className="profile_name">
                    {firstName} {lastName}
                  </div>
                  <div className="profile_email">{email}</div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dashboard/my-profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li onClick={logoutHandler}>
                  <a className="dropdown-item">
                    {loading ? "Processing..." : "Logout"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
