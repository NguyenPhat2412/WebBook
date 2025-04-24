import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DashBoard from "../components/Dashboard/Dashboard";
import Rooms from "../Pages/Rooms";
import Users from "../Pages/Users";
import Transactions from "../Pages/Transactions";
import Hotels from "../Pages/Hotels";
import NewHotel from "../Pages/NewHotel";
import NewRoom from "../Pages/NewRoom";
import RegisterPage from "../Pages/Register/register";
import LoginPage from "../Pages/Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/users" element={<Users />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/new_hotel" element={<NewHotel />} />
        <Route path="/new_room" element={<NewRoom />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
