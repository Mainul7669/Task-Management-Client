import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: "none",
      color: isActive ? "red" : "black",
    };
  };

  return (
    <div>
      <Navbar
        className="bg-light sticky-top pt-5"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <div className="text-center">
                <p className="fw-bold text-dark fs-4">Task Management</p>
              </div>
            </Nav>

            <Nav className="mx-auto d-flex align-items-center gap-5">
              <NavLink style={navLinkStyles} to="/">
                AllTasks
              </NavLink>

              <NavLink style={navLinkStyles} to="/addATask">
                AddTask
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
