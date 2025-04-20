import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar1 = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header-big">
        <div className="navbar-header">
          <Link to="/" className="navbar-logo">
            <h1>Booking Website</h1>
          </Link>
          <div className="nav-btn">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar1;
