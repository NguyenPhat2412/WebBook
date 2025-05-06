import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "../components/Dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberUser, setNumberUser] = useState(0);
  const [numberOrders, setNumberOrders] = useState(0);
  const [numberEarnings, setNumberEarnings] = useState(0);
  const [numberBalance, setNumberBalance] = useState(0);

  const navigate = useNavigate();

  const bookingsPerPage = 3;

  // Lấy thông tin người dùng
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUser(...data))
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // Lấy số lượng người dùng
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setNumberUser(data.length))
      .catch((err) => console.error("Lỗi lấy số lượng người dùng:", err));
  }, []);

  // Lấy booking khi đã có user
  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/booking`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setNumberOrders(data.length);
        const totalEarnings = data.reduce(
          (acc, booking) => acc + booking.totalPrice,
          0
        );
        setNumberEarnings(totalEarnings);
        const totalBalance = data.reduce(
          (acc, booking) => acc + booking.totalPrice,
          0
        );
        setNumberBalance(totalBalance);
      })
      .catch((err) => console.error("Lỗi lấy bookings:", err));
  }, [user]);

  // lấy tất cả hotel
  useEffect(() => {
    fetch("http://localhost:5000/api/hotel")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
      })
      .catch((err) => console.error("Lỗi lấy hotels:", err));
  }, []);

  // Delete hotel
  const handleDeleteHotel = (hotelId) => {
    fetch(`http://localhost:5000/api/hotel/${hotelId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
      })
      .catch((err) => console.error("Lỗi xóa khách sạn:", err));
  };

  // edit phòng
  const handleEditHotel = (hotelId) => {
    navigate(`/edit-hotel/${hotelId}`);
    window.location.reload();
  };

  const handleAddHotel = () => {
    navigate("/new_hotel");
  };

  // Phân trang
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentHotels = hotels.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(hotels.length / bookingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginateRange = 1;
  const startPage = Math.max(1, currentPage - Math.floor(paginateRange / 2));
  const endPage = Math.min(totalPages, startPage + paginateRange - 1);

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white ">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        <nav className="navbar">
          <ul className="flex justify-between p-4 rounded gap-20">
            <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 uppercase font-semibold w-70 h-30 shadow-md rounded-lg ">
              Users
              <p>{numberUser}</p>
              <i className="fa-solid fa-users text-red-500 text-xl"></i>
            </li>
            <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
              Orders
              <p>{numberOrders}</p>
              <i className="fa-solid fa-truck text-yellow-500 text-xl"></i>
            </li>
            <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
              Earnings
              <p>${numberEarnings}</p>
              <i className="fa-solid fa-money-bill text-green-500 text-xl"></i>
            </li>
            <li className="dashboard-navbar-list text-blue-500 hover:text-blue-700 w-70 h-30 shadow-md rounded-lg uppercase font-semibold">
              Balance
              <p>${numberBalance}</p>
              <i className="fa-solid fa-scale-balanced text-purple-500 text-xl"></i>
            </li>
          </ul>
        </nav>

        <div className="transactions bg-white shadow-md rounded-lg p-6 shadow-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Hotels Last</h1>
            <button
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={handleAddHotel}
            >
              Add New
            </button>
          </div>

          {hotels.length === 0 ? (
            <p className="text-gray-500">No bookings found.</p>
          ) : (
            <div className="transactions-list overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-200 text-gray-700 text-xl">
                  <tr>
                    <th className="py-4 px-6 border">STT</th>
                    <th className="py-4 px-6 border">ID</th>
                    <th className="py-4 px-6 border">Address</th>
                    <th className="py-4 px-6 border">Price</th>
                    <th className="py-4 px-6 border">City</th>
                    <th className="py-4 px-6 border">Desc</th>
                    <th className="py-4 px-6 border">Distance</th>
                    <th className="py-4 px-6 border">Type</th>
                    <th className="py-4 px-6 border">Rating</th>
                    <th className="py-4 px-6 border">Action</th>
                    <th className="py-4 px-6 border">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHotels.map((b, idx) => (
                    <tr key={b._id} className="border-t">
                      <td className="py-2 px-3 border">
                        {(currentPage - 1) * bookingsPerPage + idx + 1}
                      </td>
                      <td className="py-2 px-3 border">{b._id}</td>
                      <td className="py-2 px-3 border">{b.address}</td>
                      <td className="py-2 px-3 border">{b.cheapestPrice}</td>
                      <td className="py-2 px-3 border">{b.city}</td>
                      <td className="py-2 px-3 border">{b.desc || "N/A"}</td>
                      <td className="py-2 px-3 border">
                        {b.distance || "N/A"}
                      </td>
                      <td className="py-2 px-3 border">{b.type}</td>
                      <td className="py-2 px-3 border">{b.rating}</td>
                      <td className="py-2 px-3 border">
                        <button
                          onClick={() => handleDeleteHotel(b._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="py-2 px-3 border">
                        <button
                          onClick={() => handleEditHotel(b._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#008CBA",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="dashboard-page flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-blue-500"
                  }`}
                >
                  <i className="fa-solid fa-square-caret-left w-10 "></i>
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                  const pageNumber = startPage + i;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 rounded border w-10 ${
                        currentPage === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    paginate(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border w-10 ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-blue-500"
                  }`}
                >
                  <i className="fa-solid fa-square-caret-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
