const path = require("path");

const express = require("express");
const userController = require("../controllers/client");
const router = express.Router();

// Đưỡng dẫn đăng kí người dùng phương thức post
router.post("/register", userController.postUser);

// Đường dẫn login người dùng
router.post("/login", userController.getLogin);

// Đường dẫn lấy toàn bộ người dùng từ mongodb compass
router.get("/users", userController.getAllUsers);

// Đường dẫn lấy dữ liệu city từ mongodb compass
router.get("/city", userController.getCity);

// Đường dẫn lấy dữ liệu navBar từ mongodb compass
router.get("/navBar", userController.getNavBar);

// Đường dẫn lấy dữ liệu detail từ mongodb compass
router.get("/detail", userController.getDetail);

// Đường dẫn lấy dữ liệu phân loại từ mongodb compass
router.get("/type", userController.getType);

// Đường dẫn lấy dữ liệu hotel từ mongodb compass
router.get("/hotel_list", userController.getHotel);

// Đường dẫn lấy dữ liệu footer từ mongodb compass
router.get("/footer", userController.getFooter);

// Đường dẫn lấy dữ liệu search từ mongodb compass
router.get("/search", userController.getSearch);

// Đường dẫn lấy room từ mongodb compass
router.get("/room", userController.getRoom);

// Đường dẫn lấy dữ liệu room từ mongo compass
router.get("/room/:id", userController.getRoomsByHotelId);

// Đường dẫn lấy dữ liệu hotel từ mongodb compass
router.get("/hotels/search", userController.getSearchPage);

// Đường dẫn lấy dữ liệu hotel từ mongodb compass
router.get("/hotel/:id", userController.getHotelById);

// Đường dẫn lấy dữ liệu booking từ mongodb compass
router.post("/booking", userController.postBooking);

// Đường dẫn lấy dữ liệu booking từ mongodb compass
router.get("/booking/user", userController.getBookingByUser);

module.exports = router;
