const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
  try {
    const { category, isAvailable, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (isAvailable) filter.isAvailable = isAvailable;
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.minPrice = minPrice;
      if (maxPrice) filter.maxPrice = maxPrice;
    }

    const cars = await Car.find(filter);
    res.json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }
    res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(500).json({
        success: false,
        error: "Car not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
