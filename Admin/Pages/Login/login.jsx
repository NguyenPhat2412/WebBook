import { useState } from "react";
// import NavBar1 from "../../../components/Navbar/NavBar1";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        // Lưu token vào localStorage nếu cần
        localStorage.setItem("token", data.token);
        // Chuyển sang trang chủ
        navigate("/");
      } else {
        setServerError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mb-2">{serverError}</p>
          )}
          <div>
            <button type="submit">Login</button>
            <Link to="/register" className="text-blue-500 text-sm mt-2">
              {`Don't have an account? Register here`}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
