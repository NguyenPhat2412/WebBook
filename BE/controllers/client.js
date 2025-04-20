const User = require("../models/User");

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
