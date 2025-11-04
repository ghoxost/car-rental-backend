const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  pricePerDay: {
    type: Number,
    required: [true, "Price per day is required"],
  },
  category: {
    type: String,
    enum: ["Economy", "SUV", "Luxury", "Sports"],
    required: [true, "Category is required"],
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"],
    required: [true, "Transmission is required"],
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    default: "Petrol",
  },
  seats: {
    type: String,
    required: [true, "Number of seats is required"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  imageUrl: String,
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Car", carSchema);
