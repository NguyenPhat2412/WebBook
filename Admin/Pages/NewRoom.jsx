import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "./Rooms.css";

const NewRoom = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Lấy thông tin người dùng
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUser(...data))
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white ">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        {/* Form thêm phòng mới */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Thêm phòng mới</h1>
          <div className="bg-white p-6 rounded-lg shadow-md flex justify-between">
            <div>
              <div>
                <label>Name</label>
                <input placeholder="My Hotel"></input>
              </div>
              <div>
                <label>City</label>
                <input placeholder="New York"></input>
              </div>
              <div>
                <label>Distance from City Center</label>
                <input placeholder="500"></input>
              </div>
              <div>
                <label>Description</label>
                <input placeholder="My Hotel"></input>
              </div>
              <div>
                <label>Images</label>
                <textarea></textarea>
              </div>
            </div>

            {/* Bên phải*/}
            <div>
              <div>
                <label>Type</label>
                <input placeholder="Hotel"></input>
              </div>

              <div>
                <label>Address</label>
                <input placeholder="Ha Noi, Viet Nam"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
