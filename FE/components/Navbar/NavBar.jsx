import { useState, useEffect } from "react";
import "./navBar.css";
import NavBarItem from "./NavBarItem";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [navData, setNavData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/navbar")
      .then((res) => res.json())
      .then((data) => {
        setNavData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // hàm lấy tên user
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((data) => {
        setCurrentUser(...data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    alert("Logout successful!");
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <div className="navbar-header-big">
        <div className="navbar-header">
          <div>
            <Link to="/" className="navbar-logo">
              <h1>Booking Website</h1>
            </Link>
          </div>
          {!currentUser ? (
            <div className="nav-btn">
              <Link to="/register">
                <button>Register</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          ) : (
            <div className="div-logout">
              <h3 style={{ color: "white" }}>Hello, {currentUser.fullName}</h3>
              <button className="btn-logout bg-white" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
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
