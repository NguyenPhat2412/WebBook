import { useState, useEffect } from "react";
import "./navBar.css";
import NavBarItem from "./NavBarItem";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [navData, setNavData] = useState([]);
  useEffect(() => {
    fetch("../../data/navBar.json")
      .then((res) => res.json())
      .then((data) => {
        setNavData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-header-big">
        <div className="navbar-header">
          <h1>Booking Website</h1>
          <div className="nav-btn">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <ul style={{ color: "white" }}>
          {navData.map((item, index) => (
            <NavBarItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
