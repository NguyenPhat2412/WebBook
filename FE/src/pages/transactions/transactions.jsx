import { useEffect, useState } from "react";
import "./transaction.css";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Header/Footer";

const Transactions = () => {
  const [bookings, setBookings] = useState([]);

  // Đọc user trực tiếp từ localStorage mỗi lần render
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token || !user?._id) {
        console.error("No token or user found");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/booking/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user?._id]); // Depend vào userId mới để fetch đúng booking

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
                <th>STT</th>
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
              {bookings.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>{b._id}</td>
                  <td>{b.hotelId?.name || "N/A"}</td>
                  <td>{b.roomIds.flat().join(", ")}</td>
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
