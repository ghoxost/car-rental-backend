const express = require("express");
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/:id", authenticateToken, isAdmin, createCar);
router.put("/:id", authenticateToken, isAdmin, updateCar);
router.delete("/:id", authenticateToken, isAdmin, deleteCar);

module.exports = router;
