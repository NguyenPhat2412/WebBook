import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "./Rooms.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRoom = () => {
  const [user, setUser] = useState(null);

  const navigator = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [desc, setDesc] = useState("");
  const [roomNumbers, setRoomNumbers] = useState("");

  const [errors, setErrors] = useState({});

  const { roomId } = useParams(); // Lấy id từ URL

  // validate dữ liệu
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!type.trim()) newErrors.type = "Type is required";
    if (!price) newErrors.price = "Price is required";
    if (!maxPeople) newErrors.maxPeople = "Max People is required";
    if (!desc.trim()) newErrors.desc = "Description is required";
    if (!roomNumbers.trim())
      newErrors.roomNumbers = "Room Numbers are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0])) // Giả sử chỉ cần 1 user
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  // Lấy thông tin phòng để edit
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const fetchRoom = await fetch(
          `http://localhost:5000/api/rooms/${roomId}`
        );
        if (!fetchRoom.ok) {
          throw new Error("Failed to fetch room data");
        }
        const data = await fetchRoom.json();
        setName(data.name || "");
        setType(data.type || "");
        setPrice(data.price || "");
        setMaxPeople(data.maxPeople || "");
        setDesc(data.desc || "");
        setRoomNumbers(data.roomNumbers.join(", ") || ""); // Chuyển đổi mảng thành chuỗi
      } catch (err) {
        console.error("Lỗi lấy room:", err);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updateRoom = {
      name,
      type,
      price: parseFloat(price),
      maxPeople: parseInt(maxPeople),
      desc,
      roomNumbers: roomNumbers.split(",").map((number) => number.trim()),
    };

    try {
      const res = await fetch(`http://localhost:5000/api/edit-room/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRoom),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create room");

      alert("Đã thêm phòng mới thành công!");
      console.log("Người dùng:", user);

      navigator("/rooms");
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
          <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Room</h1>
        </div>

        <div className="new-room-list bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-6">
          <div className="room-list flex flex-col gap-4">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Room Name"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select-room"
              style={{
                width: "60%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="2 Bed Room">2 Bed Room</option>
              <option value="1 Bed Room">1 Bed Room</option>
              <option value="Premier City View Room">
                Premier City View Room
              </option>
              <option value="Basement Double Room">Basement Double Room</option>
              <option value="Budget Double Room">Budget Double Room</option>
              <option value="Superior basement room">
                Superior basement room
              </option>
              {/* <option value="Superior basement room">Superior basement room</option> */}
              <option value="Deluxe Window">Deluxe Window</option>
            </select>
            {errors.type && <p className="text-red-500">{errors.type}</p>}

            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div className="room-list flex flex-col gap-4">
            <label>Max People</label>
            <input
              type="number"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              placeholder="2"
            />
            {errors.maxPeople && (
              <p className="text-red-500">{errors.maxPeople}</p>
            )}

            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description of the room"
            />
            {errors.desc && <p className="text-red-500">{errors.desc}</p>}

            <label>Room Numbers (phân cách bằng dấu phẩy)</label>
            <input
              value={roomNumbers}
              onChange={(e) => setRoomNumbers(e.target.value)}
              placeholder="101, 102, 201"
            />
            {errors.roomNumbers && (
              <p className="text-red-500">{errors.roomNumbers}</p>
            )}
          </div>

          <div className="button-check col-span-2 mt-4">
            <button
              className="btn-send bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Update Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
