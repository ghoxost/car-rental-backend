const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");
router.get("/my-bookings", authenticateToken, getMyBookings);
router.post("/", authenticateToken, createBooking);
router.get("/", authenticateToken, isAdmin, getAllBookings);
router.patch("/:id/status", authenticateToken, isAdmin, updateBookingStatus);
router.patch("/:id/cancel", authenticateToken, cancelBooking);

module.exports = router;
