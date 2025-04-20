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
