const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.send("from the userRoute user one");
});

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      name: name,
      password: password,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in creating user" });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not exist" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secretkeyofnotesapp@18", {
      expiresIn: "5h",
    });

    return res.status(201).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Login successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in login server!" });
  }
});

module.exports = userRoute;
