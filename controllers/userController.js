const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  await connectDB();

  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized",
      });
    }

    const { name, phone } = req.body;
    const user = await user
      .findByIdAndUpdate(
        req.params.id,
        { name, phone },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!user) {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
