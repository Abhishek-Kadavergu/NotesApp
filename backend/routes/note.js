const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticator = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel");

const noteRouter = express.Router();

noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const notes = await NoteModel.find({ user: req.user }); // ✅ Filter notes by user
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't retrieve notes" });
  }
});

noteRouter.post("/create", authenticator, async (req, res) => {
  try {
    console.log(req.user); // Debug: Check if userId is correctly attached

    if (!req.user) {
      return res
        .status(400)
        .json({ message: "User ID is required", status: 0 });
    }

    const note = new NoteModel({ ...req.body, user: req.user }); // Attach userId from req.user
    await note.save();

    res.status(201).json({ message: "Note Created!", status: 1 });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error in creating Note", status: 0 });
  }
});

noteRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note Updated!",
      status: 1,
    });
  } catch (error) {
    res.send({
      messsage: error.message,
      status: 0,
    });
  }
});

noteRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note Deleted!",
      status: 1,
    });
  } catch (error) {
    res.send({
      messsage: error.message,
      status: 0,
    });
  }
});

module.exports = noteRouter;
