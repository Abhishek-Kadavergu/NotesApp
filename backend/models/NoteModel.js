const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: String, required: true },
});

const NoteModel = mongoose.model("note", NoteSchema);

module.exports = { NoteModel };
