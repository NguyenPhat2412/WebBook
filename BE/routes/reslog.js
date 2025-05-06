const path = require("path");

const express = require("express");
const userController = require("../controllers/client");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken.js");
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

// Đường dẫn post dữ liệu hotel từ mongodb compass
router.post("/hotel_post", userController.postHotel);

// Đường dẫn lấy dữ liệu footer từ mongodb compass
router.get("/footer", userController.getFooter);

// Đường dẫn lấy dữ liệu search từ mongodb compass
router.get("/search", userController.getSearch);

// Đường dẫn lấy room từ mongodb compass
router.get("/room", userController.getRoom);

// Đường dẫn post room từ mongodb compass
router.post("/room_post", userController.postRoom);

// Đường dẫn lấy dữ liệu room từ mongo compass
router.get("/room/:id", userController.getRoomsByHotelId);

// Đường dẫn lấy dữ liệu room từ mongo compass
router.get("/rooms/:id", userController.getRoomById);

// Đường dẫn lấy dữ liệu hotel từ mongodb compass
router.get("/hotels/search", userController.getSearchPage);

// Đường dẫn lấy dữ liệu hotel từ mongodb compass
router.get("/hotel/:id", userController.getHotelById);

// Đường dẫn lấy dữ liệu booking từ mongodb compass
router.post("/booking", userController.postBooking);

// Đường dẫn lấy dữ liệu booking từ mongodb compass
router.get("/booking/user", verifyToken, userController.getBookingByUser);

// Đường dẫn lấy dữ liệu booking từ mongodb compass
router.get("/booking", userController.getBooking);
// Đường dẫn xóa hotel
router.delete("/hotel/:id", userController.deleteHotel);

// Đường dẫn xóa room
router.delete("/room/:id", userController.deleteRoom);

// Đường dẫn lấy tất cả hotel
router.get("/hotel", userController.getAllHotel);

// Đường dẫn xóa user theo id
router.delete("/user/:id", userController.getUserById);

// Đường dẫn edit phòng theo id
router.put("/edit-room/:id", userController.editRoom);

// Đường dẫn edit hotel theo id
router.put("/edit-hotel/:id", userController.editHotel);
module.exports = router;
