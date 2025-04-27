const User = require("../models/User");
const City = require("../models/City");
const navBar = require("../models/navBar");
const Detail = require("../models/Detail");
const Type = require("../models/phanloai");
const Hotel = require("../models/Hotel");
const Footer = require("../models/footer");
const Search = require("../models/search");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
exports.postUser = (req, res) => {
  const { username, password, fullName, phoneNumber, email } = req.body;

  const newUser = new User({
    username,
    password,
    fullName,
    phoneNumber,
    email,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// post hotel mới
exports.postHotel = (req, res) => {
  const { name, type, city, address, distance, photos, desc, rating } =
    req.body;

  const newHotel = new Hotel({
    name,
    type,
    city,
    address,
    distance,
    photos,
    desc,
    rating,
  });

  newHotel
    .save()
    .then(() => {
      res.status(201).json({ message: "Hotel created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// post room moi
exports.postRoom = (req, res) => {
  const { name, type, price, maxPeople, desc, roomNumbers } = req.body;
  const newRoom = new Room({
    name,
    type,
    price,
    maxPeople,
    desc,
    roomNumbers,
  });
  newRoom
    .save()
    .then(() => {
      res.status(201).json({ message: "Room created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getLogin = (req, res) => {
  const { username, password } = req.body;

  // Validate user
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // TÌm user
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check password
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Login successful
      res.status(200).json({ message: "Login successful", user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// lấy toàn bộ users từ mongodb compass
exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
// Lấy dữ liệu city từ mongoodb compass
exports.getCity = (req, res) => {
  City.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu navBar từ mongodb compass
exports.getNavBar = (req, res) => {
  navBar
    .find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// lấy dữ liệu detail từ mongodb compass
exports.getDetail = (req, res) => {
  Detail.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// lấy dữ liệu phân loại từ mongodb compass
exports.getType = (req, res) => {
  Type.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu hotel từ mongodb compass
// Top 3 khách sạn có ratting cao nhất
exports.getHotel = (req, res) => {
  // Tìm 3 khách sạn có rating cao nhất
  Hotel.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// lấy dữ liệu hotel tất cả
exports.getAllHotel = (req, res) => {
  Hotel.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu footer từ mongodb compass
exports.getFooter = (req, res) => {
  Footer.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu search từ mongodb compass
exports.getSearch = (req, res) => {
  Search.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getSearchPage = async (req, res) => {
  try {
    const { city, startDate, endDate, roomCount } = req.query;

    const hotels = await Hotel.find({ city: new RegExp(city, "i") }).populate(
      "rooms"
    );

    if (!startDate || !endDate || !roomCount) {
      return res.status(200).json(hotels);
    }

    const filteredHotels = [];

    for (const hotel of hotels) {
      const availableRooms = [];

      for (const room of hotel.rooms) {
        const isAvailable = room.unavailableDates.every((range) => {
          const from = new Date(range.start);
          const to = new Date(range.end);
          return new Date(startDate) >= to || new Date(endDate) <= from;
        });

        if (isAvailable) {
          availableRooms.push(room._id);
        }
      }

      if (availableRooms.length >= parseInt(roomCount)) {
        filteredHotels.push({
          ...hotel.toObject(),
          availableRooms: availableRooms.slice(0, roomCount),
        });
      }
    }

    res.status(200).json(filteredHotels);
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy room từ mongodb compass
exports.getRoom = (req, res) => {
  Room.find()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu hotel từ mongodb compass theo hotelID
exports.getHotelById = (req, res) => {
  const { id } = req.params;
  Hotel.findById(id)
    .then((hotel) => {
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.status(200).json(hotel);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Lấy dữ liệu room từ mongodb compass theo id
exports.getRoomById = (req, res) => {
  const { id } = req.params;
  Room.findById(id)
    .then((room) => {
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.status(200).json(room);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.postBooking = (req, res) => {
  const {
    userInfo,
    hotelId,
    roomIds,
    startDate,
    endDate,
    paymentMethod,
    totalPrice,
  } = req.body;

  console.log("Booking data:", req.body);

  const newBooking = new Booking({
    userInfo,
    hotelId,
    roomIds,
    startDate,
    endDate,
    paymentMethod,
    totalPrice,
  });

  newBooking
    .save()
    .then(() => {
      res.status(201).json({ message: "Booking created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// lấy rooms của hotel từ mongodb compass
exports.getRoomsByHotelId = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel || !hotel.rooms || !hotel.rooms.length) {
      return res.status(404).json({ error: "No rooms found for this hotel" });
    }

    const rooms = await Room.find({ _id: { $in: hotel.rooms } });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy dữ liệu booking từ mongodb compass
exports.getBookingByUser = async (req, res) => {
  try {
    const { userId, username } = req.query;

    if (!userId && !username) {
      return res.status(400).json({ error: "Missing userId or username" });
    }

    const query = userId
      ? { "userInfo.userId": userId }
      : { "userInfo.fullName": username };

    const bookings = await Booking.find(query)
      .populate("hotelId")
      .populate("roomIds");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa hotel theo id
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa room theo id
exports.deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// xóa dữ liệu user theo id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// chức năng edit khách sạn
exports.editHotel = async (req, res) => {
  const { id } = req.params;
  const { name, type, city, address, distance, photos, desc, rating } =
    req.body;

  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        type,
        city,
        address,
        distance,
        photos,
        desc,
        rating,
      },
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// chức năng edit phòng
exports.editRoom = async (req, res) => {
  const { id } = req.params;
  const { name, typenơ, price, maxPeople, desc, roomNumbers } = req.body;

  try {
    const room = await Room.findByIdAndUpdate(
      id,
      {
        name,
        type,
        price,
        maxPeople,
        desc,
        roomNumbers,
      },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
