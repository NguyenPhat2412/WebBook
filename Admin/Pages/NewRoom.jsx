import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "./Rooms.css";

const NewRoomForm = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [desc, setDesc] = useState("");
  const [roomNumbers, setRoomNumbers] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0])) // Giả sử chỉ cần 1 user
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  const handleSubmit = async () => {
    const newRoom = {
      name,
      type,
      price: parseFloat(price),
      maxPeople: parseInt(maxPeople),
      desc,
      roomNumbers: roomNumbers.split(",").map((number) => number.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/hotel_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create room");

      alert("Đã thêm phòng mới thành công!");
      console.log("Người dùng:", user);

      // Reset form
      setName("");
      setType("");
      setPrice("");
      setMaxPeople("");
      setDesc("");
      setRoomNumbers("");
    } catch (err) {
      console.error("Lỗi khi thêm phòng:", err.message);
      alert("Lỗi khi thêm phòng: " + err.message);
    }
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        <div className="new_hotel shadow-md bg-white p-4 rounded-lg mb-4">
          <h1 className="text-2xl font-bold mb-4">Tạo Phòng Mới</h1>
        </div>

        <div className="new-room-list bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-6">
          <div className="room-list flex flex-col gap-4">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Room Name"
            />

            <label>Type</label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Deluxe / Suite / Standard"
            />

            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
          </div>

          <div className="room-list flex flex-col gap-4">
            <label>Max People</label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              placeholder="2"
            />

            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description of the room"
            />

            <label>Room Numbers (phân cách bằng dấu phẩy)</label>
            <input
              value={roomNumbers}
              onChange={(e) => setRoomNumbers(e.target.value)}
              placeholder="101, 102, 201"
            />
          </div>

          <div className="button-check col-span-2 mt-4">
            <button
              className="btn-send bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoomForm;
