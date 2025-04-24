import { useState } from "react";
// import NavBar1 from "../../../components/Navbar/NavBar1";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  // Từng lỗi riêng
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10,15}$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          phoneNumber,
          fullName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        // Reset form
        setUsername("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setFullName("");
        setErrors({});

        // chuyển sang trang đăng nhập
        navigate("/login");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Error connecting to the server.");
    }
  };

  return (
    <>
      <div className="register-page">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm pb-12">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <button type="submit">Create Account</button>
            <Link to="/login" className="text-blue-400 text-sm mt-4">
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
