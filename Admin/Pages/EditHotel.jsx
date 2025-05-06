import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "./Rooms.css";
import { useNavigate, useParams } from "react-router-dom";

const EditHotel = () => {
  // const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("Ha Noi");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [cheapestPrice, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [photos, setPhotos] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [allRooms, setAllRooms] = useState([]);

  const { hotelId } = useParams(); // Lấy id từ URL

  // validate dữ liệu
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!distance.trim()) newErrors.distance = "Distance is required";
    if (!desc.trim()) newErrors.desc = "Description is required";
    if (!type.trim()) newErrors.type = "Type is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!title.trim()) newErrors.title = "Title is required";
    if (!cheapestPrice) newErrors.cheapestPrice = "Price is required";
    if (!rooms) newErrors.rooms = "Rooms is required";
    if (!featured) newErrors.featured = "Featured is required";
    if (!photos.trim()) newErrors.photos = "Photos are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/users")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data[0]))
  //     .catch((err) => console.error("Lỗi lấy user:", err));
  // }, []);

  // Lấy thông tin khách sạn để edit
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hotel/${hotelId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch hotel data");
        }
        const data = await res.json();
        setName(data.name || "");
        setCity(data.city || "");
        setDistance(data.distance || "");
        setDesc(data.desc || "");
        setType(data.type || "");
        setAddress(data.address || "");
        setTitle(data.title || "");
        setPrice(data.cheapestPrice || "");
        setFeatured(data.featured || false);
        setRooms(data.rooms || []);
        setSelectedRooms(data.rooms ? data.rooms.map((room) => room._id) : []);
        setPhotos(data.photos ? data.photos.join(", ") : "");
      } catch (err) {
        console.error("Lỗi khi lấy thông tin khách sạn:", err);
      }
    };
    fetchHotel();
  }, [hotelId]);

  // lấy thông tin của tất cả các phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/room");
        if (!res.ok) {
          throw new Error("Failed to fetch rooms data");
        }
        const data = await res.json();
        setAllRooms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi lấy tất cả các phòng:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updateHotel = {
      name,
      city,
      distance,
      desc,
      type,
      address,
      title,
      cheapestPrice: parseFloat(cheapestPrice),
      featured,
      rooms: selectedRooms.map((id) => id.toString()),
      photos: photos.split(",").map((url) => url.trim()),
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/edit-hotel/${hotelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateHotel),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to add hotel");
      }
      alert("Đã cập nhật khách sạn thành công!");
      navigator("/hotels");
    } catch (err) {
      console.error("Lỗi khi cập nhật khách sạn:", err);
    }
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        <div className="new_hotel shadow-md bg-white p-4 rounded-lg mb-4">
          <h1 className="text-2xl font-bold mb-4">Chỉnh sửa thông tin Hotel</h1>
        </div>
        <div className="new-room-list bg-white p-6 rounded-lg shadow-md grid grid-cols-2">
          <div className="new-room-behind flex flex-col gap-4 w-1/2 mr-4">
            <div>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Hotel"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label>City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
              >
                <option value="Ha Noi">Ha Noi</option>
                <option value="Ho Chi Minh City">Ho Chi Minh City</option>
                <option value="Đa Nang">Da Nang</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div>
              <label>Distance from City Center</label>
              <input
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="500"
              />
              {errors.distance && (
                <p className="text-red-500 text-sm">{errors.distance}</p>
              )}
            </div>

            <div>
              <label>Description</label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="My Hotel"
              />
              {errors.desc && (
                <p className="text-red-500 text-sm">{errors.desc}</p>
              )}
            </div>

            <div>
              <label>Images (ngăn cách dấu phẩy)</label>
              <textarea
                value={photos}
                onChange={(e) => setPhotos(e.target.value)}
                placeholder="url1, url2, url3"
              />
              {errors.photos && (
                <p className="text-red-500 text-sm">{errors.photos}</p>
              )}
            </div>
          </div>

          <div className="new-room-behind flex flex-col gap-4 w-1/2">
            <div>
              <label>Type</label>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Hotel"
              />
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>
            <div>
              <label>Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ha Noi, Viet Nam"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The best Hotel"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div>
              <label>Price</label>
              <input
                value={cheapestPrice}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
              />
              {errors.cheapestPrice && (
                <p className="text-red-500 text-sm">{errors.cheapestPrice}</p>
              )}
            </div>
            <span>
              <label>Featured</label>
              <input
                type="checkbox"
                checked={featured}
                className="checkbox"
                onChange={(e) => setFeatured(e.target.checked)}
              />
              {errors.featured && (
                <p className="text-red-500 text-sm">{errors.featured}</p>
              )}
            </span>
          </div>
          <div className="rooms-select ">
            <div className="flex flex-col gap-4 w-1/2">
              <label>Rooms</label>
              <select
                multiple
                value={selectedRooms}
                onChange={(e) => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setSelectedRooms(values);
                }}
                className="select-room"
              >
                {allRooms.map((room) =>
                  room && room._id ? (
                    <option key={room._id} value={room._id}>
                      {room.name} (Room {room._id.slice(-4)})
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div>
              <button className="btn-send" onClick={handleSubmit}>
                UpdateRoom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
