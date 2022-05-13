import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

const Nav = () => {
  const user = localStorage.getItem("__token");

  if (user === null) {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>RandomPostCode</Navbar.Brand>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </Container>
        </Navbar>
      </div>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>RandomPostCode</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </Container>
    </Navbar>
  );
};

export default Nav;
