const User = require("../models/User");
const City = require("../models/City");
const navBar = require("../models/navBar");
const Detail = require("../models/Detail");
const Type = require("../models/phanloai");
const Hotel = require("../models/Hotel");
const Footer = require("../models/footer");
const Search = require("../models/search");
const Room = require("../models/Room");
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
