import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const Header = () => {
  const { logout } = useContexts();
  const { userInfo } = useContexts();
  return (
    <header className="header" style={{ position: "relative", zIndex: 100 }}>
      <Navbar expand="lg" className="bg-body-tertiaryy ">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img width="120px" src="/images/mainlogo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="ms-auto d-lg-flex  navbar_main">
              <Nav.Link as={NavLink} to="/" className="nav_item nav_menu_item">
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/about-us"
                className="nav_item nav_menu_item "
              >
                About us
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/blogs"
                className="nav_item nav_menu_item "
              >
                Blogs
              </Nav.Link>

              {userInfo === null && (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="nav_item non_bordered_item pt-0 pb-0"
                >
                  <Button className="login_btn" variant="outline">
                    Log In
                  </Button>
                </Nav.Link>
              )}

              {/* <Nav.Link
                as={Link}
                to="/post-job"
                className="nav_item non_bordered_item pt-0 pb-0"
              >
                <Button className="primary_btn">Post Job</Button>
              </Nav.Link> */}

              {userInfo !== null && (
                <NavDropdown
                  title={
                    userInfo.avatar ? (
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50px",
                        }}
                        src={`/files/profile/${userInfo.avatar}`}
                      />
                    ) : (
                      <HiOutlineUserCircle className="user_photo" />
                    )
                  }
                  id="basic-nav-dropdown"
                  className="user_img nav_item dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="dashboard/my-profile">
                    <AiOutlineSetting className="me-2" />
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="dashboard">
                    <LuLayoutDashboard className="me-2" />
                    Dashboard
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logout}>
                    <FiLogOut className="me-2" />
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
