const path = require("path");

const express = require("express");
const userController = require("../controllers/client");
const router = express.Router();

// Đưỡng dẫn đăng kí người dùng phương thức post
router.post("/register", userController.postUser);

module.exports = router;
