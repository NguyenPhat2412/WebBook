import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/navbar";
import "./Rooms.css";

const NewHotel = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rooms, setRooms] = useState("");
  const [photos, setPhotos] = useState("");

  const [errors, setErrors] = useState({});

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
    if (!price) newErrors.price = "Price is required";
    if (!rooms.trim()) newErrors.rooms = "Rooms is required";
    if (!photos.trim()) newErrors.photos = "Photos are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0])) // giả sử chỉ cần lấy 1 user
      .catch((err) => console.error("Lỗi lấy user:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newHotel = {
      name,
      city,
      distance,
      desc,
      type,
      address,
      title,
      price: parseFloat(price),
      featured,
      rooms,
      photos: photos.split(",").map((url) => url.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/hotel_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to add hotel");
      }
      alert("Đã thêm phòng mới thành công!");
      console.log(user);
    } catch (err) {
      console.error("Lỗi khi thêm phòng:", err);
    }
    setName("");
    setCity("");
    setDistance("");
    setDesc("");
    setType("");
    setAddress("");
    setTitle("");
    setPrice("");
    setFeatured(false);
    setRooms("");
    setPhotos("");
  };

  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>

      <div className="col-span-1 md:col-span-4 p-6 dashboard-container">
        <div className="new_hotel shadow-md bg-white p-4 rounded-lg mb-4">
          <h1 className="text-2xl font-bold mb-4">Thêm phòng mới</h1>
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
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
              />
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
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
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="select-room"
              >
                <option value="1">2 Bed Room</option>
                <option value="2">1 Bed Room</option>
                <option value="3">Premier City View Room</option>
                <option value="4">Basement Double Room</option>
                <option value="5">Budget Double Room</option>
                <option value="6">Superior basement room</option>
                <option value="7">Superior basement room</option>
                <option value="8">Deluxe Window</option>
              </select>
            </div>
            <div>
              <button className="btn-send" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
