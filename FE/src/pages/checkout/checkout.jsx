import { useEffect, useState } from "react";
import Footer from "../../../components/Header/Footer";
import NavBar from "../../../components/Navbar/NavBar";
import "./checkout.css";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
const CheckOut = () => {
  const [hotel, setHotel] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // lấy userId từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("User found in localStorage: ", user);
      setUserId(user._id);
    } else {
      console.error("User not found in localStorage");
    }
  }, []);

  // add userId vào localStorage vào userInfo
  useEffect(() => {
    if (userId) {
      setUserInfo((prev) => ({ ...prev, userId }));
    }
  }, [userId]);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
  });

  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const getDays = (start, end) => {
    const timeDiff = Math.abs(end - start);
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays === 0 ? 1 : diffDays;
  };

  const days = getDays(dateRange[0].startDate, dateRange[0].endDate);

  useEffect(() => {
    fetch(`http://localhost:5000/api/hotel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/room/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Xử lý chọn phòng
  const handleSelectRoom = (e) => {
    const value = Number(e.target.value);
    setSelectedRooms((prev) => {
      const updatedRooms = e.target.checked
        ? [...prev, value]
        : prev.filter((id) => id !== value);
      console.log("Selected Rooms: ", updatedRooms);
      return updatedRooms;
    });
  };

  // Tính tiền phòng
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;

      rooms.forEach((room) => {
        room.roomNumbers.forEach((roomNumber) => {
          if (selectedRooms.includes(roomNumber)) {
            total += room.price * days;
          }
        });
      });

      console.log("💰 Total Price Calculated: ", total);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedRooms, rooms, days]);

  // Xử lý đặt phòng
  const handleReserve = () => {
    const totalPrice = rooms.reduce((sum, room) => {
      const selected = room.roomNumbers.filter((r) =>
        selectedRooms.includes(r)
      );
      return sum + selected.length * room.price * days;
    }, 0);

    fetch("http://localhost:5000/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInfo,
        hotelId: id,
        roomIds: selectedRooms,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        paymentMethod,
        totalPrice,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then(() => navigate(`/transactions/${id}`));
  };

  if (!hotel) return <h2>Loading...</h2>;
  return (
    <>
      <NavBar />
      <div className="checkoutContainer">
        <div className="checkoutWrapper">
          <div className="checkoutTitle">
            <h2>{hotel.name}</h2>
            <p>{hotel.desc}</p>
          </div>
          <div className="checkoutDetails">
            <p className="checkoutLocation">
              <strong>${hotel.cheapestPrice}</strong> (1 Nights)
            </p>
            <button className="reserveBtn" onClick={handleReserve}>
              Reserve or Book Now!
            </button>
          </div>
        </div>
        <div className="checkoutDate">
          <div className="date-modal">
            <h2>Dates</h2>
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              onChange={handleSelect}
              minDate={new Date()}
            />
          </div>
          <div className="checkoutDateInfo">
            <h2>Reserve Info</h2>
            <div className="checkoutInfo">
              <label>Your Full Name: </label>
              <input
                placeholder="Full Name"
                value={userInfo.fullName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, fullName: e.target.value })
                }
              />
            </div>
            <div className="checkoutInfo">
              <label>Your Email: </label>
              <input
                placeholder="Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </div>
            <div className="checkoutInfo">
              <label>Your Phone Number: </label>
              <input
                placeholder="Phone Number"
                value={userInfo.phoneNumber}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="checkoutInfo">
              <label>Your Identity Card Number: </label>
              <input
                placeholder="Card Number"
                value={userInfo.cardNumber}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, cardNumber: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="rooms-selection-container">
          <h2>Select Rooms</h2>
          <div className="rooms-selection">
            {rooms.map((room) => (
              <div key={room._id}>
                <p className="rooms-title">{room.title}</p>
                <div className="room-details">
                  <p>
                    Max people: <strong>{room.maxPeople}</strong>
                  </p>
                  <div className="room-numbers">
                    {room.roomNumbers.map((number, idx) => (
                      <label key={idx}>
                        <input
                          type="checkbox"
                          value={number}
                          onChange={handleSelectRoom}
                        />

                        {number}
                      </label>
                    ))}
                  </div>
                </div>
                <p>
                  Price: <strong>${room.price}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-method">
          <h2>Total: ${totalPrice}</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              marginRight: "40px",
              border: "1px solid #ccc",
              backgroundColor: "#ccc",
              padding: "10px",
              paddingRight: "50px",
              borderRadius: "5px",
            }}
          >
            <option>Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
          </select>

          <button onClick={handleReserve} className="reserveBtn-checkout">
            Reserve Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
