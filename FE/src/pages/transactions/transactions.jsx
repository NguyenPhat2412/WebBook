import { useEffect, useState } from "react";
import "./transaction.css";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Header/Footer";

const Transactions = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // 1. Lấy thông tin người dùng
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(...data); // không destructuring nếu không phải mảng
      })
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // 2. Khi có user thì lấy booking của user đó
  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/booking/user?userId=${user._id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Lỗi lấy bookings:", err));
  }, [user]);

  return (
    <div className="transaction-page">
      <NavBar />
      <div className="transaction-container">
        <h1>Your Transactions</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hotel</th>
                <th>Room Numbers</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Payment</th>
                <th>Total ($)</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b._id}</td>
                  <td>{b.hotelId?.name || "N/A"}</td>
                  <td>
                    {b.roomIds
                      .flat() // vì bạn có dạng [[101], [203]]
                      .join(", ")}
                  </td>
                  <td>{new Date(b.startDate).toLocaleDateString()}</td>
                  <td>{new Date(b.endDate).toLocaleDateString()}</td>
                  <td>{b.paymentMethod}</td>
                  <td>${b.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Transactions;
